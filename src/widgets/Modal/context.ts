import { createContext, useContext } from 'react';
import { IModalContext } from 'models/modal';

const ModalContext = createContext<IModalContext>({} as IModalContext);

const useModal = (): IModalContext => useContext(ModalContext);

export { ModalContext, useModal };
