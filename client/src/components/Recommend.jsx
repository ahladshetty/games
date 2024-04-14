import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Recommend = () => {

  let navigate = useNavigate();
  
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:5005/wishlist/recommendations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('Error fetching recommendations:', error.message);
      }
    };

    fetchRecommendations();
  }, []);

  const handleClick = (game) => {
    navigate(`/cardinfo/${game._id}`)
  }

  return (
    <>
    <div className="container">
      <h2>Recommendations from Wishlist</h2>

      <div className="row">
      {recommendations.map(game => (
        <div key={game._id} className="col-md-3 mb-3">
          <div onClick={() => handleClick(game)} className="card">
            <img src={game.background_image} className="card-img-top" alt={game.name} />
            <div className="card-body">
            <h5 className="card-title">{game.name}</h5>
            <p className="card-text">Release Year: {new Date(game.released).getFullYear()}</p>
            {/* <p>Rating: {game.rating}</p>
            <p>Metacritic Score: {game.metacritic}</p> */}
            <p className="card-text">Genres: {game.genres.join(', ')}</p>
          </div>
        </div>
        </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Recommend;
