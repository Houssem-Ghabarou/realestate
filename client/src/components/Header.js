import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MobileHeader from "./MobileHeader";
import promovilla from "../assets/promovilla.png";
import { useTranslation } from "react-i18next";
import { SearchResultContext } from "../context/SearchContext";

const Header = ({ type }) => {
  const { finishedSearch } = useContext(SearchResultContext);
  const [isMobile, setIsMobile] = useState(false);

  const { t, i18n } = useTranslation();
  const onChangeLanguage = (e) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    document.body.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    for (
      let index = 0;
      index < document.getElementsByClassName("lang").length;
      index++
    ) {
      const element = document.getElementsByClassName("lang")[index];
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
    setIsMobile(window.innerWidth <= 768); // Set breakpoint according to your needs (e.g., 768 for tablets and phones)
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
            className="container-fluid"
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
                <div>
                  <ul className="navbar-nav ms-auto">
                    {/* <li className="nav-item">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          // backgroundColor: "#607d7d",
                          backgroundColor: "#DAA520",
                          borderRadius: "1.4rem",
                          // padding: "0.3rem",
                          // marginLeft: "3rem",
                          paddingLeft: "0.5rem",
                          paddingRight: "0.5rem",
                          color: "white !important",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FaPhone style={{ color: "white" }} />
                          <Link className="nav-link special-link" to="/contact">
                            {t("header.contact")}
                          </Link>
                        </div>
                      </div>
                    </li> */}
                    <div className="nav-item">
                      <select
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
                      </select>
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
