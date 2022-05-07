export interface ILoginResponse {
  access_token: string;
  expires_in: number;
  jti: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface ILoginData extends IAuthCookies {
  expiresIn: number;
  jti: string;
  scope: string;
  tokenType: string;
}

export interface IAuthCookies {
  accessToken: string;
  refreshToken: string;
}
