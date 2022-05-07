import { IError } from 'models/requests';
import { IAuthResponse } from 'models/user';

export interface IUserState {
  auth: { accessToken: string | null; refreshToken: string | null };
  isRefreshTokenLoading: boolean;
  error: IError | string;
  user: IAuthResponse | null;
  loading: boolean;
}
