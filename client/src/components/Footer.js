import React from "react";
import promovilla from "../assets/promovilla.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { GrSchedule } from "react-icons/gr";
import { GrUserManager } from "react-icons/gr";

import { FaPhoneFlip } from "react-icons/fa6";
const Footer = () => {
  const { t, i18n } = useTranslation();

  const returnTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <section className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            {/* <i className="fas fa-home"></i> */}
            <img src={promovilla} alt="promovilla" className="footer-logo" />
            <span className="footer-other-text d-block mt-3 mb-3">
              {t("footer.def")}
            </span>
            <div className="footer-social">
              <div className="footer-social-item">
                <FaFacebook />
              </div>
              <div className="footer-social-item">
                <FaInstagramSquare />
              </div>
              <div className="footer-social-item">
                <FaWhatsappSquare />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <p className="footer-title">{t("menu")}</p>
            <ul className="footer-ul" onClick={returnTop}>
              <li>
                <Link to="/">{t("header.home")}</Link>
              </li>
              <li>
                <Link to="/vente"> {t("header.sale")}</Link>
              </li>
              <li>
                <Link to="/location"> {t("header.rent")}</Link>
              </li>
              <li>
                <Link to="/contact"> {t("header.contact")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <div>
              <p className="footer-title">{t("categories.vente")}</p>
              <ul className="footer-ul" onClick={returnTop}>
                <li>
                  <Link to="/vente/villa">{t("search.villa")}</Link>
                </li>
                <li>
                  <Link to="/vente/maison">{t("search.maison")}</Link>
                </li>
                <li>
                  <Link to="/vente/appartement">{t("search.appartement")}</Link>
                </li>
                <li>
                  <Link to="/vente/terrain">{t("search.terrain")}</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-title">{t("categories.location")}</p>
              <ul className="footer-ul">
                <li>
                  <Link to="/location/villa">{t("search.villa")}</Link>
                </li>
                <li>
                  <Link to="/location/maison">{t("search.maison")}</Link>
                </li>
                <li>
                  <Link to="/location/appartement">
                    {t("search.appartement")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <p className="footer-title">{t("header.contact")}</p>
            <ul className="footer-ul">
              <li className="d-flex">
                <div className="footer-info-item">
                  <GrSchedule />
                </div>{" "}
                <span>08:00-:21:00</span>
              </li>
              <li className="d-flex">
                <div className="footer-info-item">
                  <IoMail />
                </div>{" "}
                <span>
                  <a href="mailto:promovilla@gmail.com">
                    agence.promovilla@gmail.com
                  </a>
                </span>
              </li>
              <li className="d-flex">
                <div className="footer-info-item">
                  <GrUserManager />
                </div>{" "}
                <span>Promo Villa</span>
              </li>
              <li className="d-flex">
                <div className="footer-info-item">
                  <FaPhoneFlip />
                </div>{" "}
                <span>
                  <a href="tel:+21620532181">{t("numTel1")}</a>
                </span>
              </li>
            </ul>
          </div>
          {/*<div className="col-lg-3 col-md-6">
                        <p className="footer-title">Subscribe</p>
                        <span className="footer-other-text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore magna
                        </span>
                        <div className="subscribe-area mb-2 mt-2">
                            <input type="text" placeholder="Email" className="inp-footer w-100" />
                        </div>
                        <button className="btn-subscribe">Subscribe</button>
                    </div>*/}
        </div>
      </div>
    </section>
  );
};

export default Footer;
