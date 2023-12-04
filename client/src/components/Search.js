import React, { useState, useContext, useEffect } from "react";
import acheter from "../assets/acheter.svg";
import louer from "../assets/louer.svg";
import { SearchResultContext } from "../context/SearchContext";
import proeprtyService from "../redux/services/propertyService";
import house from "../assets/backgroundvilla.jpg";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { options, defaultOption } from "../data/propertyType";
import { ammeublementOptions } from "../data/ameublementData";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { features } from "../data/features";
const { searchProperty, getLocalisation } = proeprtyService;

const Search = ({ type }) => {
  const [localisation, setLocalisation] = useState(["Locations"]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleCheckboxChange = (feature) => {
    // Check if the feature is already selected
    if (selectedFeatures.includes(feature)) {
      // If selected, remove it from the list
      setSelectedFeatures((prevSelected) =>
        prevSelected.filter((item) => item !== feature)
      );
    } else {
      // If not selected, add it to the list
      setSelectedFeatures((prevSelected) => [...prevSelected, feature]);
    }
  };
  const localisationOptions = localisation.map((loc) => ({
    value: loc,
    label: capitalizeFirstLetter(loc),
  }));

  const [propertyRef, setPropertyRef] = useState("");
  const [focusedPropertyRef, setFocusedPropertyRef] = useState(false);

  const [maxPrice, setMaxPrice] = useState(null);
  const [focusedMaxPrice, setFocusedMaxPrice] = useState(false);

  const [minSurface, setMinSurface] = useState(null);
  const [focusedMinSurface, setFocusedMinSurface] = useState(false);

  const [minChambre, setMinChambre] = useState(null);
  const [focusedMinChambre, setFocusedMinChambre] = useState(false);

  const [minBathroom, setMinBathromm] = useState(null);
  const [focusedMinBathroom, setFocusedMinBathromm] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState("");

  const { updateSearchResults } = useContext(SearchResultContext);
  const { t } = useTranslation();

  useEffect(() => {
    const localisation = async () => {
      const data = await getLocalisation();
      setLocalisation(data);
    };

    localisation();
  }, []);

  useEffect(() => {
    return () => {
      setMaxPrice(null);
      setMinSurface(null);
      setCategory("");
    };
  }, []);

  const setCategoryType = (type) => {
    setCategory(type);
  };

  const changeFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const searchProp = async (e) => {
    const propertyType = "villa";
    // setFilterOpen(false);
    e.preventDefault();
    const data = await searchProperty(
      category,
      propertyRef,
      propertyType, // Set propertyType to "vente"
      maxPrice,
      minSurface
    );
    updateSearchResults(data);
    window.scrollTo(0, window.innerHeight * 0.5);
  };

  const styles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        display: "block",
        padding: "10px 15px",
        fontSize: "1.2rem",
        textDecoration: "none",
        color: "#607d7d",
        transition:
          "color 0.3s ease 0s, padding-left 0.3s ease 0s, background-color 0.3s ease 0s",
        borderBottom: "1px solid rgba(96, 125, 125, 0.8)",
        // backgroundColor: isSelected ? "#DAA520" : "transparent", // Set red background for selected option
      };
    },

    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#DAA520",
        color: "#607d7d",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#607d7d",
        },
      };
    },
  };
  const singleStyle = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        display: "block",
        padding: "10px 15px",
        fontSize: "1.2rem",
        textDecoration: "none",
        color: "#607d7d",
        transition:
          "color 0.3s ease 0s, padding-left 0.3s ease 0s, background-color 0.3s ease 0s",
        borderBottom: "1px solid rgba(96, 125, 125, 0.8)",
        backgroundColor: isSelected ? "#DAA520" : "transparent", // Set red background for selected option
      };
    },
  };
  const formatOptionLabel = ({ label }) => {
    if (filterOpen) {
      return t(`ammeubl.${label}`);
    }
    return label;
  };
  const formatOptionTypeLabel = ({ value }) => {
    return t(`type.${value}`);
  };

  return (
    <div
      style={
        type === 0
          ? {
              width: "100%",
              background: "rgb(29 34 43 / 40%)",
              backgroundImage: `url(${house})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              paddingBottom: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }
          : {}
      }
    >
      <div className="container">
        <div className="col-lg-6 mx-auto">
          <div className="banner-area text-center pt-4 pb-4">
            {type !== 0 && (
              <h2 className="mt-2 mb-4 banner-title">
                <strong style={{ marginBottom: "2rem" }}>
                  {t("search.name")}
                </strong>
              </h2>
            )}
            {type !== 0 && (
              <div>
                <h5>{t("search.quote")}</h5>
              </div>
            )}
            <div className="flex-container">
              <div
                className="flex-option"
                onClick={() => setCategoryType("vente")}
              >
                <div
                  className={`option-img-container${
                    category === "vente" ? " checked" : ""
                  }`}
                >
                  <img className="option-img" src={acheter} alt="acheter" />
                </div>
                <h5 className="option-text">{t("search.acheter")}</h5>
              </div>
              <div
                className="flex-option"
                onClick={() => setCategoryType("location")}
              >
                <div
                  className={`option-img-container${
                    category === "location" ? " checked" : ""
                  }`}
                >
                  <img className="option-img" src={louer} alt="louer" />
                </div>
                <h5 className="option-text">{t("search.louer")}</h5>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={searchProp} className="form-search">
          <div className="search-area">
            <div
              className={`search-area-child ${
                focusedPropertyRef ? "focused" : ""
              }`}
            >
              <input
                type="text"
                className="inp-search search-area-child"
                placeholder={t("search.reference")}
                value={propertyRef}
                onChange={(e) => setPropertyRef(e.target.value)}
                onFocus={() => setFocusedPropertyRef(true)}
                onBlur={() => setFocusedPropertyRef(false)}
              />
            </div>
            <div className="search-area-child">
              <Select
                styles={styles}
                isMulti
                formatOptionLabel={formatOptionTypeLabel}
                defaultValue={defaultOption}
                options={options}
                placeholder={t("search.typedebien")}
              />
            </div>
            <div className="search-area-child">
              <Select
                styles={styles}
                isMulti
                placeholder={t("localisation")}
                options={localisationOptions}
              />
            </div>
            <div
              className={`search-area-child ${
                focusedMaxPrice ? "focused" : ""
              }`}
            >
              <input
                className="inp-search search-area-child"
                placeholder={t("search.prixMax")}
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value === "" ? null : parseFloat(e.target.value)
                  )
                }
                onFocus={() => setFocusedMaxPrice(true)}
                onBlur={() => setFocusedMaxPrice(false)}
              />
            </div>
            <div
              className={`search-area-child ${
                focusedMinSurface ? "focused" : ""
              }`}
            >
              <input
                className="inp-search search-area-child"
                placeholder={t("search.surfaceMin")}
                type="number"
                value={minSurface}
                onChange={(e) => setMinSurface(e.target.value)}
                onFocus={() => setFocusedMinSurface(true)}
                onBlur={() => setFocusedMinSurface(false)}
              />
            </div>
            {filterOpen && (
              <div
                className={`search-area-child ${
                  focusedMinChambre ? "focused" : ""
                }`}
              >
                <input
                  className="inp-search search-area-child"
                  placeholder={t("chambreMin")}
                  type="number"
                  value={minChambre}
                  onChange={(e) => setMinChambre(e.target.value)}
                  onFocus={() => setFocusedMinChambre(true)}
                  onBlur={() => setFocusedMinChambre(false)}
                />
              </div>
            )}
            {filterOpen && (
              <div
                className={`search-area-child ${
                  focusedMinBathroom ? "focused" : ""
                }`}
              >
                <input
                  className="inp-search search-area-child"
                  placeholder={t("salledebainsMin")}
                  type="number"
                  value={minBathroom}
                  onChange={(e) => setMinBathromm(e.target.value)}
                  onFocus={() => setFocusedMinBathromm(true)}
                  onBlur={() => setFocusedMinBathromm(false)}
                />
              </div>
            )}

            {/* trouver button */}
            {filterOpen && (
              <div className="search-area-child">
                <Select
                  styles={singleStyle}
                  formatOptionLabel={formatOptionLabel}
                  options={ammeublementOptions}
                  placeholder={t("ammeublement")}
                />
              </div>
            )}
            {filterOpen && (
              <ul className="unstyled centered">
                {features.map((feature, index) => (
                  <li key={index}>
                    <input
                      className="styled-checkbox"
                      id={`styled-checkbox-${index}`}
                      type="checkbox"
                      value={feature}
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleCheckboxChange(feature)}
                    />
                    <label htmlFor={`styled-checkbox-${index}`}>
                      {t(`features.${feature}`)}
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {!filterOpen && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="filter-icon" onClick={changeFilter}>
                  <FaPlus />
                </div>
                <button className="btn-search m-2" type="submit">
                  {t("search.trouver")}
                </button>
              </div>
            )}
            {filterOpen && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="filter-icon" onClick={changeFilter}>
                  <FaMinus />
                </div>
                <button className="btn-search m-2" type="submit">
                  {t("search.trouver")}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
