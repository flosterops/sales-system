import React, { ReactElement, ReactNode } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { ComponentSizesTypes, ISpaceTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import { getIconColor } from './helpers';
import {
  getAdditionalButtonCSS,
  StyledButton,
  StyledButtonLink,
  StyledButtonWrapper,
  StyledRipples,
} from './styles';

export interface IButton extends ISpaceTypes {
  color?: string;
  width?: string;
  height?: string;
  componentSize?: ComponentSizesTypes | string;
  onClick?: (...args: any) => void;
  disabled?: boolean;
  type?: EButtonTypes;
  padding?: string;
  ref?: any;
  children: ReactNode | ReactNode[];
  variant?: EButtonsVariants;
  href?: string;
  icon?: EIconTypes;
  to?: string;
  extraIconCss?: FlattenSimpleInterpolation;
}

const ButtonComponent: React.FC<IButton> = ({
  to,
  variant,
  children,
  type,
  ...props
}: IButton): ReactElement => {
  switch (variant) {
    case EButtonsVariants.link:
      return (
        <StyledButtonLink {...props} variant={variant} to={to as string}>
          {children}
        </StyledButtonLink>
      );
    case EButtonsVariants.primary:
    case EButtonsVariants.text:
    default:
      return (
        <StyledButton {...props} type={type as any} variant={variant}>
          {children}
        </StyledButton>
      );
  }
};

/**
 * @description - Default UI component for buttons
 * @param children - react children
 * @param type - current button role "submit" or "button"
 * @param color - current button color
 * @param componentSize - size of the button component
 * @param onClick - function for on click event
 * @param disabled - is button disabled
 * @param padding - padding for button
 * @param height - button height
 * @param width - button wight
 * @param href - button redirect link
 * @param variant - used to choose button style based on the variant
 * @param props - other kind of props
 * @param icon - current icon type
 * @param extraIconCss - additional icon styles
 * @param to - url for button variant as link
 */
const Button: React.FC<IButton> = ({
  children,
  type = EButtonTypes.button,
  color = colors.primary,
  componentSize = ComponentSizesTypes.default,
  onClick,
  disabled = false,
  padding,
  height,
  width,
  href,
  icon,
  variant = EButtonsVariants.primary,
  extraIconCss,
  to,
  ...props
}: IButton): ReactElement => (
  <StyledButtonWrapper componentSize={componentSize} {...props}>
    <StyledRipples color="rgba(255,255,255,0.4)">
      <ButtonComponent
        href={href}
        type={type}
        color={color}
        onClick={onClick}
        disabled={disabled}
        padding={padding}
        height={height}
        width={width}
        variant={variant}
        to={to}
      >
        {children}
        {icon && (
          <Icon
            fontSize="24px"
            type={icon}
            extra={getAdditionalButtonCSS(extraIconCss)}
            color={getIconColor(variant)}
            pointer
          />
        )}
      </ButtonComponent>
    </StyledRipples>
  </StyledButtonWrapper>
);

export { Button };
