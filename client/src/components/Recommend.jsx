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
      <div className='flex justify-center'>
      <h2 className='font-body3 text-white mt-7 text-4xl mb-9 bg-green-700 p-3 rounded-2xl'>Recommendations from Wishlist</h2>
      </div>
      <div className='font-body3'>
      <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
      {recommendations.map(game => (
        <div key={game._id} className="inline-block h-auto w-auto md:w-64 lg:w-64 xl:w-64 p-4 rounded-2xl drop-shadow-[0px_4px_6px_rgba(0,0,0,0.5)] hover:scale-95 transition duration-150 ease-in-out ">
          <div onClick={() => handleClick(game)} className="card h-full border-5 border-white rounded-2xl">
            <img src={game.background_image} className="card-img-top h-40 w-full border-3 border-black border-opacity-100 object-cover rounded-2xl" alt={game.name} />
            <div className="card-body ">
            <h5 className="card-title text-xl">{game.name}</h5>
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
