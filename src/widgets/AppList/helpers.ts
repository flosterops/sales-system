import { EAppKeyTypes } from 'models/applications';
import { colors } from 'styles/colors';
import { ERouteLinks } from 'models/route';

const getApplicationColor = (key: EAppKeyTypes): string => {
  switch (key) {
    case EAppKeyTypes.admin:
      return colors.turquoise;
    case EAppKeyTypes.salma:
      return colors.error;
    default:
      return colors.primary;
  }
};

const getApplicationPath = (key: EAppKeyTypes): ERouteLinks | null => {
  switch (key) {
    case EAppKeyTypes.admin:
      return ERouteLinks.admin;
    case EAppKeyTypes.salma:
      return ERouteLinks.dashboard;
    default:
      return null;
  }
};

export { getApplicationColor, getApplicationPath };
