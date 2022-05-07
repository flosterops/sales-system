export interface ILoginOptions {
  email: string;
  password: string;
}

export interface IRequestResponse<T> {
  data: T;
  status: string;
}

export type TResponse<T> = IRequestResponse<T> | IResponseError;

export interface ILoginActionOptions extends ILoginOptions {
  remember: boolean;
}

export interface IResponseError {
  error: string;
  error_description: string;
}

export interface IError {
  error: string;
  errorDescription: string;
}
