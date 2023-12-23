const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.username)) {
    errors.username = "Utilisateur requis";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Mot de passe requis";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
