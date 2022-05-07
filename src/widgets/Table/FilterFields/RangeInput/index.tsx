import React, { ReactElement, useRef } from 'react';
import { ISpaceTypes } from 'models/layout';
import { IStyledInput } from 'widgets/Form/Input/styles';
import { colors } from 'styles/colors';
import { EInputTypes } from 'models/forms';
import { useIsFocused } from 'helpers/use-is-focused';
import { FilterInput } from '../FilterInput';
import { RangeInputContainer } from './styles';

interface IRangeInput {
  onChange: (value: string, name: string) => void;
  name: string;
}

type TRangeInput = ISpaceTypes & IStyledInput & IRangeInput;

const RangeInput = ({ onChange, name, ...props }: TRangeInput): ReactElement => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const isMinFocused = useIsFocused(minRef);
  const isMaxFocused = useIsFocused(maxRef);

  return (
    <RangeInputContainer isFocused={isMinFocused || isMaxFocused} {...props}>
      <FilterInput
        onChange={onChange}
        type={EInputTypes.number}
        inputRef={minRef}
        color={colors.transparent}
        name={`${name}-min`}
        placeholder="From"
      />
      <FilterInput
        onChange={onChange}
        type={EInputTypes.number}
        inputRef={maxRef}
        color={colors.transparent}
        name={`${name}-max`}
        placeholder="To"
      />
    </RangeInputContainer>
  );
};

export { RangeInput };
