import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from 'requests/login';
import { IError, ILoginActionOptions } from 'models/requests';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { ILoginData } from 'models/login-request';
import { AxiosError } from 'axios';
import { refresh } from 'requests/refresh';
import { auth, IResponse } from 'requests/auth';
import { setCookie } from 'helpers/set-cookie';
import { isError } from 'models/guards';
import { IUserState } from './types';

export const getAuthFromCookiesAction = (state: Partial<IUserState>) => {
  const accessToken = Cookies.get(ECookiesTypes.accessToken) || null;
  const refreshToken = Cookies.get(ECookiesTypes.refreshToken) || null;
  state.auth = { accessToken, refreshToken };
};

export const refreshUserToken = createAsyncThunk(
  'user/refreshUserToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get(ECookiesTypes.refreshToken);
      if (!token) {
        return null;
      }

      const user = await refresh(token);
      if (isError(user)) {
        return window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
      }

      const { accessToken, refreshToken } = user as ILoginData;
      setCookie(ECookiesTypes.accessToken, accessToken);
      setCookie(ECookiesTypes.refreshToken, refreshToken);

      return { accessToken, refreshToken };
    } catch (e: any) {
      const error: AxiosError<IError> = e;
      window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
      if (!error.response) {
        throw e;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const authUser = createAsyncThunk(
  'user/authUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = Cookies.get(ECookiesTypes.accessToken);
      if (!token) {
        return window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
      }

      const user = await auth(token);
      const { data } = user as IResponse;
      return data;
    } catch (e: any) {
      const error: AxiosError<IError> = e;
      if (!error.response) {
        throw e;
      }
      await dispatch(refreshUserToken());
      await dispatch(authUser());

      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (options: ILoginActionOptions, { rejectWithValue, dispatch }) => {
    try {
      const data = await login(options);
      const { accessToken, refreshToken } = data as ILoginData;
      if (options.remember) {
        setCookie(ECookiesTypes.accessToken, accessToken);
        setCookie(ECookiesTypes.refreshToken, refreshToken);
      }
      await dispatch(authUser());

      return { accessToken, refreshToken };
    } catch (e: any) {
      const error: AxiosError<IError> = e;
      if (!error.response) {
        throw e;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutAction = () => {
  setCookie(ECookiesTypes.accessToken, '');
  setCookie(ECookiesTypes.refreshToken, '');
  return {
    auth: {
      accessToken: null,
      refreshToken: null,
    },
    user: null,
    error: '',
    loading: false,
    isRefreshTokenLoading: false,
  };
};
