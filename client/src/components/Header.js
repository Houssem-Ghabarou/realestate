import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

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
                <i className="fas fa-home"></i>
                <span className="ms-2">MB</span>
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
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/vente">
                        Vente
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/location">
                        location
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">
                        About
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
                        Contact
                      </Link>
                    </li>
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
