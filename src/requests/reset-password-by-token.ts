import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { getBearerAuthorizationToken } from 'helpers/token';

export const resetPasswordByToken = async (
  password: string,
  confirmPassword: string,
  token: string,
): Promise<{}> => {
  try {
    const { data } = await request.auth.post<{}>(
      urls.resetPasswordByToken(token),
      {
        password,
        confirmPassword,
      },
      { headers: { Authorization: getBearerAuthorizationToken(token) } },
    );

    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
