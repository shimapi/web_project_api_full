import { useEffect } from 'react';

const useEscKey = (handleClose) => {

  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        handleClose();
      }
    }
    function handleClickOutside(event) {
      if (event.target.classList.contains('modal_active')) {
        handleClose();
      }
    }
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClose]);

};

export default useEscKey;