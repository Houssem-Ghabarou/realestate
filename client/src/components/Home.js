import FlatList from "./FlatList";
import React, { useContext, useEffect } from "react";
import { SearchResultContext } from "../context/SearchContext";

const Home = () => {
  const { isSearching, finishedSearch } = useContext(SearchResultContext);
  useEffect(() => {
    finishedSearch();
    return () => {
      finishedSearch();
    };
    // eslint-disable-next-line
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
