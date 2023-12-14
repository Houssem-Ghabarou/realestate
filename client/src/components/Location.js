import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import useProgressBar from "./useProgressBar";
import { Helmet } from "react-helmet";
import { locationMetadata } from "../data/metadata";

const Location = ({ setProgress }) => {
  useProgressBar(setProgress);
  const { finishedSearch } = useContext(SearchResultContext);

  useEffect(() => {
    finishedSearch();
    return () => {
      finishedSearch();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{locationMetadata?.title}</title>
        <link rel="canonical" href={locationMetadata?.canonicalLink} />
      </Helmet>
      <FlatList type={2} />
    </>
  );
};

export default Location;
