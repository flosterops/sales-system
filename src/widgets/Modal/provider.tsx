import React, { PropsWithChildren, ReactElement, useState } from 'react';
import { EModalTypes } from 'models/modal';
import { ModalContext } from './context';

const ModalProvider = ({ children }: PropsWithChildren<{}>): ReactElement => {
  const [modalId, setModalId] = useState<EModalTypes | ''>('');
  const [modalOptions, setModalOptions] = useState<any>({});

  const modalState = {
    id: modalId,
    options: modalOptions,
    openModal: (id: EModalTypes | '', options?: any): void => {
      setModalId(id);
      setModalOptions(options || {});
    },
    closeModal: (): void => {
      setModalId('');
      setModalOptions({});
    },
  };

  return <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>;
};

export { ModalProvider };
