import React, { useState, useContext, useEffect } from "react";
import { SearchResultContext } from "../context/SearchContext";
import proeprtyService from "../redux/services/propertyService";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { options } from "../data/propertyType";
import { ammeublementOptions } from "../data/ameublementData";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { features, applicableFeatures } from "../data/features";
import { singleStyle } from "./stylesForSingleSelect";
import { styles } from "./stylesForMultipleSelect";
import {
  categoryOptions,
  defaultCategoryOption,
} from "../data/categoryOptions";
const { searchProperty, getLocalisation } = proeprtyService;

const Search = ({ type }) => {
  const { t } = useTranslation();

  const [localisation, setLocalisation] = useState(["Locations"]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [propertyRef, setPropertyRef] = useState("");
  const [focusedPropertyRef, setFocusedPropertyRef] = useState(false);

  const [maxPrice, setMaxPrice] = useState(null);
  const [focusedMaxPrice, setFocusedMaxPrice] = useState(false);

  const [minSurface, setMinSurface] = useState(null);
  const [focusedMinSurface, setFocusedMinSurface] = useState(false);

  const [minChambre, setMinChambre] = useState(null);
  const [focusedMinChambre, setFocusedMinChambre] = useState(false);

  const [minBathroom, setMinBathroom] = useState(null);
  const [focusedMinBathroom, setFocusedMinBathroom] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);

  const [category, setCategory] = useState(defaultCategoryOption);

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
  };
  const [propertyType, setPropertyType] = useState([]);
  const handlePropertyChange = (selectedOption) => {
    setPropertyType(selectedOption);
  };
  const [location, setLocation] = useState([]);
  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption);
  };

  const [ammeublement, setAmmeublement] = useState([]);
  const handleAmmeublementChange = (selectedOption) => {
    setAmmeublement(selectedOption);
  };

  const propType = propertyType?.map((type) => type?.value);

  const locationFormated = location?.map((loc) => loc.value);
  const categoryFormated = category?.value;
  const ammeublementFormated = ammeublement?.value;

  const searchData = {
    category: category?.[0]?.value || categoryFormated,
    propertyRef,
    propertyType: propType,
    location: locationFormated,
    maxPrice,
    minSurface,
    minChambre,
    minBathroom,
    ammeublement: ammeublementFormated,
    selectedFeatures,
  };

  const { updateSearchResults } = useContext(SearchResultContext);
  const handleCheckboxChange = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures((prevSelected) =>
        prevSelected.filter((item) => item !== feature)
      );
    } else {
      setSelectedFeatures((prevSelected) => [...prevSelected, feature]);
    }
  };
  const localisationOptions = localisation?.map((loc) => ({
    value: loc,
    label: capitalizeFirstLetter(loc),
  }));

  //get localisation of properties
  useEffect(() => {
    const localisation = async () => {
      const data = await getLocalisation();
      setLocalisation(data);
    };

    localisation();
  }, []);

  //cleaning states when component unmounts
  useEffect(() => {
    return () => {
      setMaxPrice(null);
      setMinSurface(null);
      setCategory("");
    };
  }, []);

  //change filter state
  const changeFilter = () => {
    setFilterOpen(!filterOpen);
  };

  //search properties
  const searchProp = async (e) => {
    e.preventDefault();
    console.log(searchData);
    const data = await searchProperty(searchData);
    updateSearchResults(data);
    window.scrollTo(0, window.innerHeight * 0.5);
  };

  // Format option label
  const formatOptionLabel = ({ label }) => {
    if (filterOpen) {
      return t(`ammeubl.${label}`);
    }
    return label;
  };
  const formatOptionTypeLabel = ({ value }) => {
    return t(`type.${value}`);
  };
  const formatOptionCategoryLabel = ({ value }) => {
    return t(`categories.${value}`);
  };

  const isAnyTypeApplicable =
    propType.some((type) => applicableFeatures.includes(type)) ||
    propType?.length === 0;
  return (
    <div className={` ${type === 0 ? "search-no-home" : ""}`}>
      <div
        className={` ${type === 0 ? "container" : ""}`}
        style={
          filterOpen
            ? {
                paddingBottom: "0.2rem",
              }
            : {}
        }
      >
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
          </div>
        </div>
        <form onSubmit={searchProp} className="form-search">
          <div className="search-area">
            <div className="search-area-child">
              <Select
                styles={singleStyle}
                formatOptionLabel={formatOptionCategoryLabel}
                options={categoryOptions}
                value={category}
                onChange={handleCategoryChange}
                placeholder={t("search.typedebien")}
                isSearchable={false}
              />
            </div>
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
                // defaultValue={defaultOption}
                value={propertyType}
                onChange={handlePropertyChange}
                options={options}
                placeholder={t("search.typedebien")}
              />
            </div>
            <div className="search-area-child">
              <Select
                styles={styles}
                value={location}
                onChange={handleLocationChange}
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
                value={maxPrice || ""} // Ensure that the value is not null
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value === "" ? null : parseFloat(e.target.value)
                  )
                }
                onFocus={() => setFocusedMaxPrice(true)}
                onBlur={() => setFocusedMaxPrice(false)}
              />
            </div>
            {filterOpen && (
              <div
                className={`search-area-child ${
                  focusedMinSurface ? "focused" : ""
                }`}
              >
                <input
                  className="inp-search search-area-child"
                  placeholder={t("search.surfaceMin")}
                  type="number"
                  value={minSurface || ""}
                  onChange={(e) =>
                    setMinSurface(
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                  onFocus={() => setFocusedMinSurface(true)}
                  onBlur={() => setFocusedMinSurface(false)}
                />
              </div>
            )}

            {filterOpen && isAnyTypeApplicable && (
              <div
                className={`search-area-child ${
                  focusedMinChambre ? "focused" : ""
                }`}
              >
                <input
                  className="inp-search search-area-child"
                  placeholder={t("chambreMin")}
                  type="number"
                  value={minChambre || ""}
                  onChange={(e) =>
                    setMinChambre(
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                  onFocus={() => setFocusedMinChambre(true)}
                  onBlur={() => setFocusedMinChambre(false)}
                />
              </div>
            )}
            {filterOpen && isAnyTypeApplicable && (
              <div
                className={`search-area-child ${
                  focusedMinBathroom ? "focused" : ""
                }`}
              >
                <input
                  className="inp-search search-area-child"
                  placeholder={t("salledebainsMin")}
                  type="number"
                  value={minBathroom || ""}
                  onChange={(e) =>
                    setMinBathroom(
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                  onFocus={() => setFocusedMinBathroom(true)}
                  onBlur={() => setFocusedMinBathroom(false)}
                />
              </div>
            )}

            {filterOpen && isAnyTypeApplicable && (
              <div className="search-area-child">
                <Select
                  styles={singleStyle}
                  formatOptionLabel={formatOptionLabel}
                  value={ammeublement}
                  onChange={handleAmmeublementChange}
                  options={ammeublementOptions}
                  placeholder={t("ammeublement")}
                />
              </div>
            )}
            {filterOpen && isAnyTypeApplicable && (
              <ul className="unstyled centered">
                {features?.map((feature, index) => (
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
