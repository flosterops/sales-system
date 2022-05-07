import React, { ReactElement } from 'react';
import { ISpaceTypes } from 'models/layout';
import { EIconTypes } from 'models/icons';
import { icons } from 'helpers/constants';
import { FlattenSimpleInterpolation } from 'styled-components';
import { StyledIcon } from './styles';

export interface IIcon extends ISpaceTypes {
  type: EIconTypes;
  color?: string;
  extra?: FlattenSimpleInterpolation;
  fontSize?: string;
  onClick?: (...args: any) => void;
  pointer?: boolean;
}

const Icon = ({
  type,
  color,
  extra,
  onClick,
  fontSize,
  pointer = false,
  ...props
}: IIcon): ReactElement => (
  <StyledIcon
    {...props}
    icon={icons[type]}
    color={color}
    fontSize={fontSize}
    onClick={onClick}
    extra={extra}
    pointer={pointer}
  />
);

export { Icon };
