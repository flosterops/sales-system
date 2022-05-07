import styled from 'styled-components';
import { ILayout, Row } from 'ui/Layout';

interface IStyledFilterInputWrapper extends ILayout {
  color: string;
}

export const StyledFilterInputWrapper = styled(Row)<IStyledFilterInputWrapper>``;
