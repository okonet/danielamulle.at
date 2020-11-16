import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Close } from 'theme-ui'
import SubscribeForm from "./SubscribeForm"
import { globalHistory } from "@reach/router"

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
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    return globalHistory.listen(({ location }) => {
      console.log(new RegExp(/\/projects\/\S+\/\S+/).test(location.pathname))
      if (new RegExp(/\/projects\/\S+\/\S+/).test(location.pathname)) setIsOpen(true)
    })
  }, [])
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyles}
        shouldCloseOnOverlayClick={true}
      >
        <Close onClick={() => setIsOpen(false)}/>
        <SubscribeForm />
      </Modal>
    </div>
  )
}

export default ModalCard;
