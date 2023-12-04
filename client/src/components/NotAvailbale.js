import React from "react";
import { useTranslation } from "react-i18next";

const NotAvailbale = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem",
      }}
    >
      <h2 className="title">{t("noProperties")}</h2>
    </div>
  );
};

export default NotAvailbale;
