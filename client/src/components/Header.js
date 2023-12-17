import React, { useState, useEffect, useContext, lazy } from "react";
import { Link } from "react-router-dom";
import promovilla from "../assets/promovilla.png";
import { useTranslation } from "react-i18next";
import { SearchResultContext } from "../context/SearchContext";
import LanguageCurrencySelector from "./LanguageCurrencySelector";
import useLanguageCurrency from "./useLanguageCurrency";
import { typeOptionsSaleHeader, typeOptionsRentHeader } from "../data/types";
const MobileHeader = lazy(() => import("./MobileHeader"));

const Header = ({ type, setProgress }) => {
  const { t } = useTranslation();
  const { selected, onChangeLanguage, setselectedCurrency, onChangeCurrency } =
    useLanguageCurrency();
  const { finishedSearch } = useContext(SearchResultContext);
  const [isMobile, setIsMobile] = useState(false);

  const checkWindowWidth = () => {
    setIsMobile(window.innerWidth <= 990);
  };

  useEffect(() => {
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  return (
    <header>
      <nav
        className={
          type === 0
            ? "navbar navbar-expand-lg navbar-light header-no-home"
            : "navbar navbar-expand-lg navbar-light header"
        }
      >
        <div className={!isMobile ? "container-fluid" : "container-mobile"}>
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
            <MobileHeader type="mobile" setProgress={setProgress} />
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
                  style={{
                    alignItems: "center",
                    padding: "0 !important",
                    margin: "0 !important",
                  }}
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
                      {typeOptionsSaleHeader.map((type) => (
                        <li key={type}>
                          <Link to={`/vente/${type}`}>{t(`type.${type}`)}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/location">
                      {t("header.rent")}
                    </Link>
                    <ul className="sub-ul" onClick={() => finishedSearch()}>
                      {typeOptionsRentHeader.map((type) => (
                        <li key={type}>
                          <Link to={`/location/${type}`}>
                            {t(`type.${type}`)}
                          </Link>
                        </li>
                      ))}
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
              <div>
                <LanguageCurrencySelector
                  setProgress={setProgress}
                  selectedLanguage={selected}
                  onChangeLanguage={onChangeLanguage}
                  selectedCurrency={setselectedCurrency}
                  onChangeCurrency={onChangeCurrency}
                />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
