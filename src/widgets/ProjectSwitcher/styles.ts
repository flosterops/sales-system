import styled from 'styled-components';
import { Column, ILayout, Row } from 'ui/Layout';
import { boxShadow } from 'styles/constants';
import { INavLink, NavLink } from 'ui/NavLink';
import { globalStyles } from 'styles/global';

interface IPlatformsWrapper extends ILayout {
  visible: boolean;
  height: number;
}

export const ProjectSwitcherWrapper = styled(Column)<ILayout>`
  border-radius: 100%;
`;

export const PlatformsWrapper = styled(Row)<IPlatformsWrapper>`
  border-radius: 25px;
  position: absolute;
  left: 0;
  top: calc(100% + 20px);
  width: 315px;
  z-index: 2;
  ${boxShadow};
  overflow: hidden;
  transition: all 0.3s ease;
  height: ${(props: IPlatformsWrapper): string => (props.visible ? `${props.height}px` : '0')};
`;

export const PlatformLogo = styled(Row)<ILayout>`
  border-radius: 100%;
`;

export const PlatformLink = styled(NavLink)<INavLink>`
  display: flex;
  width: 60px;
  ${globalStyles.ai.center};
  ${globalStyles.direction.column};
`;
