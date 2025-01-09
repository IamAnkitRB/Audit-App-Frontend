import React from 'react';
import '../styles/Modal.scss';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
