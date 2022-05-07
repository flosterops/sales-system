import React, { ReactElement, useEffect, useState } from 'react';
import {
  ESortDirectionTypes,
  ISortOptions,
  ITableColumns,
  ITableDataSource,
} from 'models/table';
import { isFunction } from 'models/guards';
import { colors } from 'styles/colors';
import { ISpaceTypes } from 'models/layout';
import { TableRow, TableTd, TableWrapper, THeadTitle } from './styles';
import { TableFilters } from './TableFilters';

interface ITable extends ISpaceTypes {
  columns: ITableColumns[];
  dataSource: ITableDataSource[];
  // eslint-disable-next-line react/require-default-props
  isSortable?: boolean;
  // eslint-disable-next-line react/require-default-props
  onSort?: ({ property, direction }: ISortOptions) => void;
}

const Table = ({
  columns,
  dataSource,
  isSortable = false,
  onSort = () => {},
  ...props
}: ITable): ReactElement => {
  const isHasFilters = columns.some(
    ({ filterRender }: ITableColumns): boolean => !!filterRender,
  );

  const [modifiedColumns, setModifiedColumns] = useState<any[]>([]);

  useEffect(() => {
    if (!isSortable) {
      setModifiedColumns(columns);
    } else {
      setModifiedColumns(
        columns.map((column: ITableColumns) => ({
          ...column,
          property: column.key,
          direction: ESortDirectionTypes.ASC,
        })),
      );
    }
  }, [columns, isSortable]);

  const handleSort = (key: string) => {
    if (!isSortable) {
      return;
    }

    const sortableOptions: ISortOptions = {
      property: '',
      direction: ESortDirectionTypes.ASC,
    };

    setModifiedColumns(
      modifiedColumns.map((column) => {
        if (column.key === key) {
          const direction =
            column.direction === ESortDirectionTypes.ASC
              ? ESortDirectionTypes.DESC
              : ESortDirectionTypes.ASC;

          sortableOptions.property = column.key;
          sortableOptions.direction = direction;
          return { ...column, direction };
        }

        return column;
      }),
    );

    onSort(sortableOptions);
  };

  return (
    <TableWrapper {...props}>
      <thead>
        <TableRow borderColor={colors.primary}>
          {modifiedColumns.map(
            (col: ITableColumns): ReactElement => (
              <THeadTitle key={col.id} onClick={() => handleSort(col.key)}>
                {isFunction(col.title) ? col.title(col) : col.title}
              </THeadTitle>
            ),
          )}
        </TableRow>
      </thead>
      <tbody>
        {isHasFilters && <TableFilters columns={columns} />}
        {dataSource.map((data: ITableDataSource): ReactElement => {
          if (!('id' in data)) {
            console.error("Source data hasn't id field. It's required");
          }
          return (
            <TableRow key={data.id} borderColor={colors.border}>
              {columns.map(({ key, render }: ITableColumns): ReactElement => {
                if (!(key in data)) {
                  console.error(`dataSource doesn't have key of ${key} in columns`);
                }
                return (
                  <TableTd key={`${data.id}_${key}`}>
                    {isFunction(render) ? render(data[key], data) : data[key]}
                  </TableTd>
                );
              })}
            </TableRow>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};

export { Table };
