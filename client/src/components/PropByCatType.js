import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import { Redirect } from "react-router-dom/";

const PropByCatType = ({ match }) => {
  const category = match?.params?.category;
  const proptype = match?.params?.proptype;

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
    // eslint-disable-next-line
  }, []);

  if (validCategories.includes(category) && validPropTypes.includes(proptype)) {
    return <FlatList type={5} />;
  } else {
    // Redirect to a default route or show an error message
    return <Redirect to="/notfound" />;
  }
};

PropByCatType.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
      proptype: PropTypes.string,
    }),
  }),
};

export default PropByCatType;
