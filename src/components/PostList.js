import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import '../App.css'

const PostList = () => {
  const { posts, loading, error, fetchPosts } = useContext(PostContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [searchTerm, posts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='center'>
      <input
        type="text"
        placeholder="Search by title or body"
        value={searchTerm}
        onChange={handleSearch}
      />
      {currentPosts.map((post) => (
        <div key={post.id} className="post-box">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
