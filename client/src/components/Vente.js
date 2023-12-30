import React, { useEffect, useContext } from "react";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import useProgressBar from "./useProgressBar";
import { venteMetadata } from "../data/metadata";
import { useTranslation } from "react-i18next";
import HelmetSeo from "./HelmetSeo";
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
      <HelmetSeo
        title={t(venteMetadata?.value)}
        url={venteMetadata?.canonicalLink}
        description={t(venteMetadata?.description)}
        image={venteMetadata?.image}
      />
      <FlatList type={1} />;
    </>
  );
};

export default Vente;
