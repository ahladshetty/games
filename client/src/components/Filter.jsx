import React, { useState } from 'react';

const Filter = ({ filterOptions, onFilterChange }) => {
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showRatings, setShowRatings] = useState(false);

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const togglePlatforms = () => {
    setShowPlatforms(!showPlatforms);
  };

  const toggleGenres = () => {
    setShowGenres(!showGenres);
  };

  const toggleRatings = () => {
    setShowRatings(!showRatings);
  };

  return (
    <div className='container rounded-2xl bg-white w-auto h-auto p-4 flex justify-center place-items-center'>
      <div className='flex flex-col justify-start font-body3 text-purple-950'>
        <div className='pb-2 text-2xl'>
          <h4>FILTER</h4>
        </div>
        <div className='relative'>
  <div className='text-xl pb-1'>
    <button onClick={togglePlatforms} className=' hover:text-[#72266E]'>Platforms▼</button>
    {showPlatforms && (
      <div className='absolute top-8 left-0 z-10 w-auto'>
        <div className='flex flex-col justify-start items-start border-4 p-2 hover:bg-gray-200 bg-white text-xl w-64 drop-shadow-[0px_4px_3px_rgba(0,0,0,0.2)]'>
          {filterOptions.platforms.map((platform, index) => (
            <button key={index} onClick={() => handleFilterChange("platforms", platform)} className=' hover:text-[#72266E] transform hover:scale-95 transition duration-150 ease-in-out'>
              {platform}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

        <div className='relative'>
          <div className='text-xl pb-1'>
            <button onClick={toggleGenres} className=' hover:text-[#72266E]'>Genres▼</button>
            {showGenres && (
              <div className='absolute top-8 left-0 z-10'>
                <div className='flex flex-col justify-start items-start border-4 p-2 hover:bg-gray-200 bg-white drop-shadow-[0px_4px_3px_rgba(0,0,0,0.2)] text-xl'>
                  {filterOptions.genres.map((genre, index) => (
                    <button key={genre} onClick={() => handleFilterChange("genres", genre)} className=' hover:text-[#72266E] transform hover:scale-95 transition duration-150 ease-in-out'>
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className='relative'>
          <div className='text-xl pb-1'>
            <button onClick={toggleRatings} className=' hover:text-[#72266E]'>Ratings▼</button>
            {showRatings && (
              <div className='absolute top-8 left-0 z-10'>
                <div className='flex flex-col justify-start items-start border-4 p-2 hover:bg-gray-200 bg-white text-xl drop-shadow-[0px_4px_3px_rgba(0,0,0,0.2)]'>
                  {filterOptions.rating.map((rating, index) => (
                    <button key={index} onClick={() => handleFilterChange("rating", rating)} className=' hover:text-[#72266E] transform hover:scale-95 transition duration-150 ease-in-out'>
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );  
  
};

export default Filter;
