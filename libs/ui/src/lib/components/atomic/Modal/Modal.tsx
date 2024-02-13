import React from 'react';
import type { ModalProps } from 'reshaped';
import { Modal as ReshapedModal } from 'reshaped';

const Modal = (props: ModalProps) => {
  return <ReshapedModal {...props} />;
};
Modal.Title = ReshapedModal.Title;
Modal.Subtitle = ReshapedModal.Subtitle;
export default Modal;
