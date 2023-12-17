import React, { useState } from "react";
import promovilla from "../assets/promovilla.jpg";
import { useTranslation } from "react-i18next";
import ContactButton from "./ContactButton";
const ContactDetails = ({ propertyId }) => {
  const { t } = useTranslation();

  const [namesurname, setNameSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const emailData = {
    property: propertyId,
    namesurname: namesurname,
    email: email,
    phone: phone,
    description: message,
  };
  return (
    <div
      className="fd-sidebar-item"
      style={{ top: "20px", position: "sticky" }}
    >
      <h4>{t("contactezNous")}</h4>

      <div className="d-flex  align-items-center mb-1">
        <img
          src={promovilla}
          className="promovilla-contact-details"
          alt="promovilla Immobilier Logo"
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

      <form className="contact">
        <div className="form-group">
          <input
            className="inp-contact"
            type="text"
            value={namesurname}
            onChange={(e) => setNameSurname(e.target.value)}
            id="name"
            name="name"
            required
            placeholder={t("namesurname")}
          />
        </div>

        <div className="contact">
          <input
            className="inp-contact"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder={t("phone")}
            required
          />
        </div>
        <div className="contact">
          <input
            className="inp-contact"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email")}
            required
          />
        </div>
        <div>
          <textarea
            type="text"
            className="ta-contact"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("description")}
          ></textarea>
        </div>

        <ContactButton emailData={emailData} />
      </form>
    </div>
  );
};

export default ContactDetails;
