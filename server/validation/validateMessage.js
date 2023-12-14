const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateMessage(message) {
  let errors = {};

  // Convert empty fields to empty strings
  message.namesurname = !isEmpty(message.namesurname)
    ? message.namesurname
    : "";
  message.email = !isEmpty(message.email) ? message.email : "";
  message.phone = !isEmpty(message.phone) ? message.phone : "";
  message.description = !isEmpty(message.description)
    ? message.description
    : "";

  if (
    validator.isEmpty(message.namesurname) &&
    validator.isEmpty(message.email) &&
    validator.isEmpty(message.phone) &&
    validator.isEmpty(message.description)
  ) {
    errors.allFields = "Tous les champs sont nécessaires.";
  }
  if (validator.isEmpty(message.namesurname)) {
    // Validation for Name and Surname
    errors.namesurname = "Nom et prénom sont nécessaires.";
  }

  // Validation for Email
  if (validator.isEmpty(message.email)) {
    errors.email = "Email est nécessaire.";
  } else if (!validator.isEmail(message.email)) {
    errors.email = "Format d'email invalide.";
  }

  // Validation for Phone Number
  if (validator.isEmpty(message.phone)) {
    errors.phone = "Le numéro de téléphone est nécessaire.";
  } else if (
    !validator.isNumeric(message.phone) ||
    message.phone.length !== 8
  ) {
    errors.phone = "Le numéro de téléphone doit comporter 8 chiffres.";
  }

  // Validation for Description
  if (validator.isEmpty(message.description)) {
    errors.description = "La description est nécessaire.";
  } else if (!validator.isLength(message.description, { min: 5 })) {
    errors.description = "La description doit comporter au moins 5 caractères.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
