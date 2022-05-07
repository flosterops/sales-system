import React, { ReactElement, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ERouteTypes, IPageBuilderConfig } from 'models/route';
import { pageComponentTypes } from 'helpers/constants';
import { Modal } from 'widgets/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from 'store';
import { Notification } from 'widgets/Notification';
import { authUser } from 'store/reducers/user-reducer/actions';
import { Loader } from 'ui/Loader';

interface IPageBuilder {
  config: IPageBuilderConfig[];
}

const PageBuilder = ({ config }: IPageBuilder) => {
  const dispatch = useDispatch();
  const { loading, user: isAuthed } = useSelector((state: TStore) => ({
    loading: state.user.loading,
    user: !!state.user.user,
  }));

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Notification />
      <Switch>
        {config.map((element: IPageBuilderConfig): ReactElement => {
          if (!isAuthed && element.routeType === ERouteTypes.private) {
            window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
          }

          if (element.redirect) {
            return <Redirect key={element.id} to={element.redirect} />;
          }

          const Component = pageComponentTypes[element.componentType];
          return (
            <Route key={element.id} path={element.route}>
              <Component />
            </Route>
          );
        })}
      </Switch>
      <Modal />
    </BrowserRouter>
  );
};

export { PageBuilder };
