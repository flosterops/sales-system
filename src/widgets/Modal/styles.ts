import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { colors } from 'styles/colors';
import { zIndexes } from 'styles/constants';

interface IModalWrapper extends ILayout {
  visible: boolean;
}

export const ModalWrapper = styled(Column)<IModalWrapper>`
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${colors.modal};
  z-index: ${(props: IModalWrapper): number =>
    props.visible ? zIndexes.modal : zIndexes.modalHidden};
  opacity: ${(props: IModalWrapper): string => (props.visible ? '1' : '0')};
  transition: all 0.3s ease;
`;
