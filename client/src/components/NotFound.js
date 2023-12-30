import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <meta charSet='utf-8' />
        <title>{t("pageNotFound")}</title>
      </Helmet>
      <h1 className='title'>{t("pageNotFound")}</h1>
    </div>
  );
};

export default NotFound;
