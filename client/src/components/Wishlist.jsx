import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Recommend from "./Recommend";
import hbg from '../../src/images/homebg2.svg'


const Wishlist = () => {
  
  let navigate = useNavigate();

  const [wishlist, setWishlist] = useState(null);
  const [gamesDetails, setGamesDetails] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5005/wishlist/show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      const data = await response.json();
      setWishlist(data);

const gameDetailsPromises = data.games.map(async gameId => {
  const gameResponse = await fetch(`http://localhost:5005/games/gameinfo/${gameId}`);
  const gameData = await gameResponse.json();
  return gameData;
});

const gameDetails = await Promise.all(gameDetailsPromises); // Wait for all game details requests to resolve
setGamesDetails(gameDetails);

} catch (error) {
console.error("Error fetching list details:", error);
}
};

    fetchWishlist();
  }, []);

  if (!wishlist || gamesDetails.length !== wishlist.games.length) {
    return <p>Loading...</p>;
  }
  
  const handleClick = (game) => {
    navigate(`/cardinfo/${game._id}`)
  }

  return (
    <>
    <Navbar/>
    <div className="bg-black bg-opacity-50 bg-cover bg-center min-h-screen mx-auto"  style={{
      backgroundImage: `url(${hbg})`}}>
        <div className="flex justify-center">
      <h2 className="font-body text-white mt-7 text-5xl mb-9 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)]">Wishlist</h2>
      </div>
      {/* <h3>{wishlist.title}</h3>
      <p>{wishlist.description}</p> */}
      <div className="flex flex-wrap justify-start font-body3">
              {/* Display games */}
              {gamesDetails.map((game) => (
                <div key={game.id} className="space-x-9 w-72 md:w-72 lg:w-72 xl:w-72 p-4 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.5)] hover:scale-110 transition duration-150 ease-in-out">
                <div onClick={() => handleClick(game)} className="card h-full border-5 border-white rounded-2xl">
                  <img src={game.background_image} className="card-img-top h-48 w-auto border-3 border-black border-opacity-100 object-cover rounded-2xl" alt={game.name} />
                  <div className="card-body">
                    <h5 className="card-title text-xl">{game.name}</h5>
                    <p className="card-text">Release Year: {new Date(game.released).getFullYear()}</p>
                    <p className="card-text">Genres: {game.genres.join(', ')}</p>
                  </div>
                </div>
              </div>              
              ))}
            </div>
          <Recommend/>
          </div>
          </>
        );
      };

      export default Wishlist;
