const URL = process.env.REACT_APP_URL;

export const homeMetadata = {
  value: "acceuil",
  canonicalLink: URL,
};

export const venteMetadata = {
  value: "vente",
  canonicalLink: `${URL}/vente`,
};

export const locationMetadata = {
  value: "locationRoute",
  canonicalLink: `${URL}/location`,
};

export const aboutMetadata = {
  value: "about",
  canonicalLink: `${URL}/about`,
};

export const contactMetadata = {
  value: "contact",
  canonicalLink: `${URL}/contact`,
};
