import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  styledFontFamily,
  styledFontSize,
  styledLh,
  styledSpace,
  styledTextAlign,
  styledWeight,
} from 'styles/functions';
import { IDescription } from 'ui/Description';
import { ERouteLinks } from 'models/route';

export interface INavLink extends IDescription {
  to: ERouteLinks;
}

export const StyledLink = styled(Link)<INavLink>`
  ${styledFontFamily};
  ${styledSpace};
  ${styledWeight};
  ${styledFontSize};
  ${styledTextAlign};
  ${styledLh};
  display: flex;
  width: auto;
  color: ${({ color }: IDescription): string => color as string};
  text-transform: ${(props: IDescription): string => (props.uppercase ? 'uppercase' : 'none')};
`;

const NavLink = ({ children, to, ...props }: INavLink): ReactElement => (
  <StyledLink to={to} {...props}>
    {children}
  </StyledLink>
);

export { NavLink };
