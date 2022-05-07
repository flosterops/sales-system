import React, { ReactElement } from 'react';
import { ITableColumns } from 'models/table';
import { isFunction } from 'models/guards';
import { colors } from 'styles/colors';
import { TableRow, TableTd } from '../styles';

interface ITableFilters {
  columns: ITableColumns[];
}

const TableFilters = ({ columns }: ITableFilters): ReactElement => (
  <TableRow borderColor={colors.primary}>
    {columns.map(
      ({ id, key, filterRender }: ITableColumns): ReactElement => (
        <TableTd key={`table-filter-${id}`}>
          {isFunction(filterRender) ? filterRender(key) : null}
        </TableTd>
      ),
    )}
  </TableRow>
);

export { TableFilters };
