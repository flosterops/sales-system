import React, { ReactElement, useCallback, useRef, useState } from 'react';
import menu from 'assets/images/menu.svg';
import { colors } from 'styles/colors';
import useOnClickOutside from 'helpers/use-on-click-outside';
import {
  AlignItemsTypes,
  AlignTextTypes,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { ERouteLinks } from 'models/route';
import { Description } from 'ui/Description';
import { Row } from 'ui/Layout';
import { useSelector } from 'react-redux';
import { TStore } from 'store';
import {
  PlatformLink,
  PlatformLogo,
  PlatformsWrapper,
  ProjectSwitcherWrapper,
} from './styles';
import { getPlatformBg } from './helpers';
import { useFetchUserApps } from './hooks';

export interface IPlatformConfig {
  id: string;
  name: string;
  shortName: string;
  path: ERouteLinks;
}

const ProjectSwitcher = (): ReactElement => {
  const { accessToken } = useSelector((state: TStore) => ({
    accessToken: state.user.auth.accessToken,
  }));
  const [visible, setVisible] = useState<boolean>(false);
  const setVisibleCallback = useCallback((): void => setVisible(false), [setVisible]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const { apps } = useFetchUserApps();

  useOnClickOutside(containerRef, setVisibleCallback);

  const handleRedirect = (e: React.MouseEvent<HTMLLinkElement>, path: string): void => {
    e.preventDefault();
    if (accessToken) {
      window.open(`${path}/token-page`, '_self');
    }
  };

  return (
    <ProjectSwitcherWrapper
      componentHeight="60px"
      componentWidth="60px"
      bg={visible ? '#f5f5f5' : colors.transparent}
      onClick={(): void => setVisible(!visible)}
      layoutRef={containerRef}
      ai={AlignItemsTypes.center}
      jc={JustifyContentTypes.center}
      mtop="-14px"
    >
      <img src={menu} alt="menu" />
      <PlatformsWrapper visible={visible} height={ref.current?.clientHeight as number}>
        <Row
          layoutRef={ref}
          bg={colors.white}
          padding="40px"
          jc={JustifyContentTypes.spaceAround}
        >
          {apps.map(
            (platform: IPlatformConfig, i: number): ReactElement => (
              <PlatformLink
                onClick={(e) => handleRedirect(e, platform.path)}
                to={platform.path}
                key={platform.id}
              >
                <PlatformLogo
                  componentHeight="60px"
                  componentWidth="60px"
                  ai={AlignItemsTypes.center}
                  jc={JustifyContentTypes.center}
                  bg={getPlatformBg(i + 1)}
                >
                  <Description color={colors.white} fontSize={FontSizeTypes.l}>
                    {platform.shortName}
                  </Description>
                </PlatformLogo>
                <Description mtop="10px" textAlign={AlignTextTypes.center}>
                  {platform.name}
                </Description>
              </PlatformLink>
            ),
          )}
        </Row>
      </PlatformsWrapper>
    </ProjectSwitcherWrapper>
  );
};

export { ProjectSwitcher };
