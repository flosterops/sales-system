import React, { ReactElement, useMemo, useRef } from 'react';
import { EModalTypes } from 'models/modal';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import useOnClickOutside from 'helpers/use-on-click-outside';
import { AppList } from 'widgets/AppList';
import { SureModal } from 'widgets/SureModal';
import { LogOutModal } from 'widgets/LogOutModal';
import { useModal } from './context';
import { ModalWrapper } from './styles';

const modals = {
  [EModalTypes.appList]: AppList,
  [EModalTypes.sure]: SureModal,
  [EModalTypes.LogOutModal]: LogOutModal,
};

const Modal = (): ReactElement => {
  const { id, options, closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, () => closeModal());

  const Component = useMemo(() => {
    if (id && id in modals) {
      return modals[id];
    }

    return null;
  }, [id]);

  return (
    <ModalWrapper
      componentWidth="100%"
      componentHeight="100vh"
      ai={AlignItemsTypes.center}
      jc={JustifyContentTypes.center}
      visible={!!id}
    >
      <div ref={modalRef}>{Component ? <Component {...options} /> : null}</div>
    </ModalWrapper>
  );
};

export { Modal };
