import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { Column } from 'ui/Layout';
import { useLocation } from 'react-router-dom';
import { DropDownElement } from '../DropDownElement';
import { IDropDownRoute } from '../index';
import { InnerElementsWrapper } from './styles';

const DropDownParent = ({ child, path, name, icon }: IDropDownRoute): ReactElement => {
  const location = useLocation();
  const [visible, setVisible] = useState<boolean>(location.pathname === path);
  const toggleVisible = useCallback(() => setVisible(!visible), [visible, setVisible]);

  const isChildSelected = useMemo(
    () =>
      child.some(
        (element: Omit<IDropDownRoute, 'child'>): boolean =>
          location.pathname === element.path,
      ),
    [child, location.pathname],
  );

  const opened = isChildSelected || visible;

  return (
    <Column mbottom="10px">
      <DropDownElement
        path={path}
        text={name}
        icon={icon}
        selected={location.pathname === path}
        opened={opened}
        onClick={toggleVisible}
        parent
      />
      {opened && (
        <InnerElementsWrapper pleft="20px" visible={opened}>
          {child.map(
            (element: Omit<IDropDownRoute, 'children'>): ReactElement => (
              <DropDownElement
                key={element.id}
                path={element.path}
                text={element.name}
                icon={element.icon}
                selected={element.path === location.pathname}
                mtop="10px"
              />
            ),
          )}
        </InnerElementsWrapper>
      )}
    </Column>
  );
};

export { DropDownParent };
