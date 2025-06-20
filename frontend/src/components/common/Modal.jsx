import React, { useEffect } from 'react';

const Modal = ({ open, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-4 w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
