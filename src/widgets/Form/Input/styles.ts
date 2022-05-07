import styled, { css } from 'styled-components';
import { globalStyles } from 'styles/global';
import { colors } from 'styles/colors';
import { EIconTypes } from 'models/icons';
import { Description, IDescription } from 'ui/Description';

export const extraIconStyles = css`
  position: absolute;
  left: 20px;
  z-index: 5;
`;

export const StyledField = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export interface IStyledInput {
  color: string;
  icon?: EIconTypes;
  error?: boolean;
  disabled?: boolean;
}

export const StyledInput = styled.input<IStyledInput>`
  width: 100%;
  ${globalStyles.fonts.default};
  ${globalStyles.fontSizes.xm};
  height: ${globalStyles.global.componentHeight}px;
  border-radius: 25px;
  border: 2px solid ${(props): string => props.color};
  color: ${colors.black};
  padding: ${(props) => (props.icon ? '0 14px 0 54px' : '0 14px')};
  box-sizing: border-box;
  outline: 0;
  &:focus {
    transition: 0.2s;
  }

  ::placeholder {
    color: ${colors.placeholder};
  }

  ${(props: IStyledInput) =>
    props.disabled &&
    css`
      background: ${colors.disabled};
      color: ${colors.textPrimary};
      border-color: ${colors.disabled};
    `}
  &.filter-input {
    border: 2px solid ${colors.border};
    border-radius: 5px;
    padding: 0 7px;
    height: 40px;
    &:focus {
      border: 2px solid ${(props) => props.color};
      transition: none;
    }
  }
`;

export const StyledLabel = styled(Description)<IDescription>`
  position: absolute;
  top: -8px;
  background-color: ${colors.primary};
  color: ${colors.white};
  left: 30px;
  border-radius: 20px;
  z-index: 6;
`;
