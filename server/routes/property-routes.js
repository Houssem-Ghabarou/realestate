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
  getVenteMaison,
  getVenteVilla,
  getVenteImmeuble,
  getVenteTerrain,
  getVenteBureau,
  getVenteCommercial,
  getVenteAppartement,
  getLocationMaison,
  getLocationVilla,
  getLocationImmeuble,
  getLocationTerrain,
  getLocationBureau,
  getLocationCommercial,
  getLocationAppartement,
} = require("../controllers/property-controller");
const passport = require("../middlware/passport");
const upload = require("../middlware/upload");
const sharp = require("sharp");

const jwtAdmin = passport.authenticate("ADMIN", {
  session: false,
});

router.post("/", upload.array("images[]"), jwtAdmin, addProperty); //single for just 1 image
router.get("/", getAllProperties);
router.get("/lastsixprop", getLastSixProperties);
router.get("/lastsixventeprop", getLastSixVenteProperties);
router.get("/lastsixlocationprop", getLastSixLocationProperties);
router.get("/ventemaison", getVenteMaison);
router.get("/ventevilla", getVenteVilla);
router.get("/venteimmeuble", getVenteImmeuble);
router.get("/venteterrain", getVenteTerrain);
router.get("/ventebureau", getVenteBureau);
router.get("/ventecommercial", getVenteCommercial);
router.get("/venteappartement", getVenteAppartement);
router.get("/locationmaison",getLocationMaison );
router.get("/locationvilla",getLocationVilla );
router.get("/locationimmeuble",getLocationImmeuble );
router.get("/locationterrain",getLocationTerrain );
router.get("/locationbureau",getLocationBureau );
router.get("/locationcommercial",getLocationCommercial );
router.get("/locationappartement",getLocationAppartement );


router.get("/singleproperty/:id", getPropertyDetails);
router.get("/vente", getVenteProperties);
router.get("/location", getLocationProperties);

router.put("/:id", upload.array("images[]"), jwtAdmin, editProperty);
router.delete("/:id", jwtAdmin, deleteProperty);

module.exports = router;
