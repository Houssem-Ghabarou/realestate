import { useTranslation } from "react-i18next";
import promvilla from "../assets/promovilla.png";
import house2 from "../assets/house2.jpg";
import { FaCheck } from "react-icons/fa";
import L from "leaflet";
const About = () => {
  const { t } = useTranslation();

  const style = {
    color: "#e1ab24",
  };

  return (
    <section className="about">
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img src={house2} alt="product" className="about-us" />
            </div>
            <div className="col-lg-6">
              <div className="about-item">
                <div
                  className="title"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={promvilla}
                    alt="promo-villa"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
let DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
});
L.Marker.prototype.options.icon = DefaultIcon;
export default About;
