import { ISelectStyleOptions } from 'models/forms';
import { getDefaultSelectStyle } from './styles';

export const selectStyles = {
  default: getDefaultSelectStyle,
};

export const getSelectStyles = (options: ISelectStyleOptions) => ({
  default: getDefaultSelectStyle(options),
});
