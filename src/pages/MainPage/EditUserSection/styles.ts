import styled from 'styled-components';
import { IButton, Button } from 'ui/Button';
import { colors } from 'styles/colors';

export const AddGroupUserButton = styled(Button)<IButton>`
  height: 60px;
  border-radius: 100%;
  width: auto;

  & button {
    background: ${colors.turquoise};
  }
`;
