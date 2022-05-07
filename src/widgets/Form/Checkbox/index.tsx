import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { AlignItemsTypes } from 'models/layout';
import { isFunction, isString } from 'models/guards';
import { FieldHelperProps } from 'formik';
import {
  CheckboxDescription,
  StyledCheckbox,
  StyledCheckboxContainer,
  StyledCheckboxSpan,
} from './styles';

export interface ICheckbox {
  disabled?: boolean;
  label?: string | Function;
  onChange: (...args: any) => void;
  onBlur: (...args: any) => void;
  name: string;
  value: string;
  helpers: FieldHelperProps<any>;
}

const Checkbox: FunctionComponent<ICheckbox> = ({
  disabled,
  label,
  onChange,
  onBlur,
  name,
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  helpers,
}: PropsWithChildren<ICheckbox>): ReactElement => (
  <StyledCheckboxContainer componentWidth="auto" ai={AlignItemsTypes.center}>
    <StyledCheckboxSpan value={value}>
      <StyledCheckbox
        type="checkbox"
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        checked={!!value}
        name={name}
        id={name}
      />
    </StyledCheckboxSpan>
    {isString(label) && (
      <CheckboxDescription htmlFor={name} as="label">
        {label}
      </CheckboxDescription>
    )}
    {isFunction(label) && label()}
  </StyledCheckboxContainer>
);

export { Checkbox };
