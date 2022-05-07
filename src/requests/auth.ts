import { TResponse } from 'models/requests';
import { request } from 'helpers/request';
import { isError } from 'models/guards';
import { urls } from 'helpers/urls';

export interface IResponse {
  data: object;
  status: string;
}

export const auth = async (token: string): Promise<TResponse<IResponse>> => {
  const { data } = await request.auth.get<TResponse<IResponse>>(urls.auth(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (isError(data)) {
    return data;
  }
  return data;
};
