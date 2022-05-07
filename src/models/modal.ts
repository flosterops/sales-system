export enum EModalTypes {
  appList = 'appList',
  sure = 'sure',
  LogOutModal = 'LogOutModal',
}

export interface IModalContext {
  id: EModalTypes | '';
  options: any;
  openModal: (id: EModalTypes | '', options?: any) => void;
  closeModal: () => void;
}
