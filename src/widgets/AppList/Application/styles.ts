import styled from 'styled-components';
import { Column, ILayout, Row } from 'ui/Layout';
import { colors } from 'styles/colors';

interface IApplicationWrapper extends ILayout {
  selected: boolean;
}

export const ApplicationWrapper = styled(Column)<IApplicationWrapper>`
  border: solid 3px ${(props) => (props.selected ? colors.primary : colors.disabledOpacity)};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border: solid 3px ${colors.primary};
  }
`;

export const Circle = styled(Column)<ILayout>`
  border-radius: 100%;
`;

export const Selected = styled(Row)<IApplicationWrapper>`
  position: absolute;
  border-radius: 100%;
  right: -22px;
  top: -22px;
  opacity: ${(props: IApplicationWrapper): string => (props.selected ? '1' : '0')};
  transition: all 0.3s ease;
`;
