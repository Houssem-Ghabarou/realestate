import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import promovilla from "../assets/promovillaNew.png";
import profileIcon from "../assets/profile.png";
import { useLogout } from "../hooks/useLogout";
import MobileHeader from "./MobileHeader";
import { routesLinks } from "../data/routesLinks";
import logoutIcon from "../assets/logout.svg";
const NavBar = () => {
  const { logout } = useLogout();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const ref = useRef(null); // Ref for the container
  const [isMobile, setIsMobile] = useState(false);

  const checkWindowWidth = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);
  useEffect(() => {
    // Function to close dropdown if clicked outside
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <header>
      {!isMobile ? (
        <img src={promovilla} alt='promovilla-logo' />
      ) : (
        <MobileHeader />
      )}
      {!isMobile && (
        <nav className='header-middle'>
          {routesLinks.map((r) => (
            <Link key={r.name} to={r.path}>
              {r.name}
            </Link>
          ))}
        </nav>
      )}
      <div
        className='profile-container'
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        ref={ref} // Assign ref to the profile container
      >
        <img
          src={profileIcon}
          alt='profile-admin-immobilier'
          className='profile-logo'
        />
        {isDropdownVisible && (
          <div className='dropdown'>
            <Link to='/my-profile'>Mon Profile</Link>
            <Link to='/settings'>Paramètres</Link>
            <div>
              <hr />

              <div className='logout-button' onClick={logout}>
                <img src={logoutIcon} alt='logout' className='logout-icon' />

                <h5>Déconnecter</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
