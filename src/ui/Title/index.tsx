import React, { ReactElement, ReactNode, ReactNodeArray } from 'react';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import {
  FontSizeTypes,
  WeightTypes,
  ISpaceTypes,
  AlignTextTypes,
  EFontFamilies,
} from 'models/layout';
import {
  styledFontFamily,
  styledFontSize,
  styledLh,
  styledSpace,
  styledTextAlign,
  styledWeight,
} from 'styles/functions';

export enum TitleTags {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  default = 'h2',
}

export interface ITitle extends ISpaceTypes {
  color?: string;
  fontSize?: FontSizeTypes;
  uppercase?: boolean;
  weight?: WeightTypes;
  children: ReactNode | ReactNodeArray;
  tagName: TitleTags;
  textAlign?: AlignTextTypes;
  fontFamily?: EFontFamilies;
  lh?: string;
}

const StyledTitle = styled.h3<ITitle>`
  ${styledFontFamily}
  ${styledSpace};
  ${styledWeight};
  ${styledFontSize};
  ${styledTextAlign};
  ${styledLh};
  display: flex;
  width: auto;
  color: ${({ color }: ITitle): string => color as string};
  text-transform: ${(props: ITitle): string => (props.uppercase ? 'uppercase' : 'none')};
`;

/**
 * @description Default UI component for titles as h1, h2, ..., h6
 * @param children - React children props
 * @param color - text color
 * @param fontSize - font size
 * @param weight - font weight
 * @param textAlign - text align
 * @param tagName - which tagName will be used for title h1, h2, ..., h6
 * @param fontFamily - current font family type
 * @param lh - current line-height
 * @param props - other kind of props as onClick and etc.
 */
const Title: React.FC<ITitle> = ({
  children,
  color = colors.textPrimary,
  fontSize = FontSizeTypes.default,
  weight = WeightTypes.default,
  textAlign,
  tagName = TitleTags.default,
  fontFamily = EFontFamilies.default,
  lh = 'auto',
  ...props
}: ITitle): ReactElement => (
  <StyledTitle
    color={color}
    fontSize={fontSize}
    weight={weight}
    textAlign={textAlign}
    as={tagName}
    fontFamily={fontFamily}
    lh={lh}
    {...props}
  >
    {children}
  </StyledTitle>
);

export { Title };
