import React, { createContext, useState, useMemo } from "react";

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

  const contextValue = useMemo(() => {
    return {
      searchResults,
      updateSearchResults,
      isSearching,
      finishedSearch,
    };
  }, [searchResults, updateSearchResults, isSearching, finishedSearch]);

  return (
    <SearchResultContext.Provider value={contextValue}>
      {children}
    </SearchResultContext.Provider>
  );
};
