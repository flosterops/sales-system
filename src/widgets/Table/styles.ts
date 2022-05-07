import styled from 'styled-components';
import { styledSpace } from 'styles/functions';
import { colors } from 'styles/colors';

interface ITableRow {
  borderColor: string;
}

export const TableRow = styled.tr<ITableRow>`
  height: 50px;
  border-bottom: 1px solid ${(props: ITableRow): string => props.borderColor};
  vertical-align: center;
  box-sizing: border-box;

  &:last-of-type:not(:first-of-type) {
    border-bottom: 0;
  }
`;

export const TableTd = styled.td`
  color: ${colors.black};
  letter-spacing: normal;
  &:first-of-type {
    padding-left: 10px;
  }
  &:last-of-type {
    padding-right: 16px;
  }
`;

export const THeadTitle = styled.th`
  color: ${colors.primary};
  text-align: left;
  &:first-of-type {
    padding-left: 10px;
  }
  &:last-of-type {
    padding-right: 16px;
  }
`;

export const TableWrapper = styled.table`
  width: 100%;
  ${styledSpace};
  border-collapse: collapse;
`;
