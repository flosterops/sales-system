import React from 'react';
import { ITableColumns } from 'models/table';
import { Description } from 'ui/Description';
import { Row } from 'ui/Layout';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { NavLink } from 'ui/NavLink';
import { ERouteLinks } from 'models/route';

export const groupsColumns: ITableColumns[] = [
  {
    id: '7c50cb16-6e13-4f2a-8828-fa4977582001',
    key: 'name',
    title: 'Group name',
    render: (text) => <Description>{text}</Description>,
  },
  {
    id: 'b055553b-bca4-450b-9fb4-c3b827b1adb8',
    key: 'displayName',
    title: 'Application',
    render: (displayName) => <Description>{displayName}</Description>,
  },
  {
    id: '3d78b8cf-79de-4a4b-ba0a-10801b6f7a60',
    key: 'members',
    title: 'Users in group',
    render: (text) => (
      <Row ai={AlignItemsTypes.center}>
        <Icon type={EIconTypes.account} color={colors.turquoise} fontSize="14px" />
        <Description mleft="8px">{text || 0}</Description>
      </Row>
    ),
  },
  {
    id: 'aef14b15-2e40-44ba-84af-56df562b50c1',
    key: '',
    title: '',
    render: (value, props) => (
      <Row jc={JustifyContentTypes.flexEnd} ai={AlignItemsTypes.center}>
        <NavLink to={`${ERouteLinks.groups}/${props.id}` as ERouteLinks}>
          <Icon type={EIconTypes.pencil} color={colors.primary} pointer />
        </NavLink>
        <Icon mleft="18px" type={EIconTypes.trash} color={colors.error} pointer />
      </Row>
    ),
  },
];
