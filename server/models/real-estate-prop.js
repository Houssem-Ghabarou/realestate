const mongoose = require("mongoose");
const shortid = require("shortid");
// const currency = require("mongoose-currency");

const realEstatePropertySchema = new mongoose.Schema({
  reference: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    enum: ["vente", "location"],
    required: true,
  },
  // status: {
  //   type: String,
  //   enum: ["vendu", "loué"],
  //   default: null,
  // },
  type: {
    type: String,
    enum: [
      "Maison",
      "Villa",
      "Appartement",
      "Terrain",
      "Immeuble",
      "Commercial",
      "Bureau et local",
    ],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  chambres: {
    type: Number,
    required: function () {
      return !["Terrain", "Commercial", "Bureau et local"].includes(this.type);
    },
  },
  sallesDeBains: {
    type: Number,
    required: function () {
      return !["Terrain", "Commercial", "Bureau et local"].includes(this.type);
    },
  },
  surface: {
    type: Number,
    required: true,
  },
  parking: {
    type: Number,
    required: false,
  },
  characteristics: {
    type: {
      General: [{ type: String }],
      optional: {
        type: {
          approximite: [String],
          cuisine: [String],
          climatisation: [String],
          chauffage: [String],
          parking: [String],
          espaceexterieur: [String],
          vue: [String],
        },
      },
    },
    required: false,
  },
  images: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

// Add a pre-save hook to generate the reference before saving the document
realEstatePropertySchema.pre("save", function (next) {
  if (!this.reference) {
    // Generate a shortid and append "Ref" to the beginning
    this.reference = "Ref" + shortid.generate().slice(-4);
  }
  next();
});

const RealEstateProperty = mongoose.model(
  "RealEstateProperty",
  realEstatePropertySchema
);

module.exports = RealEstateProperty;
