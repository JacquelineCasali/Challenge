import React, { useEffect, useState } from 'react'
import Title from '../Title/Tlite';
import "./Post.css"
import CadastroPost from './CadastroPost';
import PostList from './PostList';
import { createPost, deletePost, getPosts, updatePost } from '../../services/api';
export default function Post({username}) {

    const [posts, setPosts] = useState([]);

   

    const fetchPosts = async () => {
        const response = await getPosts();
        setPosts(response.data.results.reverse()); // mais recente primeiro
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);
    
      const handleCreate = async ({ title, content }) => {
        await createPost({ username, title, content });
        fetchPosts();
      };
    
      const handleUpdate = async (id, updatedData) => {
        await updatePost(id, updatedData);
        fetchPosts();
      };
    
      const handleDelete = async (id) => {
        await deletePost(id);
        fetchPosts();
      };
    
    
  
  return (
    <section className="post">
     <Title text="CodeLeap Network" theme={"h1"} />
<CadastroPost onSubmit={handleCreate}/>
<PostList 
        posts={posts} 
        username={username}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
 
  </section>

  )
}
