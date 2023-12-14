import React, { useState, useEffect } from "react";
import proeprtyService from "../redux/services/propertyService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ClipLoader from "react-spinners/ClipLoader";

const { sendEmail } = proeprtyService;

const ContactButton = ({ emailData }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Call the API service for sending the email
      await sendEmail(emailData);

      setSuccess(true);
    } catch (error) {
      setError(
        error?.response?.data?.allFields ||
          error?.response?.data?.namesurname ||
          error?.response?.data?.email ||
          error?.response?.data?.phone ||
          error?.response?.data?.description
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(t("emailSent"), {
        iconTheme: {
          primary: "#DAA520",
        },
      });
    }
    setSuccess(false);
  }, [success, t]);

  const buttonState = () => {
    return loading ? (
      <ClipLoader
        color={"#333"}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    ) : (
      <button
        className="btn-search"
        onClick={handleContact}
        disabled={loading || success}
      >
        {t("contactezNous")}
      </button>
    );
  };
  return (
    <>
      {buttonState()}
      {error && <p> {error}</p>}
    </>
  );
};

export default ContactButton;
