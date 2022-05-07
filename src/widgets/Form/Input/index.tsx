import React, { FunctionComponent, ReactElement } from 'react';
import { colors } from 'styles/colors';
import { ISpaceTypes } from 'models/layout';
import { EInputTypes } from 'models/forms';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import { FieldHelperProps } from 'formik';
import { getInputIcon } from './helper';
import { StyledField, StyledInput, extraIconStyles, StyledLabel } from './styles';

export interface IInput extends ISpaceTypes {
  name: string;
  type: EInputTypes;
  value: string;
  color?: string;
  icon?: EIconTypes;
  label?: string;
  onChange: (...args: any) => void;
  onBlur: (...args: any) => void;
  placeholder?: string;
  helpers: FieldHelperProps<string>;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const Input: FunctionComponent<IInput> = ({
  color = colors.primary,
  type = EInputTypes.text,
  label = '',
  placeholder = '',
  disabled = false,
  error = '',
  icon,
  name,
  touched,
  onChange,
  onBlur,
  value,
}: IInput): ReactElement => {
  const inputIcon = getInputIcon(type, icon);
  const hasError = error && touched;
  const updatedColor = hasError ? colors.error : color;
  return (
    <StyledField>
      {inputIcon && (
        <Icon fontSize="21px" type={inputIcon} color={updatedColor} extra={extraIconStyles} />
      )}
      {label && (
        <StyledLabel padding="0 10px" color={updatedColor}>
          {label}
        </StyledLabel>
      )}
      <StyledInput
        onChange={onChange}
        onBlur={onBlur}
        icon={icon}
        color={updatedColor}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
      />
    </StyledField>
  );
};

export { Input };
