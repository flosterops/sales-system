import React, { ReactElement } from 'react';
import { Header } from 'widgets/Header';
import { Row } from 'ui/Layout';
import { DropDownRoutes } from 'widgets/DropDownRoutes';
import { ERouteLinks, ERouteTypes, IPageBuilderConfig } from 'models/route';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { pageComponentTypes } from 'helpers/constants';
import { JustifyContentTypes } from 'models/layout';
import config from './config.json';
import { MainPageWrapper, Navigation, SectionWrapper } from './styles';

const MainPage = (): ReactElement => (
  <>
    <Header />
    <Row jc={JustifyContentTypes.center}>
      <MainPageWrapper margin="40px 0">
        <BrowserRouter>
          <Row componentWidth="auto" jc={JustifyContentTypes.flexEnd} mright="30px">
            <Navigation componentWidth="33vw">
              <DropDownRoutes />
            </Navigation>
          </Row>
          <Switch>
            {(config as IPageBuilderConfig[]).map(
              (element: IPageBuilderConfig): ReactElement => {
                if (element.routeType === ERouteTypes.private) {
                  return <Redirect key="login-redirect" to={ERouteLinks.login} />;
                }

                if (element.redirect) {
                  return <Redirect key={element.id} to={element.redirect} />;
                }

                const Component = pageComponentTypes[element.componentType];
                return (
                  <Route exact={element.exact} key={element.id} path={element.route}>
                    <SectionWrapper>
                      <Component />
                    </SectionWrapper>
                  </Route>
                );
              },
            )}
          </Switch>
        </BrowserRouter>
      </MainPageWrapper>
    </Row>
  </>
);

export { MainPage };
