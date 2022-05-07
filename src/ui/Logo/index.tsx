import React, { ReactElement } from 'react';
import { ILayout, Row } from 'ui/Layout';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

const Logo = (props: ILayout): ReactElement => (
  <Row {...props}>
    <Link to="/">
      <img style={{ maxWidth: '364px' }} src={logo} alt="Carzam logo" />
    </Link>
  </Row>
);

export { Logo };
