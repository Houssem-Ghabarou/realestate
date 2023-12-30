import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetSeo = ({ title, url, description, image }) => {
  const imageWidth = "1200"; // Set the width of your image
  const imageHeight = "630"; // Set the height of your image

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
      <meta name='twitter:card' content={image} />
      <meta name='twitter:image:width' content={imageWidth} />
      <meta name='twitter:image:height' content={imageHeight} />

      <meta property='og:description' content={description} />
    </Helmet>
  );
};

export default HelmetSeo;
