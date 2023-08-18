import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const portal = document.getElementById('modal-root');

export default function Modal({largeImageURL, tags, modalToggle}) {


  
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
  
    function closeModal (e) {
      if (e.code === 'Escape') {
        modalToggle();
      }
    }

    return () => {
      window.removeEventListener('keydown', closeModal);
    }
  }, [modalToggle])

  function closeModalByClick (e) {
    if ( e.currentTarget === e.target) {
      modalToggle();
    }
  }

    return createPortal(
      <div className={css.Overlay} onClick={closeModalByClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      portal
    );
  }
