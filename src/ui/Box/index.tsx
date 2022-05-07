import React, { ReactElement } from 'react';
import { ILayout } from 'ui/Layout';
import { BoxWrapper } from './styles';

const Box = (props: ILayout): ReactElement => (
  <BoxWrapper padding="40px" {...props}>
    {props.children}
  </BoxWrapper>
);

export { Box };
