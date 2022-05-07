import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { IApplicationResponse } from 'models/user-apps';
import { IApplication, IFetchUserAppsResponse } from 'models/applications';
import { isError } from 'models/guards';
import { getBearerAuthorizationToken } from 'helpers/token';

export const userAppsResponseParser = (applications: IApplicationResponse[]): IApplication[] =>
  applications.map(
    (app: IApplicationResponse): IApplication => ({
      id: app.id,
      name: app.displayName.charAt(0).toUpperCase(),
      description: app.displayName,
      key: app.key,
    }),
  );

export const fetchUserApps = async (token: string): Promise<IFetchUserAppsResponse> => {
  const { data } = await request.auth.get<IFetchUserAppsResponse>(urls.userApps(), {
    headers: { Authorization: getBearerAuthorizationToken(token) },
  });

  if (isError(data)) {
    return data;
  }

  return data;
};
