import styled from 'styled-components';
import { colors } from 'styles/colors';
import { ILayout, Layout } from 'ui/Layout';
import { boxShadow } from 'styles/constants';

export const BoxWrapper = styled(Layout)<ILayout>`
  border-radius: 10px;
  background-color: ${colors.white};
  ${boxShadow};
`;
