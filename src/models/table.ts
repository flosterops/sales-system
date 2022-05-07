import { ReactNode } from 'react';

export interface ITableColumns {
  id: string;
  key: string;
  title: string | ((props: any) => ReactNode);
  render?: (text: string | number | boolean, props: any) => ReactNode;
  filterRender?: (key: string) => ReactNode;
  sort?: string;
}

export interface ITableDataSource {
  id: string;
  [key: string]: any;
}

export interface ISortOptions {
  property: string;
  direction: ESortDirectionTypes;
}

export enum ESortDirectionTypes {
  ASC = 'ASC',
  DESC = 'DESC',
}
