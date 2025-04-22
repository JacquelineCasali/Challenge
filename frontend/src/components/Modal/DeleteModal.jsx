import React, { useEffect } from 'react'
import "./Modal.css"
export default function DeleteModal({ onCancel, onConfirm }) {
  useEffect(() => {
    // Ao abrir o modal, trava o scroll do body
    document.body.style.overflow = 'hidden';
  
    // Ao fechar (desmontar), restaura
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);   

    return (
    <div className="background">
    <div className="modals">
      <h3>Are you sure you want to delete this item?</h3>
      <div className="modal-actions">
        <button onClick={onCancel}>Cancel</button>
        <button 
        
        onClick={onConfirm} className="danger">Delete</button>
      </div>
    </div>
  </div>
  )
}
