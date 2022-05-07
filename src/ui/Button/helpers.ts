import { EButtonsVariants } from 'models/button';
import { colors } from 'styles/colors';

const getIconColor = (variant: EButtonsVariants): string => {
  switch (variant) {
    case EButtonsVariants.primary:
    default:
      return colors.white;
  }
};

export { getIconColor };
