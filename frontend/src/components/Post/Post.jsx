import React, { useEffect,  useState } from 'react'
import Title from '../Title/Tlite';
import "./Post.css"
import CadastroPost from './CadastroPost';
import PostList from './PostList';
import { createPost, deletePost, getPosts, updatePost } from '../../services/api';
import Search from '../Search/Search';
export default function Post({username}) {

  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [busca,setBusca] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const LIMIT = 2;

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    applyFiltersAndPagination();
  }, [allPosts, page, busca, sortOrder]);

  const fetchAllPosts = async () => {
    const response = await getPosts();
    setAllPosts(response.data.results);
  };

  const applyFiltersAndPagination = () => {
    let filtered = [...allPosts];

    if (busca) {
      const keyword = busca.toLowerCase();
      filtered = filtered.filter(post =>
        post.username.toLowerCase().includes(keyword) ||
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.created_datetime);
      const dateB = new Date(b.created_datetime);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const paginated = filtered.slice(0, page * LIMIT);
    setVisiblePosts(paginated);
  };

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

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const filteredLength = allPosts.filter(post =>
    post.username.toLowerCase().includes(busca.toLowerCase()) ||
    post.title.toLowerCase().includes(busca.toLowerCase()) ||
    post.content.toLowerCase().includes(busca.toLowerCase())
  ).length;

  const hasMorePosts = visiblePosts.length < filteredLength;


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
