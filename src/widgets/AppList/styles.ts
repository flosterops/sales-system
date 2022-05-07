import styled from 'styled-components';
import { ILayout, Row } from 'ui/Layout';

export const ApplicationContainer = styled(Row)<ILayout>`
  width: calc(100% / 3);
  height: 100%;
  min-height: 181px;
`;
