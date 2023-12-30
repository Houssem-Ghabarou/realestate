import React, { useEffect, useLayoutEffect, useContext } from "react";
import PropTypes from "prop-types";
import FlatList from "./FlatList";
import { SearchResultContext } from "../context/SearchContext";
import { Redirect } from "react-router-dom/";
import { useTranslation } from "react-i18next";
import bg7 from "../assets/ogimage.png";
import HelmetSeo from "./HelmetSeo";
const PropByCatType = ({ match, setProgress }) => {
  const { t } = useTranslation();
  const category = match?.params?.category;
  const proptype = match?.params?.proptype;

  useLayoutEffect(() => {
    setProgress(40);
    // setProgress(60);
    setTimeout(() => {
      setProgress(100);
    }, 400);
    // eslint-disable-next-line
  }, [category, proptype]);

  const validCategories = ["vente", "location"];
  const validPropTypes = [
    "maison",
    "villa",
    "appartement",
    "terrain",
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

  const translatedCate = t(`categories.${category}`);
  const translatedType = t(`type.${proptype}`);
  const PromoVillaForRotues = t("promovillaForRoutes");
  if (validCategories.includes(category) && validPropTypes.includes(proptype)) {
    return (
      <>
        <HelmetSeo
          title={`${translatedCate} - ${translatedType} ${PromoVillaForRotues}`}
          url={`${process.env.REACT_APP_WEBSITE_URL}/${category}/${proptype}`}
          description={`Découvrez nos biens mis en ${translatedCate}, notamment des ${translatedType}, à Hammamet, Nabeul, Tunisie.`}
          image={bg7}
        />

        <FlatList type={5} />
      </>
    );
  } else {
    return <Redirect to='/404' />;
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
