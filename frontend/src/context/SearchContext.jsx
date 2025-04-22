import { createContext, useEffect, useState } from "react";
import { getPosts } from "../services/api";



export const SearchContext = createContext()
export default function SearchProvider({children}) {

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
    filtered = filtered.map(post => ({
        ...post,
        likes: post.likes ?? 0 
      }));
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_datetime);
      const dateB = new Date(b.created_datetime);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const paginated = filtered.slice(0, page * LIMIT);
    setVisiblePosts(paginated);
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
        <SearchContext.Provider value={{busca,setBusca,setSortOrder,
        hasMorePosts,handleLoadMore,
        
        visiblePosts, sortOrder, setPage, fetchAllPosts
        
        
        }}>
        {children}
        </SearchContext.Provider>
  
  
     )

}
