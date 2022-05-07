import styled from 'styled-components';
import { Box } from 'ui/Box';
import { ILayout } from 'ui/Layout';
import { zIndexes } from 'styles/constants';

interface INotificationContainer extends ILayout {
  visible: boolean;
}

export const NotificationContainer = styled(Box)<INotificationContainer>`
  position: absolute;
  left: calc(50% - 175px);
  top: ${(props) => (props.visible ? '20px' : '-100px')};
  z-index: ${(props) => (props.visible ? zIndexes.modal : zIndexes.modalHidden)};
  background: ${(props) => props.bg};
  transition: all 0.3s ease;
`;
