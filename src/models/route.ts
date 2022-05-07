export interface IPageBuilderConfig {
  id: string;
  componentType: EPageComponentTypes;
  route: ERouteLinks;
  routeType: ERouteTypes;
  exact: boolean;
  redirect: ERouteLinks | null;
}

export enum ERouteLinks {
  login = '/login',
  dashboard = '/dashboard',
  admin = '/admin',
  users = '/users',
  usersAdd = '/users/add',
  usersEdit = '/users/edit',
  groups = '/groups',
  groupsAdd = '/groups/add',
  groupsEdit = '/groups/edit',
  profile = '/profile',
}

export enum EPageComponentTypes {
  ErrorPage = 'ErrorPage',
  UsersSection = 'UsersSection',
  AddUsersSection = 'AddUsersSection',
  GroupsSection = 'GroupsSection',
  AddGroupsSection = 'AddGroupsSection',
  MainPage = 'MainPage',
  EditUserSection = 'EditUserSection',
  EditGroupSection = 'EditGroupSection',
  TokenPage = 'TokenPage',
  ProfilePage = 'ProfilePage',
}

export enum ERouteTypes {
  public = 'public',
  private = 'private',
}
