import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { styledSpace } from 'styles/functions';
import { ISpaceTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { IIcon } from './index';

type TStyledIcon = FontAwesomeIconProps & ISpaceTypes & Omit<IIcon, 'type'>;

export const StyledIcon = styled(FontAwesomeIcon)<TStyledIcon>`
  ${styledSpace}
  ${(props: TStyledIcon): FlattenSimpleInterpolation | string => props.extra || ''}
  color: ${(props: TStyledIcon): string => props.color || colors.black};
  font-size: ${(props: TStyledIcon): string => props.fontSize || '16px'};
  cursor: ${(props: TStyledIcon): string =>
    props.onClick || props.pointer ? 'pointer' : 'default'};
  & > {
    cursor: ${(props) => (props.onClick || props.pointer ? 'pointer' : 'default')};
  }
`;
