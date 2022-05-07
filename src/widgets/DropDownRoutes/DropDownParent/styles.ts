import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';

interface IInnerElementsWrapper extends ILayout {
  visible: boolean;
}

export const InnerElementsWrapper = styled(Column)<IInnerElementsWrapper>`
  transition: max-height 0.3s ease;
`;
