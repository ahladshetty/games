import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const Listinfo = () => {
  
  let navigate = useNavigate();
  const { id } = useParams();

  const [list, setList] = useState(null);
  const [gamesDetails, setGamesDetails] = useState([]);

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5005/lists/listinfo/${id}`);
        const data = await response.json();
        setList(data);
        
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

    fetchListDetails();
  }, [id]);

  // If list details or games details are still being fetched, display a loading message
  if (!list || gamesDetails.length !== list.games.length) {
    return <p>Loading...</p>;
  }
  
  const handleClick = (game) => {
    navigate(`/cardinfo/${game._id}`)
  }

  return (
    <>
    <Navbar/>
    <div className="container">
      <h2>List Details</h2>
      <h3>{list.title}</h3>
      <p>{list.description}</p>

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
    </>
  );
};

export default Listinfo;