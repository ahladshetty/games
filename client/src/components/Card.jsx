import React, { useState, useEffect } from 'react';
import Pages from './Pages'; // Import the Pages component
import { useNavigate} from 'react-router-dom';

const Card = ({ games }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(32); // Number of games to display per page

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
    <div className="container mx-auto py-4">
      {/* Display games */}
      <div className="flex flex-wrap justify-between">
        {currentGames.map((game, index) => (
          <div key={game.id} className="w-72 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
            <div onClick={() => handleClick(game)} className="card h-full border-5 border-white rounded-2xl drop-shadow-[0px_4px_5px_rgba(0,0,0,0.4)] hover:bg-gray-300 transform hover:scale-110 transition duration-150 ease-in-out">
              <img src={game.background_image} className="card-img-top h-full w-auto border-3 border-black border-opacity-100 rounded-2xl " alt={game.name} />
              <div className="card-body font-body3">
                <h5 className="card-title text-xl pt-0 text-[#72266E] drop-shadow-[0px_2px_0px_rgba(0,0,0,0.2)]">{game.name}</h5>
                <p className="card-text">Release Year: {new Date(game.released).getFullYear()}</p>
                <p className="card-text">Genres: {game.genres.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Render additional empty card placeholders to fill the page */}
        {Array.from({ length: Math.max(0, Math.ceil(currentGames.length / 4) * 4 - currentGames.length) }).map((_, index) => (
          <div key={`empty-${index}`} className="w-72 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4"></div>
        ))}
      </div>
  
      {/* Render pagination component */}
      <div className='font-body3'>
      <Pages currentPage={currentPage} totalPages={Math.ceil(games.length / gamesPerPage)} onPageChange={paginate} />
      </div>
    </div>
  );
  
  
};

export default Card;
