import { useEffect, useState } from 'react';
import { getGroup, getGroupPermissions, getGroupUsers } from 'requests/fetch-groups';
import { isError } from 'models/guards';
import { EAppKeyTypes } from 'models/applications';
import { ISearchUser } from 'models/users';
import { IAppPermission } from 'requests/fetch-app-permissions';
import { parseGroupData } from '../UsersSection/helpers';

export interface IGroupModel {
  id: string;
  name: string;
  key: EAppKeyTypes;
  displayName: string;
  appId: string;
}

export const useGetGroup = (id: string) => {
  const [group, setGroup] = useState<IGroupModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);

  const updateGroup = () => setTrigger((prev) => !prev);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadGroup = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getGroup(id);

        if (isError(data)) {
          return setGroup(null);
        }

        return setGroup(parseGroupData(data.data));
      } catch (e: any) {
        console.error(e.message);
        return setGroup(null);
      } finally {
        setLoading(false);
      }
    };

    loadGroup();
  }, [id, trigger]);

  return { group, loading, updateGroup };
};

export const useGetGroupPermissions = (id: string) => {
  const [permissions, setPermissions] = useState<IAppPermission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadGroupPermissions = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getGroupPermissions(id);

        if (isError(data)) {
          return setPermissions([]);
        }

        return setPermissions(data.data.content);
      } catch (e: any) {
        console.error(e.message);
        return setPermissions([]);
      } finally {
        setLoading(false);
      }
    };

    loadGroupPermissions();
  }, [id]);

  return { permissions, loading };
};

export const useGetGroupUsers = (id: string) => {
  const [users, setUsers] = useState<ISearchUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);

  const updateGroupUsers = () => setTrigger((prev) => !prev);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadGroupUsers = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getGroupUsers(id);

        if (isError(data)) {
          return setUsers([]);
        }

        return setUsers(data.data.content);
      } catch (e: any) {
        console.error(e.message);
        return setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadGroupUsers();
  }, [id, trigger]);

  return { users, loading, updateGroupUsers };
};
