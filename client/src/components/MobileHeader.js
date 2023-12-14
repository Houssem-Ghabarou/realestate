import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import useLanguageCurrency from "./useLanguageCurrency";
import LanguageCurrencySelector from "./LanguageCurrencySelector";
import { typeOptionsSale, typeOptionsRent } from "../data/types";
const MobileHeader = ({ type, setProgress }) => {
  const { t } = useTranslation();
  const { selected, onChangeLanguage, setselectedCurrency, onChangeCurrency } =
    useLanguageCurrency();

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
    <aside>
      {!showOverlay && <FiMenu className="menu-icon" onClick={toggleOverlay} />}
      {showOverlay && (
        <div className="overlay">
          <div className="order">
            <div className="mobile-language-close">
              <LanguageCurrencySelector
                setProgress={setProgress}
                type={type}
                selectedLanguage={selected}
                onChangeLanguage={onChangeLanguage}
                selectedCurrency={setselectedCurrency}
                onChangeCurrency={onChangeCurrency}
              />

              <IoMdClose
                className={
                  type === "mobile" ? "close-menu-mobile" : "close-menu"
                }
                onClick={toggleOverlay}
              />
            </div>

            <ul className="links">
              <li>
                <Link to="/" onClick={handleMenuItemClick}>
                  {t("header.home")}
                </Link>
              </li>
              <>
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
                    {typeOptionsSale.map((type) => (
                      <li key={type}>
                        <Link
                          to={`/vente/${type}`}
                          onClick={handleMenuItemClick}
                        >
                          {" "}
                          {t(`type.${type}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
              <>
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
                    {typeOptionsRent.map((type) => (
                      <li key={type}>
                        <Link
                          to={`/location/${type}`}
                          onClick={handleMenuItemClick}
                        >
                          {" "}
                          {t(`type.${type}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
              <li>
                <Link to="/contact" onClick={handleMenuItemClick}>
                  {t("contactezNous")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MobileHeader;
