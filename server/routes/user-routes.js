const express = require("express");
const router = express.Router();



const { Register, Login } = require("../controllers/user-controller");


router.post("/registeradmin",Register);
router.post("/loginadmin",Login);


module.exports = router;