import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="border rounded px-3 py-2 w-full"
  />
);

export default SearchBar;
