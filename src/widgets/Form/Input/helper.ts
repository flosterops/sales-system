import { EIconTypes } from 'models/icons';
import { EInputTypes } from 'models/forms';

export const getInputIcon = (type: EInputTypes, icon?: EIconTypes): EIconTypes | null => {
  if (type === EInputTypes.search) {
    return EIconTypes.search;
  }

  return icon || null;
};
