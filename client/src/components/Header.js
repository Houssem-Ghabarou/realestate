import React, { useState, useEffect, useContext, lazy } from "react";
import { Link } from "react-router-dom";
import promovilla from "../assets/promovilla.png";
import { useTranslation } from "react-i18next";
import { SearchResultContext } from "../context/SearchContext";
import { CurrencyContext } from "../context/currencyContext";
import ReactFlagsSelect from "react-flags-select";

const MobileHeader = lazy(() => import("./MobileHeader"));
const Header = ({ type }) => {
  const { finishedSearch } = useContext(SearchResultContext);
  const { updateCurrency, currency } = useContext(CurrencyContext);
  const [isMobile, setIsMobile] = useState(false);
  const { t, i18n } = useTranslation();

  const [selected, setSelected] = useState(
    languageToCountryCode(i18n.language)
  );
  const [setselectedCurrency, setSetselectedCurrency] = useState(
    currencyToCountryCode(currency)
  );

  //language to country code
  function languageToCountryCode(language) {
    switch (language) {
      case "en":
        return "US";
      case "ar":
        return "SA";
      case "fr":
        return "FR";
      default:
        return "FR";
    }
  }

  //language to currency code
  const languageToCurrencyCode = (country) => {
    switch (country) {
      case "US":
        return "USD";
      case "TN":
        return "TND";
      case "FR":
        return "EUR";
      default:
        return "TND";
    }
  };

  //currency to country code
  function currencyToCountryCode(currency) {
    switch (currency) {
      case "USD":
        return "US";
      case "TND":
        return "TN";
      case "EUR":
        return "FR";
      default:
        return "FR";
    }
  }
  // useEffect(() => {
  //   const countryCode = languageToCountryCode(i18n.language);
  //   setSelected(countryCode);
  // }, [i18n.language]);

  // useEffect(() => {
  //   console.log(currency);
  //   const currencyCode = currencyToCountryCode(currency);
  //   console.log(currencyCode);
  //   setSetselectedCurrency(currencyCode);
  // }, [currency]);

  const onChangeLanguage = (code) => {
    let newLanguage;
    // Use `code` directly instead of `selected`
    if (code === "US") {
      newLanguage = "en";
    } else if (code === "SA") {
      newLanguage = "ar";
    } else if (code === "FR") {
      // Make sure to provide the option for "FR" if you want to support French;
      newLanguage = "fr";
    } else {
      newLanguage = "en"; // or some default value
    }

    i18n.changeLanguage(newLanguage);
    setSelected(code);

    document.body.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  const onChangeCurrency = (code) => {
    const newCurrency = languageToCurrencyCode(code);
    // const newCurrency = e.target.value;
    updateCurrency(newCurrency);

    setSetselectedCurrency(code);
  };

  useEffect(() => {
    const langElements = document.getElementsByClassName("lang");

    for (const element of langElements) {
      if (element.value === i18n.language) {
        if (element.value === "ar") {
          document.body.dir = "rtl";
        }
        element.setAttribute("selected", true);
      }
    }

    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const checkWindowWidth = () => {
    setIsMobile(window.innerWidth <= 990); // Set breakpoint according to your needs (e.g., 768 for tablets and phones)
  };

  useEffect(() => {
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  return (
    <div className={type === 0 ? "header-no-home" : "header"}>
      {/* className="container" */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div
            className={!isMobile ? "container-fluid" : "container-mobile"}
            style={{ margin: 0, paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
          >
            <Link className="navbar-brand" to="/">
              <div
                className="d-flex align-items-center"
                onClick={() => finishedSearch()}
              >
                <img
                  src={promovilla}
                  className="promovilla"
                  alt="promovillalogo"
                />
              </div>
            </Link>
            {isMobile ? (
              <MobileHeader /> // Render mobile version
            ) : (
              <>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNav"
                  style={{ width: "unset" }}
                >
                  <ul
                    className="navbar-nav ms-auto"
                    style={{ alignItems: "center" }}
                  >
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        {t("header.home")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/vente">
                        {t("header.sale")}
                      </Link>
                      <ul className="sub-ul" onClick={() => finishedSearch()}>
                        <li>
                          <Link to="/vente/maison">{t("type.maison")}</Link>
                        </li>
                        <li>
                          <Link to="/vente/villa">{t("type.villa")}</Link>
                        </li>
                        <li>
                          <Link to="/vente/appartement">
                            {t("type.appartement")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/vente/immeuble">{t("type.immeuble")}</Link>
                        </li>
                        <li>
                          <Link to="/vente/bureau">{t("type.bureau")}</Link>
                        </li>
                        <li>
                          <Link to="/vente/commercial">
                            {t("type.commercial")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/vente/terrain">{t("type.terrain")}</Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/location">
                        {t("header.rent")}
                      </Link>
                      <ul className="sub-ul" onClick={() => finishedSearch()}>
                        <li>
                          <Link to="/location/maison">{t("type.maison")}</Link>
                        </li>
                        <li>
                          <Link to="/location/villa">{t("type.villa")}</Link>
                        </li>
                        <li>
                          <Link to="/location/appartement">
                            {t("type.appartement")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/location/immeuble">
                            {t("type.immeuble")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/location/bureau">{t("type.bureau")}</Link>
                        </li>
                        <li>
                          <Link to="/location/commercial">
                            {t("type.commercial")}
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">
                        {t("header.about")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact">
                        {t("header.contact")}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div style={{ display: "flex" }}>
                  <ul className="navbar-nav ms-auto">
                    <div className="nav-item">
                      {/* <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={onChangeLanguage}
                      >
                        <option value="fr" className="lang">
                          FR
                        </option>
                        <option value="en" className="lang">
                          EN
                        </option>
                        <option value="ar" className="lang">
                          AR
                        </option>
                      </select> */}
                      <ReactFlagsSelect
                        countries={["FR", "US", "SA"]}
                        selected={selected}
                        className="menu-flags"
                        // onChange={onChangeLanguage}
                        onSelect={onChangeLanguage}
                      />
                    </div>
                  </ul>
                  <ul className="navbar-nav ms-auto">
                    <div className="nav-item">
                      {/* <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={onChangeCurrency}
                        value={currency}
                      >
                        <option value="TND" className="lang">
                          TND
                        </option>
                        <option value="EUR" className="lang">
                          EUR
                        </option>
                        <option value="USD" className="lang">
                          USD
                        </option>
                      </select> */}
                      <ReactFlagsSelect
                        countries={["TN", "US", , "FR"]}
                        customLabels={{
                          US: "USD",
                          FR: "EUR",
                          TN: "TND",
                        }}
                        selected={setselectedCurrency}
                        className="menu-flags"
                        // onChange={onChangeLanguage}
                        // onSelect={(code) => setSetselectedCurrency(code)}
                        onSelect={onChangeCurrency}
                      />
                    </div>
                  </ul>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
