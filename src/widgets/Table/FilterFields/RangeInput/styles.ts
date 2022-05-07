import styled from 'styled-components';
import { Row } from 'ui/Layout';
import { colors } from 'styles/colors';
import { StyledInput } from '../../../Form/Input/styles';

interface IRangeInputContainer {
  isFocused: boolean;
}

export const RangeInputContainer = styled(Row)<IRangeInputContainer>`
  border: 2px solid ${(props) => (props.isFocused ? colors.primary : colors.border)};
  border-radius: 5px;
  height: 40px;

  & ${StyledInput} {
    border: none;
    height: 36px;
    box-sizing: border-box;
  }
`;
