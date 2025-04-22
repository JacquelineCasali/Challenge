import React, { useState } from 'react'
import PostItem from './PostItem'

export default function PostList({posts, username, onUpdate, onDelete}) {
   //ordenação
      const [sortOption, setSortOption] = useState('recent');
  
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === 'recent') {
      return new Date(b.created_datetime) - new Date(a.created_datetime);
    }
    if (sortOption === 'oldest') {
      return new Date(a.created_datetime) - new Date(b.created_datetime);
    }
    return 0;
  });
  return (
    <div className='div'>
      <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
  <option value="recent">Mais recentes</option>
  <option value="oldest">Mais antigos</option>
</select>
      {sortedPosts.map(post => (
        <PostItem 
          key={post.id} 
          post={post}
          isOwner={post.username.trim().toLowerCase() === username.trim().toLowerCase()}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
