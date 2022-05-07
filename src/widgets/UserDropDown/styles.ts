import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { boxShadow } from 'styles/constants';
import { Icon, IIcon } from 'ui/Icon';

interface IPopupWrapper extends ILayout {
  visible: boolean;
  height: number;
}

interface IDropDownMarker extends IIcon {
  visible: boolean;
}

export const UserDropDownWrapper = styled(Column)<ILayout>`
  border-radius: 25px;
  min-width: 190px;
  overflow: hidden;
  z-index: 2;
  cursor: pointer;
  ${boxShadow}
`;

export const PopupWrapper = styled(Column)<IPopupWrapper>`
  transition: max-height 0.3s ease;
  max-height: ${(props: IPopupWrapper): string => (props.visible ? `${props.height}px` : '0')};
`;

export const DropDownMarker = styled(Icon)<IDropDownMarker>`
  transform: rotate(${(props: IDropDownMarker): string => (props.visible ? '180deg' : ' 0')});
  transition: all 0.3s ease;
`;
