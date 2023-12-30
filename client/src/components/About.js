import { useTranslation } from "react-i18next";
import promvilla from "../assets/promovillaNew.png";
import house2 from "../assets/backgrounds/bg7.jpg";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom/";
import useProgressBar from "./useProgressBar";
import { aboutMetadata } from "../data/metadata";
import HelmetSeo from "./HelmetSeo";
const About = ({ setProgress }) => {
  const { t } = useTranslation();
  useProgressBar(setProgress);

  const style = {
    color: "#e1ab24",
  };

  return (
    <section className='about'>
      <HelmetSeo
        title={t(aboutMetadata?.value)}
        url={aboutMetadata?.canonicalLink}
        description={t(aboutMetadata?.description)}
        image={aboutMetadata?.image}
      />
      <div className='page-content'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <img
                src={house2}
                alt='immobilier-hammamet-about-us'
                className='about-us'
              />
            </div>
            <article className='col-lg-6'>
              <div className='about-item'>
                <div
                  className='title'
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={promvilla}
                    alt='promo-villa-hammamet-immobilier'
                    className='promo-villa'
                  />
                  <h1>{t("search.name")}</h1>
                </div>
                <div className='about-text'>{t("footer.def")}</div>
                <div className='about-features'>
                  <p className='about-feature'>
                    <FaCheck style={style} /> {t("aboutUs.experience")}
                  </p>
                  <p className='about-feature'>
                    <FaCheck style={style} />
                    {t("aboutUs.clientFocus")}
                  </p>
                  <p className='about-feature'>
                    <FaCheck style={style} />
                    {t("aboutUs.propertyPortfolio")}
                  </p>
                  <p className='about-feature'>
                    <FaCheck style={style} />
                    {t("aboutUs.transparencyEthics")}
                  </p>
                  <p className='about-feature'>
                    <FaCheck style={style} />
                    {t("aboutUs.innovationTech")}
                  </p>
                </div>
                <Link to='/contact' style={{ textDecoration: "none" }}>
                  <button className='btn-search m-2'>Contactez nous</button>
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
