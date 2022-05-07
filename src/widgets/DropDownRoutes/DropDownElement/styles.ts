import styled from 'styled-components';
import { Icon, IIcon } from 'ui/Icon';
import { ILayout, Row } from 'ui/Layout';
import { INavLink, NavLink } from 'ui/NavLink';
import { globalStyles } from '../../../styles/global';

export interface IStyledChevron extends IIcon {
  opened: boolean;
}

export const StyledChevron = styled(Icon)<IStyledChevron>`
  transition: all 0.3s ease;
  transform: rotate(${(props: IStyledChevron): string => (props.opened ? '180deg' : '0')});
`;

export const StyledDropDownElement = styled(Row)<ILayout>`
  border-radius: 25px;
`;

export const StyledNavLink = styled(NavLink)<INavLink>`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  ${globalStyles.jc.spaceBetween};
  ${globalStyles.ai.center};
`;
