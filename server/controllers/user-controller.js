const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ValidateRegister = require("../validation/Login");
const ValidateLogin = require("../validation/Login");
const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      User.findOne({ username: req.body.username }).then(async (exist) => {
        if (exist) {
          errors.username = "user exist";
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
          req.body.password = hash;
          req.body.role = "ADMIN";
          await User.create(req.body);
          res.status(200).json({ message: "success" });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      User.findOne({ username: req.body.username }).then((user) => {
        if (!user) {
          errors.username = "Utilisateur introuvable";
          res.status(404).json(errors);
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (!isMatch) {
              errors.password = "Mot de passe incorrect";
              res.status(404).json(errors);
            } else {
              let token = jwt.sign(
                {
                  id: user?._id,
                  username: user?.username,
                  role: user?.role,
                },
                process.env.PRIVATE_KEY,
                { expiresIn: "1y" }
              );
              res.status(200).json({
                message: "success",
                token: "Bearer " + token,
                username: user?.username,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { Register, Login };
