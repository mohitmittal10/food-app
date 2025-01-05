import React from "react";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Enter your location" />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
