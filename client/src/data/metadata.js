import bg7 from "../assets/backgrounds/bg7.jpg";

const URL = process.env.REACT_APP_URL;
export const homeMetadata = {
  value: "acceuil",
  canonicalLink: URL,
};

export const venteMetadata = {
  value: "vente",
  canonicalLink: `${URL}/vente`,
  description:
    "Explorez notre large sélection de biens immobiliers à louer, adaptés à chaque style de vie et budget. Des appartements confortables aux maisons spacieuses, trouvez le lieu de location idéal pour vous. Découvrez la facilité et la commodité de la location avec nous dès aujourd’hui !",
  image: bg7,
};

export const locationMetadata = {
  value: "locationRoute",
  canonicalLink: `${URL}/location`,
  description:
    "Découvrez notre gamme de biens immobiliers disponibles à la location. Des espaces commerciaux aux bureaux et locaux d’activité, trouvez l’emplacement parfait pour votre entreprise. Louez avec confiance et simplicité, et faites de cet espace votre nouveau chez-vous professionnel.",
  image: bg7,
};

export const aboutMetadata = {
  value: "about",
  canonicalLink: `${URL}/about`,
};

export const contactMetadata = {
  value: "contact",
  canonicalLink: `${URL}contact`,
};
