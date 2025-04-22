import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import "./PostItem.css"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EditModal from '../Modal/EditModal';
import DeleteModal from '../Modal/DeleteModal';
import Modal from '../Modal/Modal';
export default function PostItem({ post, isOwner, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
  

  return (
    <div className="post-item">
     <div className="post-header">
        <h3>{post.title}</h3>
        {isOwner && (
          <div className="post-actions">
              <FaRegEdit
                    className="me-3"
                    onClick={() => setIsEditing(true)}
                    size={20}
                    color={"blue"}
                    cursor={"pointer"}
                  />
                     <FaRegTrashAlt
                    onClick={() => setIsDeleting(true)}
                    size={20}
                    color={"red"}
                    cursor={"pointer"}
                  />
            {/* <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => setIsDeleting(true)}>Delete</button> */}
          </div>
        )}
      </div>     
     
      <p className="post-meta">
        @{post.username} • {formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true })}
      </p>

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
