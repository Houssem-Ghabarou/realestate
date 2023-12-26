import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import useProgressBar from "./useProgressBar";
import { Helmet } from "react-helmet-async";
import { locationMetadata } from "../data/metadata";
import { useTranslation } from "react-i18next";
const Location = ({ setProgress }) => {
  const { t } = useTranslation();
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
        <title>{t(locationMetadata?.value)}</title>
        <meta
          property='og:description'
          content={`${locationMetadata?.description}`}
        />
        <meta property='og:image' content={`${locationMetadata?.image}`} />

        <link rel='canonical' href={locationMetadata?.canonicalLink} />
      </Helmet>
      <FlatList type={2} />
    </>
  );
};

export default Location;
