import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from 'store';
import { refreshUserToken } from 'store/reducers/user-reducer/actions';
import { setRefreshTokenLoading } from 'store/reducers/user-reducer';

const request = {
  auth: axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  }),
  dashboard: axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  }),
  admin: axios.create({
    baseURL: process.env.REACT_APP_ADMIN_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  }),
};

const axiosRejectInterceptor = (error: AxiosError) => {
  // eslint-disable-next-line no-console
  console.log('--- Request Error ---');
  console.error(error.code);
  console.error(error.message);
  console.error(error.stack);
  return Promise.reject(error);
};

const axiosFulfilledRequestInterceptor = async (req: AxiosRequestConfig) => {
  const { isRefreshTokenLoading } = store.getState().user;
  if (!req.url?.includes('/oauth/token') || !isRefreshTokenLoading) {
    await store.dispatch(refreshUserToken() as any);
  }
  return req;
};

const axiosFulfilledResponseInterceptor = async (res: AxiosResponse) => {
  if (!res.config.url?.includes('/oauth/token')) {
    store.dispatch(setRefreshTokenLoading(false));
  }
  return res;
};

request.dashboard.interceptors.response.use(
  axiosFulfilledResponseInterceptor,
  axiosRejectInterceptor,
);

request.dashboard.interceptors.request.use(
  axiosFulfilledRequestInterceptor,
  axiosRejectInterceptor,
);

request.auth.interceptors.response.use(
  axiosFulfilledResponseInterceptor,
  axiosRejectInterceptor,
);

request.auth.interceptors.request.use(
  axiosFulfilledRequestInterceptor,
  axiosRejectInterceptor,
);

request.admin.interceptors.response.use(
  axiosFulfilledResponseInterceptor,
  axiosRejectInterceptor,
);

request.admin.interceptors.request.use(
  axiosFulfilledRequestInterceptor,
  axiosRejectInterceptor,
);

export { request };
