import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import { Redirect } from "react-router-dom/";
const PropByCatType = ({ match }) => {
  const { category, proptype } = match?.params;

  const validCategories = ["vente", "location"];
  const validPropTypes = [
    "maison",
    "villa",
    "appartement",
    "terrain",
    "local",
    "bureau",
    "immeuble",
    "commercial",
  ];
  const { finishedSearch } = useContext(SearchResultContext);

  useEffect(() => {
    finishedSearch();
    return () => {
      finishedSearch();
    };
  }, []);
  if (validCategories.includes(category) && validPropTypes.includes(proptype)) {
    return <FlatList type={5} />;
  } else {
    // Redirect to a default route or show an error message
    return <Redirect to="/notfound" />;
  }
};

export default PropByCatType;
