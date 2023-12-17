import { useTranslation } from "react-i18next";
import promvilla from "../assets/promovilla.png";
import house2 from "../assets/house2.jpg";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom/";
import useProgressBar from "./useProgressBar";
import { Helmet } from "react-helmet-async";
import { aboutMetadata } from "../data/metadata";

const About = ({ setProgress }) => {
  const { t } = useTranslation();
  useProgressBar(setProgress);

  const style = {
    color: "#e1ab24",
  };

  return (
    <section className="about">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t(aboutMetadata?.value)}</title>
        <link rel="canonical" href={aboutMetadata?.canonicalLink} />
      </Helmet>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img
                src={house2}
                alt="immobilier-hammamet-about-us"
                className="about-us"
              />
            </div>
            <article className="col-lg-6">
              <div className="about-item">
                <div
                  className="title"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={promvilla}
                    alt="promo-villa-hammamet-immobilier"
                    className="promo-villa"
                  />
                  {t("search.name")}
                </div>
                <div className="about-text">{t("footer.def")}</div>
                <div className="about-features">
                  <p className="about-feature">
                    <FaCheck style={style} /> {t("aboutUs.experience")}
                  </p>
                  <p className="about-feature">
                    <FaCheck style={style} />
                    {t("aboutUs.clientFocus")}
                  </p>
                  <p className="about-feature">
                    <FaCheck style={style} />
                    {t("aboutUs.propertyPortfolio")}
                  </p>
                  <p className="about-feature">
                    <FaCheck style={style} />
                    {t("aboutUs.transparencyEthics")}
                  </p>
                  <p className="about-feature">
                    <FaCheck style={style} />
                    {t("aboutUs.innovationTech")}
                  </p>
                </div>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <button className="btn-search m-2">Contactez nous</button>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
