const typesRequiringAmeublement = [
  "maison",
  "villa",
  "appartement",
  "bureau",
  "immeuble",
];

const requiredChambreSallesDeBain = ["maison", "villa", "appartement"];
export const checkPass = (page, formData) => {
  if (page === 0) {
    // Check if all relevant fields are empty
    if (
      !formData.category &&
      !formData.propertyType &&
      !formData.location &&
      !formData.ammeublement
    ) {
      return {
        pass: false,
        error:
          "Tous les champs sont obligatoires, veuillez renseigner chaque information demandée.",
      };
    }

    // Individual checks
    // Check if category is provided
    if (!formData.category) {
      return {
        pass: false,
        error: "Veuillez choisir une catégorie.",
      };
    }

    // Check if propertyType is provided
    if (!formData.propertyType) {
      return {
        pass: false,
        error: "Veuillez choisir un type de bien.",
      };
    }

    if (
      typesRequiringAmeublement.includes(formData.propertyType) &&
      !formData.ammeublement
    ) {
      return {
        pass: false,
        error:
          "Veuillez indiquer l'ameublement pour le type de propriété sélectionné.",
      };
    }

    // Check if location is provided
    if (!formData.location) {
      return {
        pass: false,
        error: "Veuillez choisir ou entrer une location.",
      };
    }
  }

  if (page === 1) {
    if (
      !formData.surface &&
      !formData.prix &&
      !formData.sallesDeBain &&
      !formData.chambres
    ) {
      return {
        pass: false,
        error:
          "Tous les champs sont obligatoires, veuillez renseigner chaque information demandée.",
      };
    }
    if (!formData.surface) {
      return {
        pass: false,
        error: "Veuillez renseigner la surface du bien.",
      };
    }

    if (!formData.prix) {
      return {
        pass: false,
        error: "Veuillez renseigner le prix du bien.",
      };
    }
    if (
      requiredChambreSallesDeBain.includes(formData.propertyType) &&
      (!formData.chambres || !formData.sallesDeBain)
    ) {
      return {
        pass: false,
        error:
          "Veuillez indiquer le nombre de chambres et de salle de bain pour le type de propriété sélectionné.",
      };
    }

    const surfaceInput = formData.surface.trim(); // Remove leading/trailing spaces
    const prixInput = formData.prix.trim();

    if (!/^\d+(\.\d+)?$/.test(surfaceInput) || parseFloat(surfaceInput) <= 0) {
      return {
        pass: false,
        error: "Veuillez entrer une surface valide et positive.",
      };
    }

    if (!/^\d+(\.\d+)?$/.test(prixInput) || parseFloat(prixInput) <= 0) {
      return {
        pass: false,
        error: "Veuillez entrer un prix valide et positif.",
      };
    }

    if (
      requiredChambreSallesDeBain.includes(formData.propertyType) &&
      (isNaN(parseInt(formData.chambres)) ||
        parseInt(formData.chambres) <= 0 ||
        isNaN(parseInt(formData.sallesDeBain)) ||
        parseInt(formData.sallesDeBain) <= 0)
    ) {
      return {
        pass: false,
        error:
          "Veuillez indiquer le nombre valide et positif de chambres et de salles de bain.",
      };
    }
  }

  if (page === 2) {
    if (
      !formData.description &&
      !formData.nom &&
      (!formData.uploadedImages || formData.uploadedImages.length === 0)
    ) {
      return {
        pass: false,
        error: "Veuillez renseigner des images, une description et un nom.",
      };
    }
    if (!formData.uploadedImages || formData.uploadedImages.length === 0) {
      return {
        pass: false,
        error: "Veuillez renseigner des images.",
      };
    }
    if (!formData.nom) {
      return {
        pass: false,
        error: "Veuillez renseigner le nom du bien.",
      };
    }
    if (!formData.description) {
      return {
        pass: false,
        error: "Veuillez renseigner la description du bien.",
      };
    }
  }

  return { pass: true };
};

export default checkPass;
