import React, { ReactElement } from 'react';
import { colors } from 'styles/colors';
import { IPageBuilderConfig } from 'models/route';
import { PageBuilder } from 'widgets/PageBuilder';
import config from 'pages/config.json';
import { Provider } from 'react-redux';
import { ModalProvider } from 'widgets/Modal/provider';
import { LoginButtonDev } from 'widgets/LoginButtonDev';
import { NotificationProvider } from 'widgets/Notification/provider';
import { store } from 'store';
import { PageWrapper } from './styles';

const App = (): ReactElement => (
  <Provider store={store}>
    <ModalProvider>
      <NotificationProvider>
        <PageWrapper bg={colors.body} componentHeight="100%">
          <PageBuilder config={config as IPageBuilderConfig[]} />
          {process.env.NODE_ENV === 'development' && <LoginButtonDev />}
        </PageWrapper>
      </NotificationProvider>
    </ModalProvider>
  </Provider>
);

export { App };
