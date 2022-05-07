import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { IError } from 'models/requests';
import { IAuthCookies } from 'models/login-request';
import { authUser, logoutAction, refreshUserToken } from 'store/reducers/user-reducer/actions';
import { IAuthResponse } from 'models/user';
import { getAuthFromCookiesAction, loginUser } from './actions';
import { IUserState } from './types';

const initialState: IUserState = {
  auth: {
    accessToken: Cookies.get(ECookiesTypes.accessToken) || null,
    refreshToken: Cookies.get(ECookiesTypes.refreshToken) || null,
  },
  isRefreshTokenLoading: false,
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    permissions: [],
  },
  error: '',
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAuthFromCookies: getAuthFromCookiesAction,
    logout: logoutAction,
    setRefreshTokenLoading: (state: Draft<IUserState>, action: PayloadAction<boolean>) => {
      state.isRefreshTokenLoading = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<NoInfer<Partial<IUserState>>>) => {
    builder.addCase(loginUser.fulfilled, (state: Partial<Draft<IUserState>>, action) => {
      state.auth = action.payload as any;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state: Partial<Draft<IUserState>>, action) => {
      if (action.payload) {
        state.error = (action.payload as IError).errorDescription;
      } else {
        state.error = {
          error: 'Serialized error',
          errorDescription: action.error.message || 'Serialized error',
        };
      }
    });
    builder.addCase(authUser.fulfilled, (state: Partial<Draft<IUserState>>, action) => {
      state.loading = false;
      state.user = action.payload as IAuthResponse | null;
    });
    builder.addCase(authUser.pending, (state: Partial<Draft<IUserState>>) => {
      state.loading = true;
    });
    builder.addCase(authUser.rejected, (state: Partial<Draft<IUserState>>, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = (action.payload as IError).error;
      } else {
        state.error = 'Serialized error';
      }
      window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
    });

    builder.addCase(
      refreshUserToken.fulfilled,
      (state: Partial<Draft<IUserState>>, action) => {
        if (state.auth && 'accessToken' in state.auth) {
          state.auth.refreshToken = (action.payload as IAuthCookies).refreshToken;
          state.auth.accessToken = (action.payload as IAuthCookies).accessToken;
        }
      },
    );
    builder.addCase(refreshUserToken.pending, (state: Partial<Draft<IUserState>>) => {
      state.isRefreshTokenLoading = true;
    });
    builder.addCase(refreshUserToken.rejected, (state: Partial<Draft<IUserState>>, action) => {
      state.isRefreshTokenLoading = false;
      if (action.payload) {
        state.error = (action.payload as IError).error;
      } else {
        state.error = 'Serialized error';
      }
    });
  },
});

export const { getAuthFromCookies, logout, setRefreshTokenLoading } = userSlice.actions;
export const userReducer = userSlice.reducer;
