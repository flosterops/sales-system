import { IResponseError } from './requests';

export const isString = (value: any): value is string => typeof value === 'string';

export const isFunction = (value: any): value is Function => typeof value === 'function';

export const isError = (value: any): value is IResponseError => 'error' in value;
