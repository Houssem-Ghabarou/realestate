import React from "react";
import { useTranslation } from "react-i18next";

const PropNotFound = () => {
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
      <h2 className='title'>{t("propNotFound")}</h2>
    </div>
  );
};

export default PropNotFound;
