import bg7 from "../assets/ogimage.png";
import promoVilla from "../assets/ogimage.png";
const URL = process.env.REACT_APP_WEBSITE_URL;
export const homeMetadata = {
  value: "acceuil",
  canonicalLink: URL,
  image: promoVilla,
  description: "homedescription",
};

export const venteMetadata = {
  value: "vente",
  canonicalLink: `${URL}/vente`,
  description: "venteDescription",
  image: bg7 ,
};

export const locationMetadata = {
  value: "locationRoute",
  canonicalLink: `${URL}/location`,
  description: "locationDescription",
  image: bg7 ,
};

export const aboutMetadata = {
  value: "about",
  canonicalLink: `${URL}/about`,
  image: bg7 ,
  description: "aboutDescription",
};

export const contactMetadata = {
  value: "contact",
  canonicalLink: `${URL}/contact`,
  image:  bg7 ,
  description: "contactDescription",
};
