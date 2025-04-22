import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import "./PostItem.css"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EditModal from '../Modal/EditModal';
import DeleteModal from '../Modal/DeleteModal';

export default function PostItem({ post, isOwner, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
  

  return (
    <div className="post-item">
     <div className="post-header">
        <h3>{post.title}</h3>
        {isOwner && (
          <div className="post-actions">
                  <FaRegTrashAlt
                  className="me-4"
                  onClick={() => setIsDeleting(true)}
                    size={20}
                    color={"white"}
                    cursor={"pointer"}
                  />
     
             
              <FaRegEdit
                    
                    onClick={() => setIsEditing(true)}
                    size={20}
                    color={"white"}
                    cursor={"pointer"}
                  />
                
          </div>
        )}
      </div>     
     <div className='post-title'>
     <span className="post-meta">
        @{post.username} 
       </span>
      <span className='span'> {formatDistanceToNow(new Date(post.created_datetime))}</span>
     </div>
   

      <p className="post-content">{post.content}</p>

      {isEditing && (
        <EditModal
          title={post.title}
          content={post.content}
          onClose={() => setIsEditing(false)}
          onSave={(updated) => {
            onUpdate(post.id, updated);
            setIsEditing(false);
          }}
        />
      )}

      {isDeleting && (
        <DeleteModal
          onCancel={() => setIsDeleting(false)}
          onConfirm={() => {
            onDelete(post.id);
            setIsDeleting(false);
          }}
        />
      )}
    </div>
  );
}
