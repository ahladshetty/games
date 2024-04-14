import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Recommend from "./Recommend";


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

// Fetch details for each game in the list
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

  // If list details or games details are still being fetched, display a loading message
  if (!wishlist || gamesDetails.length !== wishlist.games.length) {
    return <p>Loading...</p>;
  }
  
  const handleClick = (game) => {
    navigate(`/cardinfo/${game._id}`)
  }

  return (
    <>
    <Navbar/>
    <div className="container">
      <h2>Wishlist Dwishtails</h2>
      {/* <h3>{wishlist.title}</h3>
      <p>{wishlist.description}</p> */}

      <div className="row">
              {/* Display games */}
              {gamesDetails.map((game) => (
                <div key={game.id} className="col-md-3 mb-3">
                  <div onClick={() => handleClick(game)} className="card">
                    <img src={game.background_image} className="card-img-top" alt={game.name} />
                    <div className="card-body">
                      <h5 className="card-title">{game.name}</h5>
                      <p className="card-text">Release Year: {new Date(game.released).getFullYear()}</p>
                      <p className="card-text">Genres: {game.genres.join(', ')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Recommend/>
          </>
        );
      };

      export default Wishlist;
