import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const HelmetSeo = ({ title, url, description, image }) => {
  const { i18n } = useTranslation();

  const imageWidth = "1200"; // Set the width of your image
  const imageHeight = "630"; // Set the height of your image

  let language;
  switch (i18n.language) {
    case "ar":
      language = "ar-SA";
      break;
    case "en":
      language = "en-US";
      break;
    case "fr":
      language = "fr-FR";
      break;
    default:
      language = "fr-FR";
      break;
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <link rel='canonical' href={url} />
      <meta property='og:image' content={image} />

      {/* Facebook specific meta tags for image */}
      <meta property='og:image:width' content={imageWidth} />
      <meta property='og:image:height' content={imageHeight} />

      {/* Twitter specific meta tags for image */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:image:width' content={imageWidth} />
      <meta name='twitter:image:height' content={imageHeight} />
      <meta name='image' property='og:image' content={image} />
      <meta property='og:description' content={description} />
      <meta name='author' content='promovillaimmobilier' />
      <meta property='og:locale' content={language} />
    </Helmet>
  );
};

export default HelmetSeo;
