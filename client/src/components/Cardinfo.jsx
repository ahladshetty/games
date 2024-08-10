import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review';
import hbg from '../../src/images/homebg2.svg'
import Navbar from './Navbar';
import a1 from '../../src/images/star.svg'
import AddRemove from './AddRemove';

const Cardinfo = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5005/games/gameinfo/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch game details');
        }
        const gameData = await response.json();
        setGameDetails(gameData);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    const fetchUserWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5005/wishlist/show', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user wishlist');
        }
        const wishlistData = await response.json();
        const isInWishlist = wishlistData.games.includes(id);
        setIsInWishlist(isInWishlist);
      } catch (error) {
        console.error("Error fetching user wishlist:", error);
      }
    };

    fetchGameDetails();
    fetchUserWishlist();
  }, [id]);

  return (
    <>
    <Navbar />
    <div className="bg-black bg-opacity-50 bg-cover bg-center min-h-screen flex flex-col justify-center items-center"  style={{
      backgroundImage: `url(${hbg})`}}>
            <div className="absolute flex justify-center space-x-36 bottom-0">
       <img src={a1} alt="" className="h-10 w-auto movele delay4"/>
       <img src={a1} alt="" className=" h-10 w-auto movele delay1"/>
       <img src={a1} alt="" className=" h-10 w-auto movele delay4"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay2"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay3"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay5"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay2"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay1"/>
      </div>
      {gameDetails ? (
        <div className='relative'>
        <div className="game-details flex flex-wrap justify-center items-start">
          <h2 className='flex justify-center p-10 font-body ' style={{ fontSize: '60px' }}>{gameDetails.name}</h2>
          </div>
          <div className='flex justify-center'>
          <div className="game-details flex flex-wrap">
  <div className='relative px-10'>
    <img src={gameDetails.background_image} alt={gameDetails.name} className='h-80 w-full mb-8 mx-auto rounded-2xl drop-shadow-[0px_4px_6px_rgba(0,0,0,0.5)]' />
  </div>
  <div className='font-body3 text-white text-lg bg-white bg-opacity-50 p-3 rounded-2xl w-96'>
    <p className='pb-1 sm:ml-2'>Release Year: {new Date(gameDetails.released).getFullYear()}</p>
    <p className='pb-1 sm:ml-2'>Playtime: {gameDetails.playtime} hours</p>
    <p className='pb-1 sm:ml-2'>Platforms: {gameDetails.platforms.join(', ')}</p>
    <p className='pb-1 sm:ml-2'>Rating: {gameDetails.rating}</p>
    <p className='pb-1 sm:ml-2'>Metacritic Score: {gameDetails.metacritic}</p>
    <p className='pb-1 sm:ml-2'>Genres: {gameDetails.genres.join(', ')}</p>
    <p className='pb-1 sm:ml-2'>Developers: {gameDetails.developers.join(', ')}</p>
  </div>
</div>
</div>
        <div className='flex justify-center '>
          <div className='font-body3 text-white text-4xl mt-20 p-3 bg-green-700 rounded-2xl w-auto h-auto mb-3'>SCREENSHOTS</div>
          </div>
          <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
            {gameDetails.short_screenshots.map((screenshot, index) => (
              <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} className='inline-block h-60 w-auto mx-auto p-2 rounded-2xl drop-shadow-[0px_4px_6px_rgba(0,0,0,0.5)] hover:scale-95 transition duration-150 ease-in-out'/>
            ))}
            </div>
          </div>
      ) : (
        <p>Loading...</p>
      )}
        <AddRemove gameId={id} isInWishlist={isInWishlist} />
      <div className='font-body3 text-white h-auto mt-6'>
        <h4 className='flex justify-center text-3xl mt-4 p-3 bg-green-700 mb-4 rounded-2xl w-auto'>Reviews</h4>
        </div>
    <Review gameId={id} />
    </div>
    </>
  );
};

export default Cardinfo;
