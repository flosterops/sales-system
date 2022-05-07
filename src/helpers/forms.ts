import { IInitialFormValues } from 'models/forms';
import { EAppKeyTypes } from 'models/applications';

export const initialAddUserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  isActive: false,
  password: '',
  confirmPassword: '',
};

export const initialProfileFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const initialUsersFormValues = {
  search: '',
  active: '',
};

export const initialAddGroupFormValues = {
  groupName: '',
  application: '',
  features: {},
  appKey: '' as EAppKeyTypes,
};

export const initialGroupsFormValues = {
  search: '',
  appId: '',
};

export const initialEditUserGroupsFormValues = {
  appId: '',
  group: '',
};

export const initialGroupsEditUsersFormValues = {
  user: '',
};

export const initialFormValues: IInitialFormValues = {
  profile: initialProfileFormValues,
  addUser: initialAddUserFormValues,
  users: initialUsersFormValues,
  addGroup: initialAddGroupFormValues,
  groups: initialGroupsFormValues,
  editUserGroups: initialEditUserGroupsFormValues,
  editGroupUsers: initialGroupsEditUsersFormValues,
};
