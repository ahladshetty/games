import React, { useState, useEffect } from 'react';
import Card from './Card';
import Search from './Search';

const Home = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:5005/games');
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      const data = await response.json();
      setGames(data);
      setFilteredGames(data); // Initialize filteredGames with all games
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = games.filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  return (
    <div className="container my-4">
      <h2>Games Catalogue</h2>
      <div className="row">
        <div className="col-3 my-2">
          <Search onSearch={handleSearch} />
        </div>
        <div className="col-9 my-2">
          <Card games={filteredGames} />
        </div>
      </div>
    </div>
  );
};

export default Home;
