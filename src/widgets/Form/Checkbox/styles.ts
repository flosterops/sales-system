import styled from 'styled-components';
import { colors } from 'styles/colors';
import { ILayout, Row } from 'ui/Layout';
import { Description, IDescription } from 'ui/Description';
import checked from 'assets/images/checked.png';

interface IStyledCheckboxSpan {
  value: string;
}

export const CheckboxDescription = styled(Description)<IDescription>`
  cursor: pointer;
  margin-left: 10px;
  line-height: 2.25;
`;

export const StyledCheckboxContainer = styled(Row)<ILayout>`
  width: auto;
  display: flex;
`;

export const StyledCheckbox = styled.input`
  opacity: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

export const StyledCheckboxSpan = styled.span<IStyledCheckboxSpan>`
  position: relative;
  width: 24px;
  min-width: 24px;
  height: 24px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 2px solid ${colors.primary};
  border-radius: 5px;
  background-size: 24px;
  background-color: ${(props: IStyledCheckboxSpan): string =>
    props.value ? colors.primary : colors.transparent};
  transition: background-color 0.3s ease;
  &:before {
    transition: opacity 0.3s ease;
    width: 24px;
    height: 24px;
    background-size: cover;
    background-image: url(${checked});
    content: '';
    opacity: ${(props) => (props.value ? '1' : '0')};
    position: absolute;
  }
`;
