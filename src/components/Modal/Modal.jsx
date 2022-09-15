import s from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');
console.log(modalRoot);

export const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handleKeydownCloseModal = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeydownCloseModal);

    return () => {
      window.removeEventListener('keydown', handleKeydownCloseModal);
    };
  }, [onCloseModal]);

  return createPortal(
    <div className={s.backdrop} onClick={onCloseModal}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
