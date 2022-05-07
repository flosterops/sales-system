import { EAppKeyTypes } from './applications';

export interface IApplicationResponse {
  id: string;
  displayName: string;
  key: EAppKeyTypes;
}
