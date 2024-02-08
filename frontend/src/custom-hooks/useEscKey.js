import { useEffect } from 'react';

const useEscKey = (handleClose) => {
  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        handleClose();
        // closeAllPopups();
        // setIsInfoTooltipPopupOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [handleClose]);
};

export default useEscKey;