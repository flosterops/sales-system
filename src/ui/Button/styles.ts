import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Ripples from 'react-ripples';
import { globalStyles } from 'styles/global';
import {
  styledButtonVariant,
  styledComponentSize as buttonSize,
  styledSpace,
} from 'styles/functions';
import { colors } from 'styles/colors';
import { Link } from 'react-router-dom';
import { IButton } from './index';

export const StyledButtonLink = styled(Link)<IButton>`
  ${globalStyles.fontSizes.default};
  ${globalStyles.fonts.default};
  cursor: pointer;
  width: ${({ width }: IButton): string => width || '100%'};
  height: ${({ height }: IButton): string =>
    height || `${globalStyles.global.componentHeight}px;`};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 42px;
  :hover {
    filter: grayscale(0.2);
    transition: 0.4s ease;
  }
  padding: ${({ padding }: IButton): string => padding || '0'};

  ${(props: IButton): any =>
    props.disabled &&
    css`
      background: ${colors.disabled};
      color: ${colors.textDisabled};
    `};

  ${styledButtonVariant};
`;

export const StyledButton = styled.button<IButton>`
  ${globalStyles.fontSizes.default};
  ${globalStyles.fonts.default};
  cursor: pointer;
  width: ${({ width }: IButton): string => width || '100%'};
  height: ${({ height }: IButton): string =>
    height || `${globalStyles.global.componentHeight}px;`};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 42px;
  :hover {
    filter: grayscale(0.2);
    transition: 0.4s ease;
  }
  padding: ${({ padding }: IButton): string => padding || '0'};

  ${(props: IButton): any =>
    props.disabled &&
    css`
      background: ${colors.disabled};
      color: ${colors.textDisabled};
    `};

  ${styledButtonVariant};
`;

export const StyledButtonWrapper = styled.div<any>`
  ${buttonSize};
  ${styledSpace};
`;

export const StyledRipples = styled(Ripples)`
  width: 100%;
`;

export const getAdditionalButtonCSS = (extraCSS?: FlattenSimpleInterpolation) => css`
  position: absolute;
  z-index: 2;
  right: 15px;
  ${extraCSS}
`;
