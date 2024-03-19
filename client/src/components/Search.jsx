import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search games..."
        value={query}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  );
};

export default Search;
