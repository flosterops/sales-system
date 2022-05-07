import styled from 'styled-components';
import { ILayout, Row } from 'ui/Layout';
import { globalStyles } from 'styles/global';

export const FeatureContainer = styled(Row)<ILayout>`
  flex: 1 3 33%;
  & label {
    line-height: inherit;
    ${globalStyles.fontSizes.s}
  }
`;

export const FeaturesWrapper = styled(Row)<ILayout>`
  flex-wrap: wrap;
`;
