export interface IUserPermissions {
  appId: string;
  displayName: string;
  id: string;
  key: string;
}

export interface IAuthResponse {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  permissions: IUserPermissions[] | [];
}

export interface IUser {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  address1: string | null;
  mobilePhone: string | number;
  lastOrderId: number | null;
}
