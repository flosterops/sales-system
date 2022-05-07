import styled from 'styled-components';
import { ILayout, Row } from 'ui/Layout';
import { boxShadow } from 'styles/constants';

export const HeaderWrapper = styled(Row)<ILayout>`
  ${boxShadow}
`;

export const HeaderItem = styled(Row)<ILayout>`
  flex: 1;
`;
