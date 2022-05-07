import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { BASIC_AUTHORIZATION_TOKEN } from 'helpers/token';

export const resetPassword = async (email: string): Promise<{}> => {
  try {
    const { data } = await request.auth.post<{}>(
      urls.resetPassword(),
      { email },
      { headers: { Authorization: BASIC_AUTHORIZATION_TOKEN } },
    );

    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
