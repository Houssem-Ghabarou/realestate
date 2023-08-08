// MobileHeader.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBook,
  FiInfo,
  FiChevronDown,
  FiMail,
} from "react-icons/fi";

const MobileHeader = () => {
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
          <ul className="links">
            <li>
              <Link to="/" onClick={handleMenuItemClick}>
                <FiHome className="icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={handleMenuItemClick}>
                <FiBook className="icon" /> Blog
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleMenuItemClick}>
                <FiInfo className="icon" /> About
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
                <FiMail className="icon" /> Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
