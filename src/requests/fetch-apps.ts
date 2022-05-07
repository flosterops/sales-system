import { IResponseError } from 'models/requests';
import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { getBearerAuthorizationToken } from 'helpers/token';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { isError } from 'models/guards';

export interface IAppSearchResponse {
  data: {
    content: IAppSearch[];
  };
}

export interface IAppSearch {
  id: string;
  key: string;
  displayName: string;
}

export const fetchApps = async (
  body = {
    criteria: {},
    page: {
      pageNumber: 0,
      pageSize: 10,
    },
  },
): Promise<IAppSearchResponse | IResponseError> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.post<IAppSearchResponse>(urls.appSearch(), body, {
    headers: {
      Authorization: getBearerAuthorizationToken(token),
    },
  });

  if (isError(data)) {
    return data;
  }

  return data;
};
