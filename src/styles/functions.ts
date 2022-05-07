import {
  AlignItemsTypes,
  AlignTextTypes,
  ComponentSizesTypes,
  DirectionTypes,
  EFontFamilies,
  FontSizeTypes,
  ISpaceTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import {
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { EButtonsVariants } from 'models/button';
import { IButton } from 'ui/Button';
import { globalStyles } from './global';
import { buttonStyles } from './button';

interface SpaceValues {
  margin?: string;
  marginBottom?: string;
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  padding?: string;
  paddingBottom?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  [key: string]: any;
}

export const styledFontFamily = (props: { fontFamily?: EFontFamilies }): string => {
  if (props.fontFamily) {
    return globalStyles.fonts[props.fontFamily];
  }
  return globalStyles.fonts.default;
};

export const styledSpace = (props: ISpaceTypes): SpaceValues => ({
  margin: props.margin || '',
  marginBottom: props.mbottom || '',
  marginTop: props.mtop || '',
  marginLeft: props.mleft || '',
  marginRight: props.mright || '',
  padding: props.padding || '',
  paddingBottom: props.pbottom || '',
  paddingTop: props.ptop || '',
  paddingLeft: props.pleft || '',
  paddingRight: props.pright || '',
});

export const styledWeight = (props: { weight?: WeightTypes }): string => {
  if (props.weight) {
    return globalStyles.weight[props.weight];
  }
  return globalStyles.weight.default;
};

export const styledFontSize = (props: { fontSize?: FontSizeTypes }): string => {
  if (props.fontSize) {
    return globalStyles.fontSizes[props.fontSize];
  }
  return globalStyles.fontSizes.default;
};

export const styledComponentSize = (props: {
  componentSize?: ComponentSizesTypes;
}): string => {
  if (props.componentSize) {
    return globalStyles.componentSizes[props.componentSize];
  }
  return globalStyles.componentSizes.default;
};

export const styledDirection = (props: { direction?: DirectionTypes }): string => {
  if (props.direction) {
    return globalStyles.direction[props.direction];
  }
  return globalStyles.direction.default;
};

export const styledJc = (props: { jc?: JustifyContentTypes }): string => {
  if (props.jc) {
    return globalStyles.jc[props.jc];
  }
  return globalStyles.jc.default;
};

export const styledAi = (props: { ai?: AlignItemsTypes }): string => {
  if (props.ai) {
    return globalStyles.ai[props.ai];
  }
  return globalStyles.ai.default;
};

export const styledTextAlign = (props: { textAlign?: AlignTextTypes }): string => {
  if (props.textAlign) {
    return globalStyles.textAlign[props.textAlign];
  }
  return globalStyles.textAlign.default;
};

export const styledLh = (props: { lh?: string }): string => {
  if (props.lh) {
    return props.lh;
  }
  return 'auto';
};

export const styledButtonVariant = (props: {
  variant?: EButtonsVariants;
}): FlattenSimpleInterpolation | FlattenInterpolation<ThemedStyledProps<IButton, any>> => {
  if (props.variant) {
    return buttonStyles[props.variant];
  }
  return buttonStyles[EButtonsVariants.primary];
};
