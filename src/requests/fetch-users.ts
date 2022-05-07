import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { getBearerAuthorizationToken } from 'helpers/token';
import { isError } from 'models/guards';
import { ISearchUser } from 'models/users';
import { IResponseError } from 'models/requests';
import { IExpandedBody } from 'pages/MainPage/UsersSection/hooks';
import { ICreateUserBody } from './create-user';

export interface IFetchUsersResponse {
  data: {
    content: ISearchUser[];
    totalPages: number;
  };
}

export interface IGetUserResponse {
  data: ISearchUser;
}

export interface IEditUserBody extends ICreateUserBody {
  version: number;
}

export const fetchUsers = async (body: IExpandedBody) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';

  const { data } = await request.admin.post<IFetchUsersResponse | IResponseError>(
    urls.userSearch(),
    body,
    {
      headers: {
        Authorization: getBearerAuthorizationToken(token),
      },
    },
  );

  if (isError(data)) {
    return data;
  }
  return data;
};

export const getUser = async (id: string): Promise<IGetUserResponse | IResponseError> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';

  const { data } = await request.admin.get<IGetUserResponse | IResponseError>(
    urls.getUser(id),
    {
      headers: {
        Authorization: getBearerAuthorizationToken(token),
      },
    },
  );

  if (!isError(data)) {
    return data;
  }

  return data;
};

export const editUser = async (id: string, body: IEditUserBody) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';

  const { data } = await request.admin.put<any>(urls.getUser(id), body, {
    headers: { Authorization: getBearerAuthorizationToken(token) },
  });

  if (!isError(data)) {
    return data;
  }

  return data;
};
