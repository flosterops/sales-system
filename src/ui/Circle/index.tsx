import React, { ReactElement } from 'react';
import { ILayout } from 'ui/Layout';
import { StyledCircle } from './styles';

const Circle = ({ children, ...props }: ILayout): ReactElement => (
  <StyledCircle {...props}>{children}</StyledCircle>
);

export { Circle };
