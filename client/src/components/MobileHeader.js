// MobileHeader.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

import { FiMenu, FiChevronDown } from "react-icons/fi";

const MobileHeader = () => {
  const { t } = useTranslation();

  const [showOverlay, setShowOverlay] = useState(false);
  const [showSubMenuRent, setShowSubMenuRent] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
  };

  const handleMenuItemClick = () => {
    setShowOverlay(false);
  };

  const handleSubMenuClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleSubMenuClickRent = () => {
    setShowSubMenuRent(!showSubMenuRent);
  };

  return (
    <div>
      {!showOverlay && <FiMenu className="menu-icon" onClick={toggleOverlay} />}
      {showOverlay && (
        <div className="overlay">
          <div className="order">
            <IoMdClose className="close-menu" onClick={toggleOverlay} />

            <ul className="links">
              <li>
                <Link to="/" onClick={handleMenuItemClick}>
                  {t("header.home")}
                </Link>
              </li>
              <div>
                <div className="parent-sub-menu">
                  <li>
                    <Link to="/vente" onClick={handleMenuItemClick}>
                      {t("header.sale")}
                    </Link>
                  </li>
                  <FiChevronDown
                    className="parent-sub-menu-icon"
                    onClick={handleSubMenuClick}
                  />
                </div>

                {showSubMenu && (
                  <ul className="sub-menu">
                    <li>
                      <Link to="/vente/villa" onClick={handleMenuItemClick}>
                        {t("type.villa")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/vente/terrain" onClick={handleMenuItemClick}>
                        {t("type.terrain")}
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div>
                <div className="parent-sub-menu">
                  <li>
                    <Link to="/location" onClick={handleMenuItemClick}>
                      {t("header.rent")}
                    </Link>
                  </li>
                  <FiChevronDown
                    className="parent-sub-menu-icon"
                    onClick={handleSubMenuClickRent}
                  />
                </div>

                {showSubMenuRent && (
                  <ul className="sub-menu">
                    <li>
                      <Link to="/location/villa" onClick={handleMenuItemClick}>
                        {t("type.villa")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/location/maison" onClick={handleMenuItemClick}>
                        {t("type.maison")}
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <li>
                <Link to="/contact" onClick={handleMenuItemClick}>
                  {t("contactezNous")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
