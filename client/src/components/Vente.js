import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";

const Vente = () => {
  const { finishedSearch } = useContext(SearchResultContext);

  useEffect(() => {
    finishedSearch();
    return () => {
      finishedSearch();
    };
  }, []);
  return <FlatList type={1} />;
};

export default Vente;
