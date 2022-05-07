import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { getBearerAuthorizationToken } from 'helpers/token';
import { isError } from 'models/guards';
import { IResponseError } from 'models/requests';
import { IExpandedBody } from 'pages/MainPage/GroupsSection/hooks';
import { EAppKeyTypes } from 'models/applications';
import { IAppPermission } from './fetch-app-permissions';
import { IFetchUsersResponse } from './fetch-users';

export interface IGroupAddUserBody {
  groupId: string;
  userId: string;
}

export interface ISearchAppGroup {
  id: string;
  key: EAppKeyTypes;
  displayName: string;
}

export interface ISearchGroup {
  app: ISearchAppGroup;
  id: string;
  name: string;
}

export interface IFetchGroupsResponse {
  data: {
    content: ISearchGroup[];
    totalPages: number;
  };
}

export interface IFetchGroupPermissionsResponse {
  data: { content: IAppPermission[] };
  status: 'success' | 'failed';
}

export interface IGetGroupResponse {
  data: ISearchGroup;
}

export interface IEditGroupBody {
  name: string;
  permissionsToAdd: string[];
  permissionsToRemove: string[];
  version: number;
}

export const fetchGroups = async (body: IExpandedBody) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';

  const { data } = await request.admin.post<IFetchGroupsResponse | IResponseError>(
    urls.groupSearch(),
    body,
    {
      headers: {
        Authorization: getBearerAuthorizationToken(token),
      },
    },
  );

  if (isError(data)) {
    return data;
  }
  return data;
};

export const groupAddUser = async (id: string, body: IGroupAddUserBody) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.post(urls.groupAddUser(id), body, {
    headers: { Authorization: getBearerAuthorizationToken(token) },
  });

  if (!isError(data)) {
    return data;
  }

  return data;
};

export const getGroup = async (id: string): Promise<IGetGroupResponse | IResponseError> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.get<IGetGroupResponse>(urls.getGroup(id), {
    headers: { Authorization: getBearerAuthorizationToken(token) },
  });

  if (!isError(data)) {
    return data;
  }

  return data;
};

export const getGroupPermissions = async (
  id: string,
  body = {
    criteria: {},
    page: {
      pageNumber: 0,
      pageSize: 10,
    },
  },
): Promise<IFetchGroupPermissionsResponse | IResponseError> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.post<IFetchGroupPermissionsResponse>(
    urls.getGroupPermissions(id),
    body,
    {
      headers: { Authorization: getBearerAuthorizationToken(token) },
    },
  );

  if (!isError(data)) {
    return data;
  }

  return data;
};

export const getGroupUsers = async (
  id: string,
  body = {
    criteria: {},
    page: {
      pageNumber: 0,
      pageSize: 10,
    },
  },
): Promise<IFetchUsersResponse | IResponseError> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.post<IFetchUsersResponse>(
    urls.getGroupUsers(id),
    body,
    {
      headers: { Authorization: getBearerAuthorizationToken(token) },
    },
  );

  if (!isError(data)) {
    return data;
  }

  return data;
};

export const editGroup = async (id: string, body: IEditGroupBody) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.put(urls.editGroup(id), body, {
    headers: { Authorization: getBearerAuthorizationToken(token) },
  });

  if (!isError(data)) {
    return data;
  }

  return data;
};

export const deleteGroupUser = async (id: string, userId: string) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.admin.delete(urls.deleteGroupUser(id, userId), {
    headers: { Authorization: getBearerAuthorizationToken(token) },
  });

  if (!isError(data)) {
    return data;
  }

  return data;
};
