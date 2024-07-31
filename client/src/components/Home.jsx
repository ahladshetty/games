import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import Search from './Search';
import Navbar from './Navbar';
import Filter from './Filter'; // Import the Filter component
import hbg from '../../src/images/homebg2.svg'
import a1 from '../../src/images/star.svg'
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
      const response = await fetch('http://localhost:5005/games/show');
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
      <Navbar />
      <div className="bg-black bg-opacity-50 bg-cover bg-center min-h-screen flex flex-col justify-center items-center" style={{
            backgroundImage: `url(${hbg})`}}>
      <div className="absolute flex justify-center space-x-36 bottom-0">
       <img src={a1} class="h-10 w-auto movele delay4"/>
       <img src={a1} class=" h-10 w-auto movele delay1"/>
       <img src={a1} class=" h-10 w-auto movele delay4"/>
       <img src={a1} class="h-10 w-auto movele delay2"/>
       <img src={a1} class="h-10 w-auto movele delay3"/>
       <img src={a1} class="h-10 w-auto movele delay5"/>
       <img src={a1} class="h-10 w-auto movele delay2"/>
       <img src={a1} class="h-10 w-auto movele delay1"/>
      </div>
        <div className="pt-8">
          <Search onSearch={handleSearch} />
        </div>
        <div className="flex flex-row justify-start w-full drop-shadow-[0px_4px_6px_rgba(0,0,0,0.5)]">
          <div className="mt-2 mr-2 py-12 pl-7">
            <Filter filterOptions={filterOptions} onFilterChange={handleFilterChange} />
          </div>
          <div className="my-2 flex-grow">
            <Card games={filteredGames} />
          </div>
        </div>
      </div>
    </>
  );
  
  
};

export default Home;
