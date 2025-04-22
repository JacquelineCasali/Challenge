import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import "./PostItem.css"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EditModal from '../Modal/EditModal';
import DeleteModal from '../Modal/DeleteModal';
import { updatePost } from '../../services/api';

export default function PostItem({ post, isOwner, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
   
    const [newComment, setNewComment] = useState('');
    let contentParsed;
    try {
      contentParsed = JSON.parse(post.content);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      contentParsed = {
        text: post.content,
        likes: 0,
        comments: [],
        mentions: [],
      };
    }
    const [likes, setLikes] = useState(contentParsed.likes || 0);
  const [comments, setComments] = useState(contentParsed.comments || []);
  const [mentions, setMentions] = useState(contentParsed.mentions || []);

  const handleLike = async () => {
    const updatedContent = {
      ...contentParsed,
      likes: likes + 1,
    };
    await updatePost(post.id, { content: JSON.stringify(updatedContent) });
    setLikes(likes + 1);
    onUpdate();
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const mentionTags = newComment.match(/@(\w+)/g) || [];
    const updatedContent = {
      ...contentParsed,
      comments: [...comments, { user: post.username, text: newComment }],
      mentions: Array.from(new Set([...mentions, ...mentionTags])),
    };

    await updatePost(post.id, { content: JSON.stringify(updatedContent) });
    setComments(updatedContent.comments);
    setMentions(updatedContent.mentions);
    setNewComment('');
    onUpdate();
  };




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
      <span className='span'> {formatDistanceToNow(new Date(post.created_datetime),{ addSuffix: true })}</span>
     </div>
   

     <p className="post-content">{contentParsed.text}</p>
     <div className="likes">
        <button onClick={handleLike} className="btn-likes">
          👍 {likes}
        </button>
      </div>
      <div className="comments">
        <h4>Comentários</h4>
        {comments.map((c, index) => (
          <p key={index}><strong>@{c.user}</strong>: {c.text}</p>
        ))}
        <input
          type="text"
          placeholder="Adicione um comentário"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Comentar</button>
      </div>

      {mentions.length > 0 && (
        <div className="mentions">
          <strong>Menções:</strong> {mentions.join(', ')}
        </div>
      )}


      {isEditing && (
        <EditModal
          title={post.title}
          content={contentParsed.text}
          onClose={() => setIsEditing(false)}
          onSave={(updated) => {
            const updatedContent = {
              ...contentParsed,
              text: updated.content,
            };
            onUpdate(post.id, { ...updated, content: JSON.stringify(updatedContent) });
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
