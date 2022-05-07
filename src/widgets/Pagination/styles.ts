import RcPagination from 'rc-pagination';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { globalStyles } from 'styles/global';

export const StyledPagPage = styled.div`
      display: flex;
      width: 50px;
      height: 50px;
      border-radius: 100%;
      cursor: pointer;
      margin: 0 5px;
      background-color: ${colors.white};
      color: ${colors.turquoise};
      ${globalStyles.ai.center};
      ${globalStyles.jc.center};
      ${globalStyles.fontSizes.m};
      ${globalStyles.weight['600']};
    }
`;

export const Separator = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
  background-color: ${colors.transparent};
  color: ${colors.turquoise};
  ${globalStyles.ai.center};
  ${globalStyles.jc.center};
  ${globalStyles.fontSizes.m};
  ${globalStyles.weight['800']};
`;

export const StyledPagination = styled(RcPagination)`
  display: flex;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;

  li {
    list-style-type: none;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }

  &.rc-pagination-item-active div {
    background-color: ${colors.turquoise};
    color: ${colors.white};
  }
`;
