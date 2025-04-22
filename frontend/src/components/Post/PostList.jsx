import React from 'react'
import PostItem from './PostItem'

export default function PostList({posts, username, onUpdate, onDelete}) {
    return (
    <div className='div'>

      {posts.map((post) => (
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
