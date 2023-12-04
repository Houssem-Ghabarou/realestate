import FlatList from "./FlatList";
import React, { useContext, useEffect } from "react";

// import BestFlatList from "./BestFlatList";
import { SearchResultContext } from "../context/SearchContext";
const Home = () => {
  const { isSearching, finishedSearch } = useContext(SearchResultContext);
  useEffect(() => {
    finishedSearch();
    return () => {
      finishedSearch();
    };
  }, []);

  return (
    <React.Fragment>
      {isSearching ? (
        <FlatList type={6} />
      ) : (
        <>
          <FlatList type={0} />
          <FlatList type={3} />
          <FlatList type={4} />
        </>
      )}
    </React.Fragment>
  );
};

export default Home;
