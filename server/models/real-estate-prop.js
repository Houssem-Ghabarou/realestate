const mongoose = require("mongoose");
const shortid = require("shortid");
// const currency = require("mongoose-currency");

const realEstatePropertySchema = new mongoose.Schema({
  propIdName: {
    type: String,
    unique: true,
  },
  reference: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    enum: ["vente", "location", "locationVacances"],
    required: true,
  },
  // status: {
  //   type: String,
  //   enum: ["vendu", "loué"],
  //   default: null,
  // },
  ammeublement: {
    type: String,
    enum: ["meuble", "nonMeuble", "partiellementMeuble"],
  },

  type: {
    type: String,
    enum: [
      "maison",
      "villa",
      "appartement",
      "terrain",
      // "local",
      "immeuble",
      "commercial",
      "bureau",
    ],
    required: true,
  },

  characteristics: {
    type: [
      {
        type: String,
        enum: [
          "Balcon/Terrasse",
          "Stationnement",
          "Piscine",
          "Neuf",
          "Jardin",
          "Ascenseur",
          "Proche des écoles",
          "Proche des commerces",
          "Cuisine ouverte",
          "Vue sur la mer",
          "Vue sur la montagne",
        ],
      },
    ],
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
    // required: function () {
    //   return !["terrain", "commercial", "bureau", "local"].includes(this.type);
    // },
  },
  sallesDeBains: {
    type: Number,
    // required: function () {
    //   return !["terrain", "commercial", "bureau", "local"].includes(this.type);
    // },
  },
  surface: {
    type: Number,
    required: true,
  },
  parking: {
    type: Number,
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
