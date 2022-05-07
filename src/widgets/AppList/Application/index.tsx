import React, { ReactElement } from 'react';
import { Description } from 'ui/Description';
import {
  AlignItemsTypes,
  AlignTextTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { colors } from 'styles/colors';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { ApplicationWrapper, Circle, Selected } from './styles';

interface IApplication {
  selected: boolean;
  name: string;
  description: string;
  onClick: (id: string) => void;
  bg: string;
}

const Application = ({
  selected,
  name,
  description,
  onClick,
  bg,
}: IApplication): ReactElement => (
  <ApplicationWrapper
    selected={selected}
    padding="23px 0 24px"
    ai={AlignItemsTypes.center}
    jc={JustifyContentTypes.spaceBetween}
    componentWidth="142px"
    componentHeight="100%"
    onClick={onClick}
  >
    <Selected
      bg={colors.primary}
      jc={JustifyContentTypes.center}
      ai={AlignItemsTypes.center}
      componentHeight="44px"
      componentWidth="44px"
      selected={selected}
    >
      <Icon type={EIconTypes.check} color={colors.white} fontSize="20px" />
    </Selected>
    <Circle
      bg={bg}
      componentWidth="93px"
      componentHeight="93px"
      jc={JustifyContentTypes.center}
      ai={AlignItemsTypes.center}
    >
      <Description fontSize={FontSizeTypes.xl} color={colors.white}>
        {name}
      </Description>
    </Circle>
    <Description
      fontFamily={EFontFamilies.bree}
      fontSize={FontSizeTypes.m}
      textAlign={AlignTextTypes.center}
    >
      {description}
    </Description>
  </ApplicationWrapper>
);

export { Application };
