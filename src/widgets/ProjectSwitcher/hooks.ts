import { useEffect, useState } from 'react';
import { ERouteLinks } from 'models/route';
import { isError } from 'models/guards';
import { fetchUserApps } from 'requests/user-apps';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { EAppKeyTypes, IUserApp } from 'models/applications';
import { IPlatformConfig } from './index';

export const appPaths = {
  [EAppKeyTypes.admin]: process.env.REACT_APP_ADMIN_PANEL_PATH,
  [EAppKeyTypes.salma]: process.env.REACT_APP_SALMA_PATH,
};

export const mapUserAppsToPlatformConfig = (apps: IUserApp[]) =>
  apps.map(
    (app: IUserApp): IPlatformConfig => ({
      id: app.id,
      name: app.displayName,
      shortName: app.displayName
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase())
        .join(''),
      path: appPaths[app.key] as ERouteLinks,
    }),
  );

export const useFetchUserApps = () => {
  const [apps, setApps] = useState<IPlatformConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const token = Cookies.get(ECookiesTypes.accessToken) || '';
        const data = await fetchUserApps(token);

        if (isError(data)) {
          return setApps([]);
        }

        return setApps(mapUserAppsToPlatformConfig(data.data));
      } catch (e: any) {
        return setApps([]);
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  return { apps, loading };
};
