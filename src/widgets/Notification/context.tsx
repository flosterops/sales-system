import { createContext, useContext } from 'react';
import { INotificationOptions } from './provider';

export interface INotificationContext {
  options: INotificationOptions | null;
  openNotification: (options: INotificationOptions) => void;
}

export const NotificationContext = createContext<INotificationContext>(
  {} as INotificationContext,
);

export const useNotification = (): INotificationContext => useContext(NotificationContext);
