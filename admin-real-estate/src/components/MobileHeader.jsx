import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { routesLinks } from "../data/routesLinks";
import { Link } from "react-router-dom";
import promovilla from "../assets/promovillaNew.png";
import { IoMdClose } from "react-icons/io";

const MobileHeader = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
  };
  return (
    <aside>
      {!showOverlay && <FiMenu className='menu-icon' onClick={toggleOverlay} />}

      {showOverlay && (
        <div className='overlay'>
          <div className='order'>
            <div className='aside-head'>
              <IoMdClose className='close-menu' onClick={toggleOverlay} />
              ;
              <img
                src={promovilla}
                alt='promovilla-logo'
                className='promovilla-logo-sidebar'
              />
            </div>

            {routesLinks.map((r) => (
              <nav key={r.name}>
                <ul className='links'>
                  <li>
                    <Link to={r.path}>{r.name}</Link>
                  </li>
                </ul>
              </nav>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default MobileHeader;
