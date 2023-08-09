const express = require("express");
const router = express.Router();

const {
  addProperty,
  getAllProperties,
  editProperty,
  deleteProperty,
  getVenteProperties,
  getLocationProperties,
} = require("../controllers/property-controller");
const passport = require("../middlware/passport");
const upload = require("../middlware/upload");

const jwtAdmin = passport.authenticate("ADMIN", {
  session: false,
});

router.post("/", upload.array("images[]"), jwtAdmin, addProperty); //single for just 1 image
router.get("/", getAllProperties);
router.get("/vente", getVenteProperties);
router.get("/location", getLocationProperties);

router.put("/:id", upload.array("images[]"), jwtAdmin, editProperty);
router.delete("/:id", jwtAdmin, deleteProperty);

module.exports = router;
