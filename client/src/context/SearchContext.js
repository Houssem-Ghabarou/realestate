import React, { createContext, useState } from "react";

export const SearchResultContext = createContext([]);

export const SearchResultProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const updateSearchResults = (newResults) => {
    setIsSearching(true);
    setSearchResults(newResults);
  };
  const finishedSearch = () => {
    setIsSearching(false);
  };

  return (
    <SearchResultContext.Provider
      value={{
        searchResults,
        updateSearchResults,
        isSearching,
        finishedSearch,
      }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};
