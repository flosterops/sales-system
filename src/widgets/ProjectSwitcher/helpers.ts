import { colors } from 'styles/colors';

export const getPlatformBg = (i: number): string => {
  if (i % 3 === 0) {
    return colors.primary;
  }

  if (i % 2 === 0) {
    return colors.turquoise;
  }

  return colors.error;
};
