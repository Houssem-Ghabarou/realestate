export function filterFormData(formData) {
  const addPropData = {};

  if (formData.nom) addPropData.name = formData.nom;
  if (formData.category) addPropData.category = formData.category;
  if (formData.propertyType) addPropData.type = formData.propertyType;
  if (formData.ammeublement) addPropData.ammeublement = formData.ammeublement;
  if (formData.location) addPropData.location = formData.location;
  if (formData.selectedFeatures && formData.selectedFeatures.length > 0)
    addPropData.characteristics = formData.selectedFeatures;
  if (formData.prix) addPropData.price = formData.prix;
  if (formData.surface) addPropData.surface = formData.surface;
  if (formData.chambres) addPropData.chambres = formData.chambres;
  if (formData.parking) addPropData.parking = formData.parking;
  if (formData.sallesDeBain) addPropData.sallesDeBains = formData.sallesDeBain;
  if (formData.description) addPropData.description = formData.description;
  if (formData.uploads && formData.uploads.length > 0)
    addPropData.images = formData.uploads;

  return addPropData;
}
