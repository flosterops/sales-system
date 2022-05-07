import React, { ReactElement, useState } from 'react';
import { IStyledInput, StyledInput } from 'widgets/Form/Input/styles';
import { ISpaceTypes } from 'models/layout';
import { EInputTypes } from 'models/forms';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';

interface IFilterInput {
  onChange: (value: string, name: string) => void | Promise<void>;
  name: string;
  type: EInputTypes;
  // eslint-disable-next-line react/require-default-props
  placeholder?: string;
  // eslint-disable-next-line react/require-default-props
  inputRef?: any;
}

type TFilterInput = ISpaceTypes & IStyledInput & IFilterInput;

const FilterInput = ({
  onChange,
  type = EInputTypes.search,
  color = colors.primary,
  name,
  inputRef,
  placeholder,
  ...props
}: TFilterInput): ReactElement => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: any): void => {
    setValue(e.target.value);
    onChange(e.target.value, name);
  };

  return (
    <Row {...props}>
      <StyledInput
        className="filter-input"
        ref={inputRef}
        color={color}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </Row>
  );
};

export { FilterInput };
