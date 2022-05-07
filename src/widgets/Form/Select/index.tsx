import React, { FunctionComponent, ReactElement, useRef } from 'react';
import { FieldHelperProps } from 'formik';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { extraIconStyles, StyledLabel } from 'widgets/Form/Input/styles';
import { SelectMenuPlacement } from 'models/forms';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import { AlignItemsTypes } from 'models/layout';
import { getSelectStyles } from './helpers';
import { DropdownIndicator } from './components';
import { StyledSelect } from './styles';

export interface ISelectOptionsModel {
  value: string | number;
  label: string | number;
}

export interface ISelectSearchProp {
  options: ISelectOptionsModel[];
  value: string;
  onChange: (...args: any) => void;
  onBlur: (...args: any) => void;
  helpers: FieldHelperProps<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  color?: string;
  label?: string;
  error?: string;
  touched?: boolean;
  icon?: EIconTypes;
  selectProps?: ISpecialSelectOptions;
}

export interface ISpecialSelectOptions {
  id?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  menuPlacement?: SelectMenuPlacement;
  styles?: any;
  isLoading?: boolean;
}

const SelectSearch: FunctionComponent<ISelectSearchProp> = ({
  options,
  color = colors.primary,
  disabled,
  placeholder,
  selectProps = {},
  onChange,
  onBlur,
  value,
  name,
  label,
  touched,
  error,
  icon,
}): ReactElement => {
  const ref = useRef<HTMLSelectElement | null>(null);
  const {
    isClearable = false,
    isSearchable = false,
    menuPlacement = SelectMenuPlacement.default,
    isLoading = false,
  } = selectProps;

  const handleChange = (option: ISelectOptionsModel) => {
    const optionValue = option === null ? '' : option.value;
    onChange({ target: { value: optionValue, name } });
  };

  const hasError = touched && error;
  const updatedColor = hasError ? colors.error : color;
  const styles = getSelectStyles({ color: updatedColor }).default;
  const selected = options.find((opt: ISelectOptionsModel): boolean => opt.value === value);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    onBlur(e);
  };

  return (
    <Row ai={AlignItemsTypes.center}>
      {icon && <Icon pointer type={icon} color={updatedColor} extra={extraIconStyles} />}
      {label && (
        <StyledLabel padding="0 10px" color={updatedColor}>
          {label}
        </StyledLabel>
      )}
      <StyledSelect
        id={name}
        name={name}
        options={options}
        value={selected}
        defaultValue={value || ''}
        placeholder={placeholder}
        ref={ref as any}
        onChange={handleChange as any}
        onBlur={handleBlur}
        color={color}
        isDisabled={disabled}
        isClearable={isClearable}
        menuPlacement={menuPlacement}
        isSearchable={isSearchable}
        blurInputOnSelect
        components={{ DropdownIndicator }}
        isLoading={isLoading}
        // @ts-ignore
        styles={styles}
      />
    </Row>
  );
};

export { SelectSearch as Select };
