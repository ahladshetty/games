// CreateList.jsx

import React, { useState, useEffect } from 'react';
import "./css/createlist.css";
import Navbar from './Navbar';

const Createlist = () => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gameIds, setGameIds] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGameNames, setSelectedGameNames] = useState([]);

  // Function to fetch all games
  const fetchAllGames = async () => {
    try {
      const response = await fetch('http://localhost:5005/games/show');
      if (response.ok) {
        const data = await response.json();
        setAllGames(data);
      } else {
        throw new Error('Failed to fetch games');
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title.trim() || !description.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    // Construct the list object
    const newList = {
      title,
      description,
      gameIds,
    };

    try {
      // Make a POST request to create the list
      const response = await fetch('http://localhost:5005/lists/createlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newList),
      });

      if (response.ok) {
        // Reset form fields after successful creation
        setTitle('');
        setDescription('');
        setGameIds([]);
        setSelectedGameNames([]);
        alert('List created successfully!');
      } else {
        // Handle errors
        const errorData = await response.json();
        alert('Error: ' + errorData.error);
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
      alert('An error occurred while creating the list.');
    }
  };

  // Function to handle game selection
  const handleGameSelect = (gameId, gameName) => {
    if (gameIds.includes(gameId)) {
      // Deselect the game if it's already selected
      setGameIds(gameIds.filter((_id) => _id !== gameId));
      setSelectedGameNames(selectedGameNames.filter((name) => name !== gameName));
    } else {
      // Select the game if it's not already selected
      setGameIds([...gameIds, gameId]);
      setSelectedGameNames([...selectedGameNames, gameName]);
    }
  };

  // Function to handle game deselection from the selected game list
  const handleGameDeselect = (gameId, gameName) => {
    setGameIds(gameIds.filter((_id) => _id !== gameId));
    setSelectedGameNames(selectedGameNames.filter((name) => name !== gameName));
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter games based on search term
  const filteredGames = allGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar/>
    <div className="create-list-container">
      <h2>Create New List</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="label">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gameSearch" className="label">Search for Games:</label>
          <input
            type="text"
            id="gameSearch"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <ul className="game-list">
            {selectedGameNames.map((name) => (
              <li key={name} className="selected-game" onClick={() => handleGameDeselect(gameIds[selectedGameNames.indexOf(name)], name)}>
                {name}
              </li>
            ))}
          </ul>
          <ul className="game-list">
            {filteredGames.map((game) => (
              <li
                key={game._id}
                onClick={() => handleGameSelect(game._id, game.name)}
                className={`game-item ${gameIds.includes(game._id) ? 'selected' : ''}`}
              >
                {game.name} {gameIds.includes(game._id) ? '(Selected)' : ''}
              </li>
            ))}
          </ul>
        </div>
        </div>
        <button type="submit" className="submit-button">Create List</button>
      </form>
    </div>
    </>
  );
};

export default Createlist;
