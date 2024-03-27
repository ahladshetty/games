import React, { useState } from 'react';

const Filter = ({ filterOptions, onFilterChange }) => {
  const [showOptions, setShowOptions] = useState(false); // State to track visibility of filter options

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions); // Toggle the visibility of filter options
  };

  return (
    <div>
      <h4>Filter by:</h4>
      <div>
        <label>Platforms</label>
        <div>
          <button onClick={toggleOptions}>Platforms ▼</button> {/* Button to toggle visibility */}
          {showOptions && ( // Render filter options only if showOptions is true
            <div>
              {filterOptions.platforms.map((platform, index) => (
                <button key={index} onClick={() => handleFilterChange("platforms", platform)}>
                  {platform}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label>Genres</label>
        <div>
          <button onClick={toggleOptions}>Genres ▼</button> {/* Button to toggle visibility */}
          {showOptions && ( // Render filter options only if showOptions is true
            <div>
              {filterOptions.genres.map((genre, index) => (
                <button key={genre} onClick={() => handleFilterChange("genres", genre)}>
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label>Ratings</label>
        <div>
          <button onClick={toggleOptions}>Ratings ▼</button> {/* Button to toggle visibility */}
          {showOptions && ( // Render filter options only if showOptions is true
            <div>
              {filterOptions.rating.map((rating, index) => (
                <button key={index} onClick={() => handleFilterChange("rating", rating)}>
                  {rating}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Filter;
