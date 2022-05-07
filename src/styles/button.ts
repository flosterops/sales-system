import { css } from 'styled-components';
import { EButtonsVariants } from 'models/button';
import { IButton } from 'ui/Button';
import { colors } from './colors';

const buttonStyles = {
  [EButtonsVariants.link]: css`
    background: ${(props: IButton): string => props.color || colors.primary};
    color: ${colors.white};
  `,
  [EButtonsVariants.primary]: css`
    background: ${(props: IButton): string => props.color || colors.primary};
    color: ${colors.white};
  `,
  [EButtonsVariants.text]: css`
    background: ${colors.transparent};
    color: ${(props: IButton): string => props.color || colors.primary};
    padding: 0;
    height: auto;
  `,
  [EButtonsVariants.turquoise]: css`
    background: ${colors.turquoise};
    color: ${colors.white};
  `,
};

export { buttonStyles };
