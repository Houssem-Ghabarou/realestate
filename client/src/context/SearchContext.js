import React, { createContext, useState, useMemo } from "react";

export const SearchResultContext = createContext([]);

export const SearchResultProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const contextValue = useMemo(() => {
    const updateSearchResults = (newResults) => {
      setIsSearching(true);
      setSearchResults(newResults);
    };
    const finishedSearch = () => {
      setIsSearching(false);
    };
    return {
      searchResults,
      updateSearchResults,
      isSearching,
      finishedSearch,
    };
  }, [searchResults, isSearching]);

  return (
    <SearchResultContext.Provider value={contextValue}>
      {children}
    </SearchResultContext.Provider>
  );
};
