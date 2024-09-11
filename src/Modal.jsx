import React from "react";
import "./Modal.css";

export function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-background">
      <section className="modal-main">
        <button className="close" type="button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          {children}
        </div>
      </section>
    </div>
  );
}

export default Modal;
