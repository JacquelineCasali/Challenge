import React, { useContext} from 'react'
import Title from '../Title/Tlite';
import "./Post.css"
import CadastroPost from './CadastroPost';
import PostList from './PostList';
import { createPost, deletePost,  updatePost } from '../../services/api';
import Search from '../Search/Search';
import { BuscaContext } from '../../context/BuscaContext';


export default function Post({username}) {
  const {busca,setBusca,setPage,fetchAllPosts,sortOrder,setSortOrder,
    visiblePosts,hasMorePosts,handleLoadMore
  }=useContext(BuscaContext)
    const handleCreate = async ({ title, content }) => {
        await createPost({ username, title, content });
        setPage(1);
        fetchAllPosts();
      };

      const handleUpdate = async (id, updatedData) => {
        await updatePost(id, updatedData);
        fetchAllPosts();
      };
    
      const handleDelete = async (id) => {
        await deletePost(id);
        fetchAllPosts();
      };
    
  return (
    <section className="post">
     <Title text="CodeLeap Network" theme={"h1"} />
<CadastroPost onSubmit={handleCreate}/>

<div className="filters">

<Search
busca={busca} setBusca={setBusca}
/>

         <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
      </div>

<PostList 
        posts={visiblePosts} 
        username={username}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
           {hasMorePosts && (
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <button onClick={handleLoadMore} >
            Carregar mais
          </button>
        </div>
      )}
  </section>

  )
}
