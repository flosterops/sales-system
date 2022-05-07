import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { ENotificationTypes } from 'models/notification';
import { NotificationContext } from './context';

export interface INotificationOptions {
  type: ENotificationTypes;
  text: string;
}

export const NotificationProvider = ({ children }: PropsWithChildren<{}>) => {
  const [options, setOptions] = useState<INotificationOptions | null>(null);

  const openNotification = useCallback(
    (value: INotificationOptions): void => {
      setOptions(value);
      setTimeout(() => setOptions(null), 3000);
    },
    [setOptions],
  );

  const notificationState = useMemo(
    () => ({ options, openNotification }),
    [openNotification, options],
  );

  return (
    <NotificationContext.Provider value={notificationState}>
      {children}
    </NotificationContext.Provider>
  );
};
