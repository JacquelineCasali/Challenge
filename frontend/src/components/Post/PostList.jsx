import React from 'react'
import PostItem from './PostItem'

export default function PostList({posts, username, onUpdate, onDelete}) {
  return (
    <div>
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post}
          isOwner={post.username === username}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
