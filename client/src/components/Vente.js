import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import useProgressBar from "./useProgressBar";
import { Helmet } from "react-helmet";
import { venteMetadata } from "../data/metadata";
const Vente = ({ setProgress }) => {
  useProgressBar(setProgress);

  const { finishedSearch } = useContext(SearchResultContext);

  useEffect(() => {
    finishedSearch();
    return () => {
      finishedSearch();
    };
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{venteMetadata?.title}</title>
        <link rel="canonical" href={venteMetadata?.canonicalLink} />
      </Helmet>
      <FlatList type={1} />;
    </>
  );
};

export default Vente;
