import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.className.includes('modal-background')) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-background"
      onClick={handleOutsideClick}
    >
      <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
