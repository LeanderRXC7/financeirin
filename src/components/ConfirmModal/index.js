import React from "react";
import * as C from "./styles";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null; // Não renderizar o modal se `show` for falso

  return (
    <C.Backdrop onClick={onClose}>
      <C.ModalContainer onClick={(e) => e.stopPropagation()}>
        <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        <C.Content>{children}</C.Content>
      </C.ModalContainer>
    </C.Backdrop>
  );
};

export default Modal;
