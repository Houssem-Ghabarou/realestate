import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import useProgressBar from "./useProgressBar";
import { Helmet } from "react-helmet-async";
import { venteMetadata } from "../data/metadata";
import { useTranslation } from "react-i18next";
const Vente = ({ setProgress }) => {
  const { t } = useTranslation();
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
        <title>{t(venteMetadata?.value)}</title>
        <meta
          property='og:description'
          content={`${venteMetadata?.description}`}
        />
        <meta property='og:image' content={`${venteMetadata?.image}`} />

        <link rel='canonical' href={venteMetadata?.canonicalLink} />
      </Helmet>
      <FlatList type={1} />;
    </>
  );
};

export default Vente;
