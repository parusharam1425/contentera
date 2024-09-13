import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';

const Home = () => {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://www.reddit.com/r/reactjs.json')
      .then((response) => {
        const fetchedPosts = response.data.data.children.map((post) => post.data);
        setFetchData(fetchedPosts);
        setLoading(false)
      })
      .catch((error) => {
        setError('Error fetching data:', error);
      });
      
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <ScaleLoader color="orange" />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="posts-container">
      {fetchData.map((data, index) => (
        <div className="post-card" key={index}>
          <h2 className="post-title">{data.title}</h2>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html : data.selftext_html }}
          />
          <a className="post-url" href={data.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          <p className="post-score">Score: {data.score}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
