import { useEffect, useState } from 'react';
import { fetchAppPermissions, IAppPermission } from 'requests/fetch-app-permissions';
import { isError } from 'models/guards';

export const useAppPermissions = () => {
  const [appId, setAppId] = useState<string>('');
  const [permissions, setPermission] = useState<IAppPermission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!appId) {
      return;
    }

    const loadPermissions = async () => {
      setLoading(true);
      try {
        const data = await fetchAppPermissions(appId);

        if (isError(data)) {
          return setPermission([]);
        }

        return setPermission(data.data);
      } catch (e: any) {
        setPermission([]);
        return console.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, [appId]);

  return { setAppId, permissions, loading };
};
