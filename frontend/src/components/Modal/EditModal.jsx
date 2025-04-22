import React, { useEffect, useState } from 'react'
import "./Modal.css"
import Title from '../Title/Tlite';


export default function EditModal({ title, content, onClose, onSave }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const isValid = newTitle.trim() && newContent.trim();
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
 
     
        <Title text="Edit Post"/>
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
             className="form-control  text-secondary"
        />
         <div className='text'>
            <label htmlFor="">Content</label>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
             className="form-control  text-secondary"
        />
        </div>
 
        <div className="modal-actions">
          <button onClick={onClose}
          className='btn cancel'
          >Cancel</button>
      <button
              className="btn save"
              onClick={() => onSave({ title: newTitle, content: newContent })}
              disabled={!isValid}
            >
              Save
            </button>
        </div>
      </div>
    </div>
  );
}