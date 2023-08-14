import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileHeader from "./MobileHeader";
import promovilla from "../assets/promovilla.jpg";
import { useTranslation } from "react-i18next";

const Header = () => {
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

  // useEffect(() => {
  //   const language = document.getElementsByClassName("lang").selected;
  //   console.log(language);
  // }, []);

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
    <div className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <div className="d-flex align-items-center">
                {/* <i className="fas fa-home"></i> */}
                {/* <span className="ms-2"></span> */}
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
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        {t("header.home")}
                      </Link>
                    </li>
                    {/* <li>{t("title")}</li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/vente">
                        {t("header.sale")}
                      </Link>
                      <ul className="sub-ul">
                        <li>
                          <Link to="#">Maison</Link>
                        </li>
                        <li>
                          <Link to="#">Villa</Link>
                        </li>
                        <li>
                          <Link to="#">Appartement</Link>
                        </li>
                        <li>
                          <Link to="#">Immeuble</Link>
                        </li>
                        <li>
                          <Link to="#">Bureaux</Link>
                        </li>
                        <li>
                          <Link to="#">Commercial</Link>
                        </li>
                        <li>
                          <Link to="#">Terrain</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/location">
                        {t("header.rent")}
                      </Link>
                      <ul className="sub-ul">
                        <li>
                          <Link to="#">Maison</Link>
                        </li>
                        <li>
                          <Link to="#">Villa</Link>
                        </li>
                        <li>
                          <Link to="#">Appartement</Link>
                        </li>
                        <li>
                          <Link to="#">Immeuble</Link>
                        </li>
                        <li>
                          <Link to="#">Bureaux</Link>
                        </li>
                        <li>
                          <Link to="#">Commercial</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">
                        {t("header.about")}
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="#">
                        Category <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-ul">
                        <li>
                          <Link to="#">item</Link>
                        </li>
                        <li>
                          <Link to="#">item</Link>
                        </li>
                        <li>
                          <Link to="#">item</Link>
                        </li>
                      </ul>
                    </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact">
                        {t("header.contact")}
                      </Link>
                    </li>
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
