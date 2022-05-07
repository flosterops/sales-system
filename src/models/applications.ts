export enum EAppKeyTypes {
  admin = 'ADMIN',
  salma = 'SALMA',
}

export interface IFetchUserAppsResponse {
  data: IUserApp[];
  status: 'success' | 'failed';
}

export interface IUserApp {
  id: string;
  displayName: string;
  key: EAppKeyTypes;
}

export interface IApplication {
  id: string;
  name: string;
  description: string;
  key: EAppKeyTypes;
}
