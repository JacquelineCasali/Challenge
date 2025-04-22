import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import Modal from '../Modal/Modal';
import Title from '../Title/Tlite';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
export default function PostItem({ post, username, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
  
    const isOwner = post.username === username;
  return (
    <div className="post-item">
     <div className="post-header">
        <h3>{post.title}</h3>
        {isOwner && (
          <div className="post-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => setIsDeleting(true)}>Delete</button>
          </div>
        )}
      </div>     
     
      <p className="post-meta">
        @{post.username} • {formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true })}
      </p>

      <p className="post-content">{post.content}</p>

      {isEditing && (
        <Modal
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
        <Modal
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
