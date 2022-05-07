import { IError, TResponse } from 'models/requests';
import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { BASIC_AUTHORIZATION_TOKEN } from 'helpers/token';
import { lowDashToCamelCase } from 'helpers/response-parser';
import { ILoginData, ILoginResponse } from 'models/login-request';

export const refresh = async (token: string): Promise<ILoginData | IError> => {
  const query = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: token,
  });
  const headers = { Authorization: BASIC_AUTHORIZATION_TOKEN };
  const { data } = await request.auth.post<TResponse<ILoginResponse>>(
    urls.refresh(`?${query.toString()}`),
    null,
    {
      headers,
    },
  );

  return lowDashToCamelCase<ILoginData | IError>(data);
};
