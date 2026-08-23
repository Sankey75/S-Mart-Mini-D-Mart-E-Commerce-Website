import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <input 
        type="text" 
        placeholder="Search for fresh groceries..." 
        className="search-input"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
