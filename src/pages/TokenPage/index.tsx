import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Loader } from 'ui/Loader';
import { Column } from 'ui/Layout';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { authUser } from 'store/reducers/user-reducer/actions';
import { TStore } from 'store';
import { ERouteLinks } from 'models/route';

const TokenPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));
  const isAuthed = user && Object.keys(user).length;

  useEffect(() => {
    if (isAuthed) {
      return;
    }

    const accessToken = Cookies.get(ECookiesTypes.accessToken);
    const refreshToken = Cookies.get(ECookiesTypes.refreshToken);

    if (accessToken && refreshToken) {
      dispatch(authUser());
    }
  }, [dispatch, isAuthed]);

  if (isAuthed) {
    return <Redirect to={ERouteLinks.users} />;
  }

  return (
    <Column
      ai={AlignItemsTypes.center}
      jc={JustifyContentTypes.center}
      componentHeight="100vh"
    >
      <Loader />
    </Column>
  );
};

export { TokenPage };
