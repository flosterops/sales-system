import { IAppPermission } from 'requests/fetch-app-permissions';

export const getDefaultFeatures = (
  appPermissions: IAppPermission[],
  permissions: IAppPermission[],
): Record<string, boolean> => {
  const features = {} as Record<string, boolean>;

  appPermissions.forEach((appPermission: IAppPermission) => {
    features[appPermission.id] = false;

    permissions.forEach((permission: IAppPermission) => {
      if (appPermission.id === permission.id) {
        features[appPermission.id] = true;
      }
    });
  });

  return features;
};

export const getSubmitPermission = (
  permissions: IAppPermission[],
  features: Record<string, boolean>,
) => {
  const permissionsToAdd = [] as string[];
  const permissionsToRemove = [] as string[];

  permissions.forEach((permission: IAppPermission) => {
    if (!(permission.id in features)) {
      return permissionsToAdd.push(permission.id);
    }

    if (!features[permission.id]) {
      return permissionsToRemove.push(permission.id);
    }

    return undefined;
  });

  return { permissionsToAdd, permissionsToRemove };
};
