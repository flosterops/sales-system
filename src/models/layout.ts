export enum ButtonTypes {
  submit = 'submit',
  button = 'button',
  default = 'button',
}

export enum ComponentSizesTypes {
  s = 's',
  l = 'l',
  m = 'm',
  full = 'full',
  auto = 'auto',
  default = 'default',
}

export enum FontSizeTypes {
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m = 'm',
  xm = 'xm',
  xxm = 'xxm',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl',
  default = 'default',
}

export enum EFontFamilies {
  default = 'default',
  bree = 'bree',
}

export enum WeightTypes {
  w300 = '300',
  w400 = '400',
  w500 = '500',
  w600 = '600',
  w700 = '700',
  w800 = '800',
  default = '400',
}

export enum DirectionTypes {
  row = 'row',
  column = 'column',
  default = 'column',
}

export enum JustifyContentTypes {
  flexStart = 'flexStart',
  center = 'center',
  stretch = 'stretch',
  flexEnd = 'flexEnd',
  spaceBetween = 'spaceBetween',
  spaceAround = 'spaceAround',
  default = 'default',
}

export enum AlignItemsTypes {
  flexStart = 'flexStart',
  center = 'center',
  stretch = 'stretch',
  flexEnd = 'flexEnd',
  spaceBetween = 'spaceBetween',
  spaceAround = 'spaceAround',
  default = 'default',
}

export enum AlignTextTypes {
  center = 'center',
  left = 'left',
  right = 'right',
  default = 'left',
}

export interface ISpaceTypes {
  margin?: string;
  mbottom?: string;
  mtop?: string;
  mleft?: string;
  mright?: string;
  padding?: string;
  pbottom?: string;
  ptop?: string;
  pleft?: string;
  pright?: string;
}
