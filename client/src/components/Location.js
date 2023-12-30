import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import useProgressBar from "./useProgressBar";
import { locationMetadata } from "../data/metadata";
import { useTranslation } from "react-i18next";
import HelmetSeo from "./HelmetSeo";
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
      <HelmetSeo
        title={t(locationMetadata?.value)}
        url={locationMetadata?.canonicalLink}
        description={t(locationMetadata?.description)}
        image={locationMetadata?.image}
      />

      <FlatList type={2} />
    </>
  );
};

export default Location;
