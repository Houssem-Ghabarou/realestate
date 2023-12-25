const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.username)) {
    errors.name = "Required username";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
