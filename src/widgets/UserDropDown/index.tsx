import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { ERouteLinks } from 'models/route';
import { Column, Row } from 'ui/Layout';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import {
  AlignItemsTypes,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import useOnClickOutside from 'helpers/use-on-click-outside';
import { NavLink } from 'ui/NavLink';
import { EModalTypes } from 'models/modal';
import { useModal } from 'widgets/Modal/context';
import { EBreakWindowTypes } from 'models/break-window';
import config from './config.json';
import { DropDownMarker, PopupWrapper, UserDropDownWrapper } from './styles';

interface IDropDownLinkConfig {
  id: string;
  path: ERouteLinks;
  icon: EIconTypes;
  text: string;
}

interface IUserDropDown {
  name: string;
}

const UserDropDown = ({ name }: IUserDropDown): ReactElement => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { openModal } = useModal();

  const setVisibleCallback = useCallback((): void => setVisible(false), [setVisible]);

  useOnClickOutside(containerRef, setVisibleCallback);

  const handleLogOut = () => {
    openModal(EModalTypes.LogOutModal, { type: EBreakWindowTypes.default });
  };

  return (
    <UserDropDownWrapper
      jc={JustifyContentTypes.center}
      ai={AlignItemsTypes.spaceBetween}
      componentWidth="auto"
      bg={colors.white}
      layoutRef={containerRef}
    >
      <Row
        jc={JustifyContentTypes.spaceBetween}
        ai={AlignItemsTypes.center}
        padding="10px 17px 14px 24px"
        onClick={(): void => setVisible(!visible)}
      >
        <Icon type={EIconTypes.account} fontSize="24px" color={colors.turquoise} pointer />
        <Description weight={WeightTypes.w600} color={colors.turquoise}>
          Hello, {name}!
        </Description>
        <DropDownMarker
          type={EIconTypes.downChevron}
          color={colors.turquoise}
          visible={visible}
          pointer
        />
      </Row>
      <PopupWrapper visible={visible} height={ref.current?.clientHeight as number}>
        <Column padding="13px 17px 13px 24px" layoutRef={ref}>
          {(config as IDropDownLinkConfig[]).map(
            (item: IDropDownLinkConfig): ReactElement => (
              <NavLink key={item.id} to={item.path}>
                <Row ai={AlignItemsTypes.center} mbottom="20px">
                  <Row componentWidth="21px" mright="18px" jc={JustifyContentTypes.center}>
                    <Icon type={item.icon} color={colors.turquoise} />
                  </Row>
                  <Description fontSize={FontSizeTypes.m}>{item.text}</Description>
                </Row>
              </NavLink>
            ),
          )}
          <NavLink
            key="d17c9182-6ca2-11ec-90d6-0242ac120003"
            to={ERouteLinks.login}
            onClick={() => handleLogOut()}
          >
            <Row ai={AlignItemsTypes.center} margin="10px 0">
              <Row componentWidth="21px" mright="18px" jc={JustifyContentTypes.center}>
                <Icon type={EIconTypes.signOut} color={colors.turquoise} />
              </Row>
              <Description fontSize={FontSizeTypes.m}>Log out</Description>
            </Row>
          </NavLink>
        </Column>
      </PopupWrapper>
    </UserDropDownWrapper>
  );
};

export { UserDropDown };
