import React from 'react';
import PostList from './components/PostList';
import PostContextProvider from './contexts/PostContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Posts App</h1>
      <PostContextProvider>
        <PostList />
      </PostContextProvider>
    </div>
  );
}

export default App;
