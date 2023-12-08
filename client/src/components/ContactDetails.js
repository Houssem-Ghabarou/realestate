import React from "react";
import promovilla from "../assets/promovilla.jpg";
import { useTranslation } from "react-i18next";

const ContactDetails = () => {
  const { t } = useTranslation();

  return (
    <div
      className="fd-sidebar-item"
      style={{ top: "20px", position: "sticky" }}
    >
      <h4>{t("contactezNous")}</h4>

      <div className="d-flex">
        <img
          src={promovilla}
          alt="promovilla Logo"
          width="120px"
          style={{ marginRight: "0.5rem" }}
        />
        <div>
          <h4 style={{ color: "#DAA520" }}>Promo Villa</h4>
          <div>
            <a className="contact-d" href="tel:+21620532181">
              {t("numTel1")}
            </a>
            <br />
            <a className="contact-d" href="tel:+21622307549">
              {t("numTel2")}
            </a>
          </div>

          <p>
            <a className="contact-d" href="mailto:promovilla@gmail.com">
              agence.promovilla@gmail.com
            </a>
          </p>
        </div>
      </div>

      <form className="form-contact">
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder={t("namesurname")}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("email")}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder={t("phone")}
            required
          />
        </div>
        <div className="form-group-description">
          <input
            type="text"
            id="description"
            name="description"
            placeholder={t("description")}
            required
          />
        </div>

        <button type="submit">{t("sendMessage")}</button>
      </form>
    </div>
  );
};

export default ContactDetails;
