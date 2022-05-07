import styled from 'styled-components';
import { Column, Row, ILayout } from 'ui/Layout';

export const SectionWrapper = styled(Column)<ILayout>`
  flex: 3;
`;

export const Navigation = styled(Column)<ILayout>`
  max-width: 260px;
`;

export const MainPageWrapper = styled(Row)<ILayout>`
  max-width: 1440px;
  padding: 0 40px;
`;
