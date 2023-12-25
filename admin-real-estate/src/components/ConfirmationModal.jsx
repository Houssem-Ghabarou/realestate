import React from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className='confirmation-modal-backdrop'>
      <div className='confirmation-modal-content'>
        <p>{message}</p>
        <div className='confirmation-buttons'>
          <button className='confirm-btn' onClick={onConfirm}>
            Confirmer la suppression
          </button>
          <button className='cancel-btn' onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
