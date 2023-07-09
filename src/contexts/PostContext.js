import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Failed to fetch posts.');
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, error, fetchPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
