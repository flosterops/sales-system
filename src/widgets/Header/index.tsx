import React, { ReactElement } from 'react';
import { Logo } from 'ui/Logo';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { UserDropDown } from 'widgets/UserDropDown';
import { colors } from 'styles/colors';
import { ProjectSwitcher } from 'widgets/ProjectSwitcher';
import { useSelector } from 'react-redux';
import { TStore } from 'store';
import { HeaderItem, HeaderWrapper } from './styles';

const Header = (): ReactElement => {
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));
  return (
    <HeaderWrapper
      padding="30px"
      componentHeight="140px"
      jc={JustifyContentTypes.spaceBetween}
      bg={colors.white}
    >
      <HeaderItem>
        <ProjectSwitcher />
      </HeaderItem>
      <HeaderItem margin="0 50px" jc={JustifyContentTypes.center}>
        <Logo componentWidth="auto" componentHeight="100%" ai={AlignItemsTypes.center} />
      </HeaderItem>
      <HeaderItem jc={JustifyContentTypes.flexEnd}>
        <UserDropDown name={user?.firstName ?? 'User'} />
      </HeaderItem>
    </HeaderWrapper>
  );
};

export { Header };
