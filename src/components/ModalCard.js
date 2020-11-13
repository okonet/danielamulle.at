import React from 'react';
import Modal from 'react-modal';
import { Close } from 'theme-ui'
import SubscribeForm from "./SubscribeForm"

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement(`#___gatsby`);
Modal.defaultStyles.overlay.zIndex = 2;

function ModalCard({ closeModal, isOpen }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        shouldCloseOnOverlayClick={true}
      >
        <Close onClick={closeModal}/>
        <SubscribeForm />
      </Modal>
    </div>
  )
}

export default ModalCard;
