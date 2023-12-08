// MobileHeader.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const MobileHeader = () => {
  const { t } = useTranslation();

  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
  };

  const handleMenuItemClick = () => {
    setShowOverlay(false);
  };

  return (
    <div className="mobile-header">
      <button className="menu-toggle" onClick={toggleOverlay}>
        {showOverlay ? (
          <FiX className="menu-icon" />
        ) : (
          <FiMenu className="menu-icon" />
        )}
      </button>
      {showOverlay && (
        <div className="overlay">
          <FiMenu className="menu-icon" />
          <ul className="links">
            <li>
              <Link to="/" onClick={handleMenuItemClick}>
                {t("header.home")}
              </Link>
            </li>
            <li>
              <Link to="/vente" onClick={handleMenuItemClick}>
                {t("header.sale")}
              </Link>
            </li>
            <li>
              <Link to="/location" onClick={handleMenuItemClick}>
                {t("header.rent")}
              </Link>
            </li>
            <li>
              <Link to="#" onClick={handleMenuItemClick}>
                <span className="category">
                  Category <FiChevronDown className="icon" />
                </span>
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
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={handleMenuItemClick}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
