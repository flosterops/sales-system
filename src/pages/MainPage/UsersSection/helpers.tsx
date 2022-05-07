import React from 'react';
import { ITableColumns } from 'models/table';
import { Description } from 'ui/Description';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { THeadTitle } from 'widgets/Table/styles';
import { NavLink } from 'ui/NavLink';
import { ERouteLinks } from 'models/route';
import { ISearchGroup } from 'requests/fetch-groups';

interface IGetGroupUserColumns {
  onDelete?: (id: string) => void;
}

export const getGroupUserColumns = ({ onDelete }: IGetGroupUserColumns): ITableColumns[] => [
  {
    id: '9429b899-9e36-4c80-a4fe-11f70323f087',
    key: 'firstName',
    title: 'First name',
    render: (text) => <Description>{text}</Description>,
  },
  {
    id: 'dcfbcbe4-a118-48d3-8896-df6dea692219',
    key: 'lastName',
    title: 'Last name',
    render: (text) => <Description>{text}</Description>,
  },
  {
    id: 'c11a536a-17f2-490f-8ed0-530955cfc528',
    key: 'active',
    title: () => (
      <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.center}>
        <THeadTitle color={colors.primary} style={{ padding: '0' }}>
          Status
        </THeadTitle>
      </Row>
    ),
    render: (active) => (
      <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.center}>
        <Icon
          type={active ? EIconTypes.check : EIconTypes.cross}
          color={active ? colors.turquoise : colors.error}
          fontSize="14px"
        />
      </Row>
    ),
  },
  {
    id: '578c0996-3c71-4be5-868e-49c5fb58ad89',
    key: 'email',
    title: 'Email address',
    render: (text) => <Description>{text}</Description>,
  },
  {
    id: '86a514a6-d903-4526-86d8-4b2c04e994ff',
    key: '',
    title: '',
    render: (value, props) => (
      <Row jc={JustifyContentTypes.flexEnd} ai={AlignItemsTypes.center}>
        <NavLink to={`${ERouteLinks.users}/${props.id}` as ERouteLinks}>
          <Icon type={EIconTypes.userEdit} color={colors.primary} fontSize="23px" pointer />
        </NavLink>
        {onDelete && (
          <Icon
            onClick={() => onDelete(props.id)}
            mleft="18px"
            type={EIconTypes.trash}
            color={colors.error}
            pointer
          />
        )}
      </Row>
    ),
  },
];

export const parseGroupData = (group: ISearchGroup) => ({
  id: group.id,
  name: group.name,
  key: group.app.key,
  displayName: group.app.displayName,
  appId: group.app.id,
});

export const mapGroupSource = (groups: ISearchGroup[]) => groups.map(parseGroupData);
