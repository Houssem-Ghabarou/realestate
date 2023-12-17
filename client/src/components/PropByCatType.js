import React, { useEffect, useLayoutEffect, useContext } from "react";
import PropTypes from "prop-types";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import { Redirect } from "react-router-dom/";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
const PropByCatType = ({ match, setProgress, progress }) => {
  const { t } = useTranslation();
  const category = match?.params?.category;
  const proptype = match?.params?.proptype;

  useLayoutEffect(() => {
    setProgress(40);
    // setProgress(60);
    setTimeout(() => {
      setProgress(100);
    }, 400);
  }, [category, proptype]);

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
  }, [match]);

  const translatedCate = t(`categories.${category}`);
  const translatedType = t(`type.${proptype}`);
  const PromoVillaForRotues = t("promovillaForRoutes");
  if (validCategories.includes(category) && validPropTypes.includes(proptype)) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${translatedCate} - ${translatedType} ${PromoVillaForRotues}`}</title>
          <link
            rel="canonical"
            href={`${process.env.REACT_APP_URL}${category}/${proptype}`}
          />
        </Helmet>
        <FlatList type={5} />
      </>
    );
  } else {
    return <Redirect to="/404" />;
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
