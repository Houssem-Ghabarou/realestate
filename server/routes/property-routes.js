const express = require("express");
const router = express.Router();

const {
  addProperty,
  getAllProperties,
  editProperty,
  deleteProperty,
  getVenteProperties,
  getLocationProperties,
  getPropertyDetails,
  getLastSixLocationProperties,
  getLastSixVenteProperties,
  getLastSixProperties,
  getPropertyCategoryType,
  searchProperty,
  getLocation,
  searchByRefName,
} = require("../controllers/property-controller");
const passport = require("../middlware/passport");
const upload = require("../middlware/upload");

const jwtAdmin = passport.authenticate("ADMIN", {
  session: false,
});

router.post("/", upload.array("images[]"), jwtAdmin, addProperty); //single for just 1 image
router.get("/", getAllProperties);
router.get("/lastsixprop", getLastSixProperties);
router.get("/lastsixventeprop", getLastSixVenteProperties);
router.get("/lastsixlocationprop", getLastSixLocationProperties);
router.get("/singleproperty/:propIdName", getPropertyDetails);
router.get("/vente", getVenteProperties);
router.get("/location", getLocationProperties);
router.get("/:category/categorytype/:propertyType", getPropertyCategoryType);
router.get("/searchproperty", searchProperty);
router.put("/:id", upload.array("images[]"), jwtAdmin, editProperty);
router.delete("/:id", jwtAdmin, deleteProperty);
router.get("/localisation", getLocation);
router.get("/searchbyrefname", searchByRefName);

module.exports = router;
