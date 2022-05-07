import { FormikValues } from 'formik';
import { EAppKeyTypes } from './applications';

export type TFieldTypes = EFieldTypes | EInputTypes;

export enum EFieldTypes {
  select = 'select',
  checkbox = 'checkbox',
}

export enum EInputTypes {
  text = 'text',
  number = 'number',
  search = 'search',
  email = 'email',
  password = 'password',
}

export interface IInitialAddUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  password: string;
  confirmPassword: string;
}

export interface IInitialUsersFormValues {
  search: string;
  active: string;
}

export interface IInitialAddGroupFormValues {
  groupName: string;
  application: string;
  features: Record<string, boolean>;
  appKey: EAppKeyTypes;
}

export interface IInitialGroupsFormValues {
  search: string;
  appId: EAppKeyTypes | string;
}

export interface IInitialUserEditGroupsFormValues {
  appId: EAppKeyTypes | string;
  group: string;
}

export interface IInitialGroupEditUsersFormValues {
  user: string;
}

export interface IInitialFormValues {
  profile: IInitialProfileFormValues;
  addUser: IInitialAddUserFormValues;
  users: IInitialUsersFormValues;
  addGroup: IInitialAddGroupFormValues;
  groups: IInitialGroupsFormValues;
  editUserGroups: IInitialUserEditGroupsFormValues;
  editGroupUsers: IInitialGroupEditUsersFormValues;
}

export type IValidationFunction = (values: FormikValues) => string;

export interface IFormValidations {
  [key: string]: IValidationFunction[];
}

export enum SelectMenuPlacement {
  default = 'auto',
  bottom = 'bottom',
  top = 'top',
}

export interface ISelectStyleOptions {
  color: string;
}

export interface IInitialProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
