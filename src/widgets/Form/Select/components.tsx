import React, { ReactElement } from 'react';
import { colors } from 'styles/colors';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';

const DropdownIndicator = (props: any): ReactElement => {
  const {
    children = <Icon type={EIconTypes.rightChevron} color={colors.primary} pointer />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref} style={getStyles('dropdownIndicator', props)}>
      {children}
    </div>
  );
};

export { DropdownIndicator };
