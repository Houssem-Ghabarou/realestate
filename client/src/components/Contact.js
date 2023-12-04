import { IoMail, IoLocationSharp } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const Contact = () => {
  const { t } = useTranslation();
  const position = [36.40741860580118, 10.610816201938514];

  return (
    <section className="contact">
      <div className="page-content">
        <div className="container contact-us">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-4">
                  <div className="contact-item">
                    <IoMail />
                    <h5>{t("email")}</h5>
                    <h6>
                      <a href="mailto:promovilla@gmail.com">
                        agence.promovilla@gmail.com
                      </a>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="contact-item" style={{ cursor: "pointer" }}>
                    <IoLocationSharp />
                    <h5>{t("address")}</h5>
                    <h6> {t("location")}</h6>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="contact-item">
                    <FaPhoneFlip />
                    <h5>{t("phone")}</h5>
                    <h6>
                      <a href="tel:+21620532181">{t("numTel1")}</a>
                    </h6>
                    <h6>
                      <a href="tel:+21622307549">{t("numTel2")}</a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-5">
                <div className="col-lg-6">
                  <label>{t("namesurname")}</label>
                  <input type="text" className="inp-contact" />
                </div>
                <div className="col-lg-6">
                  <label>{t("phone")}</label>
                  <input type="text" className="inp-contact" />
                </div>
                <div className="col-lg-12">
                  <label>{t("subject")}</label>
                  <input type="text" className="inp-contact" />
                </div>
                <div className="col-lg-12">
                  <label>{t("messageContact")}</label>
                  <textarea
                    type="text"
                    className="ta-contact"
                    rows="4"
                  ></textarea>
                </div>
                <div className="col-lg-12">
                  <button className="btn-contact">{t("sendMessage")}</button>
                </div>
              </div>
            </div>
          </div>
          <MapContainer center={position} zoom={50} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>{t("search.name")} </Popup>
            </Marker>
          </MapContainer>
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

export default Contact;
