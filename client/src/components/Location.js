import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";

const Location = () => {
  const { finishedSearch } = useContext(SearchResultContext);

  useEffect(() => {
    finishedSearch();
    return () => {
      finishedSearch();
    };
  }, []);
  return <FlatList type={2} />;
};

export default Location;
