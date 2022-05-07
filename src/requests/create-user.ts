import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getBearerAuthorizationToken } from 'helpers/token';

export interface ICreateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  password: string;
  confirmPassword: string;
}

export interface ICreateUserResponse {
  data: {
    id: string;
  };
  status: 'success' | 'failed';
}

export const createUser = async (body: ICreateUserBody): Promise<ICreateUserResponse> => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken) || '';
    const { data } = await request.admin.post<ICreateUserResponse>(urls.createUser(), body, {
      headers: {
        Authorization: getBearerAuthorizationToken(token),
      },
    });

    return data as ICreateUserResponse;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
