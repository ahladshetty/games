import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import Search from './Search';
import Navbar from './Navbar';
import Filter from './Filter'; // Import the Filter component
// import "./css/home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    platforms: [],
    rating: [],
    genres: []
  });
  const [filters, setFilters] = useState({
    platforms: [],
    rating: [],
    genres: []
  });

  const fetchGames = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5005/games');
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      const data = await response.json();
      setGames(data);
      setFilteredGames(data); // Initialize filteredGames with all games
      updateFilterOptions(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }, []);

  const updateFilterOptions = (data) => {
    const platforms = [...new Set(data.flatMap(game => game.platforms))];
    const rating = [...new Set(data.map(game => game.rating))];
    const genres = [...new Set(data.flatMap(game => game.genres))];
    setFilterOptions({
      platforms,
      rating,
      genres
    });
  };

  const handleSearch = (query) => {
    const filtered = games.filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...filters };

    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(option => option !== value);
    } else {
      newFilters[filterType] = [...newFilters[filterType], value];
    }

    setFilters(newFilters);
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = [...games];

    Object.keys(filters).forEach(filterType => {
      if (filters[filterType].length > 0) {
        filtered = filtered.filter(game => filters[filterType].every(option => game[filterType].includes(option)));
      }
    });

    setFilteredGames(filtered);
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames]); 

  return (
    <>
    <div className="overlay-image2"></div>
      <Navbar />
      <div className="container">
        <h2>GAMES CATALOGUE</h2>
        <div className="row">
          <div className="col-3 my-2">
            <Search onSearch={handleSearch} />
            <Filter filterOptions={filterOptions} onFilterChange={handleFilterChange} /> {/* Include the Filter component */}
            <div className="overlay-image"></div>
          </div>
          <div className="col-9 my-2">
            <Card games={filteredGames} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
