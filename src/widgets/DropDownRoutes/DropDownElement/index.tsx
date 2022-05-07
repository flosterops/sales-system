import React, { ReactElement } from 'react';
import { Row } from 'ui/Layout';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { AlignItemsTypes, FontSizeTypes, ISpaceTypes, WeightTypes } from 'models/layout';
import { ERouteLinks } from 'models/route';
import { StyledChevron, StyledDropDownElement, StyledNavLink } from './styles';

interface IDropDownElement extends ISpaceTypes {
  path: ERouteLinks;
  text: string;
  icon: EIconTypes;
  selected: boolean;
  // eslint-disable-next-line react/require-default-props
  parent?: boolean;
  // eslint-disable-next-line react/require-default-props
  opened?: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

const DropDownElement = ({
  parent = false,
  opened = false,
  path,
  text,
  icon,
  selected,
  onClick,
  ...props
}: IDropDownElement): ReactElement => {
  const bg = selected ? colors.turquoise : colors.white;
  const color = selected ? colors.white : colors.turquoise;
  return (
    <StyledDropDownElement
      componentHeight="50px"
      bg={bg}
      onClick={onClick}
      padding="0 11px 0 24px"
      {...props}
    >
      <StyledNavLink to={path}>
        <Row ai={AlignItemsTypes.center}>
          <Icon type={icon} color={color} fontSize="33px" />
          <Description
            mleft="14px"
            color={color}
            weight={WeightTypes.w600}
            fontSize={FontSizeTypes.s}
          >
            {text}
          </Description>
        </Row>
        {parent && (
          <Row componentWidth="auto">
            <StyledChevron
              color={color}
              fontSize="16px"
              type={EIconTypes.downChevron}
              opened={opened}
            />
          </Row>
        )}
      </StyledNavLink>
    </StyledDropDownElement>
  );
};

export { DropDownElement };
