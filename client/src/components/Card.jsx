import React, { useState, useEffect } from 'react';
import Pages from './Pages'; // Import the Pages component
import { useNavigate } from 'react-router-dom';
const Card = ({ games }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(30); // Number of games to display per page

  useEffect(() => {
    setCurrentPage(1); // Reset to first page whenever games change
  }, [games]);

  // Get current games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const paginate = (pageNumber) => { 
    setCurrentPage(pageNumber); 
    window.scrollTo(0, 0);
  }
  let navigate = useNavigate();
  const handleClick = (game) => {
    navigate(`/cardinfo/${game._id}`)
  }

  return (
    <div className="container">
      {/* Display games */}
      <div className="row">
        {currentGames.map((game) => (
          <div key={game.id} className="col-md-4 mb-3">
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

      {/* Render pagination component */}
      <Pages currentPage={currentPage} totalPages={Math.ceil(games.length / gamesPerPage)} onPageChange={paginate} />
    </div>
  );
};

export default Card;
