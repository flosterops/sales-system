import React, { ReactElement } from 'react';
import { Column } from 'ui/Layout';
import { EIconTypes } from 'models/icons';
import { ERouteLinks } from 'models/route';
import config from './config.json';
import { DropDownParent } from './DropDownParent';

export interface IDropDownRoute {
  id: string;
  name: string;
  icon: EIconTypes;
  path: ERouteLinks;
  child: Omit<IDropDownRoute, 'children'>[];
}

const DropDownRoutes = (): ReactElement => (
  <Column>
    {(config as IDropDownRoute[]).map(
      (element: IDropDownRoute): ReactElement => (
        <DropDownParent
          id={element.id}
          key={element.id}
          path={element.path}
          icon={element.icon}
          name={element.name}
          child={element.child}
        />
      ),
    )}
  </Column>
);

export { DropDownRoutes };
