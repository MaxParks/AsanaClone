import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import LoginFormModal from '../components/LoginFormModal'
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal () {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext)

  if (!modalRef || !modalRef.current || !modalContent) return null

  const isLoginFormModal = modalContent.type === LoginFormModal 
  const modalClass = isLoginFormModal ? 'login-modal' : 'signup-modal'

  return ReactDOM.createPortal(
    <div id='modal'>
      <div
        id='modal-background'
        onClick={closeModal}
        className={modalClass} // Add the modal class here
      />
      <div id='modal-content'>{modalContent}</div>
    </div>,
    modalRef.current
  )
}


export const useModal = () => useContext(ModalContext);
