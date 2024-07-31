import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import hbg from '../../src/images/homebg2.svg'

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
    <div className="bg-black bg-opacity-50 bg-cover bg-center min-h-screen flex flex-col justify-center items-center" style={{
            backgroundImage: `url(${hbg})`}}>
      <div className="relative font-body3 text-white text-3xl h-auto">
      <h2 className='flex justify-center p-3 bg-green-700 rounded-2xl mt-4 mr-3 w-auto h-auto'>{list.title}</h2>
      <p className="flex justify-center text-xl w-auto h-auto mt-3">{list.description}</p>
      </div>
      <div className="content-start py-2 h-auto w-auto mx-auto" style={{ position: 'center', top: '0px', left: '0px' }}>
  <div className="flex flex-wrap justify-between w-full ">
    {/* Display games */}
    {gamesDetails.map((game) => (
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
  </div>
</div>
    </div>
    </>
  );
};

export default Listinfo;