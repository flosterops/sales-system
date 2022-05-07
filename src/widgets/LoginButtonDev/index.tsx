import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'store/reducers/user-reducer/actions';
import { TStore } from 'store';
import { colors } from 'styles/colors';
import { StyledLoginButtonDev } from './styles';

const LoginButtonDev = (): ReactElement => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: TStore) => ({ isAuth: !!state.user.auth }));

  const handleLogin = async (): Promise<void> => {
    dispatch(
      loginUser({ email: 'admin@sensilabs.pl', password: '1CupOfTeaIsFine', remember: true }),
    );
  };

  return (
    <StyledLoginButtonDev color={isAuth ? colors.primary : colors.error} onClick={handleLogin}>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      Login. Is Authed "{String(isAuth)}"
    </StyledLoginButtonDev>
  );
};

export { LoginButtonDev };
