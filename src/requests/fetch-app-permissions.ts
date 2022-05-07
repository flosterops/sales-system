import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getBearerAuthorizationToken } from 'helpers/token';
import { isError } from 'models/guards';
import { IResponseError } from 'models/requests';

export interface IAppPermission {
  id: string;
  key: string;
  appId: string;
  displayName: string;
}

export interface IFetchAppPermissionsResponse {
  data: IAppPermission[];
  status: 'success' | 'failed';
}

export const fetchAppPermissions = async (
  id: string,
): Promise<IFetchAppPermissionsResponse | IResponseError> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.get<IFetchAppPermissionsResponse>(
    urls.appPermissions(id),
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
