import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4 font-body3 text-opacity-20 drop-shadow-[2px_5px_2px_rgba(0,0,0,0.5)] ">
      <input
        type="text"
        placeholder="Search games..."
        value={query}
        onChange={handleChange}
        className="form-control w-96 rounded-2nxl"
      />
    </div>
  );
};

export default Search;
