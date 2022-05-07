import { request } from 'helpers/request';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { urls } from 'helpers/urls';
import { getBearerAuthorizationToken } from 'helpers/token';
import { isError } from 'models/guards';
import { IResponseError } from 'models/requests';
import { EAppKeyTypes } from 'models/applications';

export interface ICreatGroupResponse {
  data: { id: string };
  status: 'success' | 'failed';
}

export interface ICreateGroupBody {
  name: string;
  appKey: EAppKeyTypes;
  permissions: string[];
}

export const createGroup = async (
  body: ICreateGroupBody,
): Promise<ICreatGroupResponse | IResponseError> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.post<ICreatGroupResponse>(urls.createGroup(), body, {
    headers: {
      Authorization: getBearerAuthorizationToken(token),
    },
  });

  if (isError(data)) {
    return data;
  }

  return data;
};
