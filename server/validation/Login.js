const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};


  // data.username=!isEmpty(data.username)?data.username:"";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  


//   if (validator.isEmpty(data.username)) {
//     errors.username = "Required username";
//  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }

 


  return {
      errors,
      isValid: isEmpty(errors)
  }
};
