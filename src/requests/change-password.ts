import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { getBearerAuthorizationToken } from 'helpers/token';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';

export const changePassword = async (
  password: string,
  confirmPassword: string,
): Promise<{}> => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken) || '';
    const { data } = await request.auth.post<{}>(
      urls.changePassword(),
      { password, confirmPassword },
      {
        headers: {
          Authorization: getBearerAuthorizationToken(token),
        },
      },
    );

    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
