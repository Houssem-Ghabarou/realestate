const realEstateProp = require("../models/real-estate-prop");
const sharp = require("sharp");

const addProperty = async (req, res) => {
  // Extract data from the request body
  const {
    category,
    type,
    price,
    name,
    location,
    description,
    chambres,
    sallesDeBains,
    surface,
    parking,
    characteristics,
  } = req.body;

  // Check for required fields
  if (
    !category ||
    !type ||
    !price ||
    !location ||
    !description ||
    !surface ||
    !name
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });
  }

  // Validate specific fields for certain types
  if (["Maison", "Villa", "Appartement", "Immeuble"].includes(type)) {
    if (!chambres || !sallesDeBains) {
      return res.status(400).json({
        message:
          "Nombre de chambres et de salles de bains est nécessaire pour le type sélectionné.",
      });
    }
  }

  try {
    const newProp = new realEstateProp({
      category,
      type,
      price,
      name,
      location,
      description,
      chambres,
      sallesDeBains,
      surface,
      parking,
      characteristics,
    });

    // Check if images are provided
    if (req.files.length === 0) {
      return res.status(400).json({ message: "Images are necessary" });
    } else {
      // Process and store image paths
      let path = "";
      for (const file of req.files) {
        // Use sharp to compress the image
        // const compressedImageBuffer = await sharp(file.path)
        //   .resize(800) // You can adjust the size as needed
        //   .toBuffer();
        const compressedImageBuffer = await sharp(file.path)
          .jpeg({ quality: 80 }) // You can adjust the quality as needed
          .toBuffer();

        // Save the compressed image back to the uploads folder
        await sharp(compressedImageBuffer).toFile(file.path);

        path += file.path + ",";
      }
      path = path.substring(0, path.lastIndexOf(","));
      newProp.images = path;
    }

    // Save the property
    const savedProperty = await newProp.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new property." });
  }
};

const deleteProperty = async (req, res) => {
  const propertyId = req.params.id; // Assuming the property ID is provided as a URL parameter

  try {
    // Find the property by ID
    const property = await realEstateProp.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    // Delete the property
    await property.deleteOne();
    res.status(200).json({ message: "Property deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the property." });
  }
};

const editProperty = async (req, res) => {
  const propertyId = req.params.id; // Assuming the property ID is provided as a URL parameter

  try {
    // Find the property by ID
    const property = await realEstateProp.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    // Extract data from the request body
    const {
      category,
      type,
      price,
      name,
      location,
      description,
      chambres,
      sallesDeBains,
      surface,
      parking,
      characteristics,
    } = req.body;

    // Update the property fields with the new data
    // Update the property fields with the new data (only for the provided fields)
    if (category) property.category = category;
    if (type) property.type = type;
    if (price) property.price = price;
    if (name) property.name = name;
    if (location) property.location = location;
    if (description) property.description = description;
    if (chambres) property.chambres = chambres;
    if (sallesDeBains) property.sallesDeBains = sallesDeBains;
    if (surface) property.surface = surface;
    if (parking) property.parking = parking;
    if (characteristics) property.characteristics = characteristics;
    // Check if images are provided
    if (req.files.length !== 0) {
      let path = "";
      req.files.forEach(function (file) {
        path += file.path + ",";
      });
      path = path.substring(0, path.lastIndexOf(","));
      property.images = path;
    }

    // Save the updated property
    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the property." });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await realEstateProp.find().sort({ timestamp: -1 });
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get properties." });
  }
};

const getLastSixVenteProperties = async (req, res) => {
  try {
    const properties = await realEstateProp
      .find({ category: "vente" })
      .sort({ timestamp: -1 })
      .limit(6);
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get properties." });
  }
};
const getLastSixLocationProperties = async (req, res) => {
  try {
    const properties = await realEstateProp
      .find({ category: "location" })
      .sort({ timestamp: -1 })
      .limit(6);
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get properties." });
  }
};

const getLastSixProperties = async (req, res) => {
  try {
    const properties = await realEstateProp
      .find()
      .sort({ timestamp: -1 })
      .limit(6);
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get properties." });
  }
};

const getPropertyDetails = async (req, res) => {
  const propId = req.params.id;
  try {
    const property = await realEstateProp.findById(propId);
    return res.status(200).json(property);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get property details." });
  }
};

const getVenteProperties = async (req, res) => {
  try {
    const properties = await realEstateProp
      .find({ category: "vente" })
      .sort({ timestamp: -1 });
    return res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get properties." });
  }
};
const getLocationProperties = async (req, res) => {
  try {
    const properties = await realEstateProp
      .find({ category: "location" })
      .sort({ timestamp: -1 });
    return res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get properties." });
  }
};
const getVenteMaison = async (req, res) => {
  try {
    const maison = await realEstateProp.find({ category: "vente", type: "Maison" });
    return res.status(200).json(maison);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get Maison." });
  }
};
const getVenteVilla = async (req, res) => {
  try {
    const villa = await realEstateProp.find({ category: "vente", type: "Villa" });
    return res.status(200).json(villa);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get Villa." });
  }
};
const getVenteAppartement = async (req, res) => {
  try {
    const appartement = await realEstateProp.find({ category: "vente", type: "Appartement" });
    return res.status(200).json(appartement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get Appartement." });
  }
};
const getVenteImmeuble = async (req, res) => {
  try {
    const immeuble = await realEstateProp.find({ category: "vente", type: "Immeuble" });
    return res.status(200).json(immeuble);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get Immeuble." });
  }
};
const getVenteTerrain = async (req, res) => {
  try {
    const terrain = await realEstateProp.find({ category: "vente", type: "Terrain" });
    return res.status(200).json(terrain);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get Terrain." });
  }
};
const getVenteBureau = async (req, res) => {
  try {
    const bureau = await realEstateProp.find({ category: "vente", type: "Bureau" });
    return res.status(200).json(bureau);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get Bureau." });
  }
};
const getVenteCommercial = async (req, res) => {
  try {
    const commercial = await realEstateProp.find({ category: "vente", type: "Commercial" });
    return res.status(200).json(commercial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get commercial." });
  }
};
const getLocationMaison = async (req, res) => {
  try {
    const lmaison = await realEstateProp.find({ category: "location", type: "Maison" });
    return res.status(200).json(lmaison);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get maison." });
  }
};
const getLocationTerrain = async (req, res) => {
  try {
    const lterrain = await realEstateProp.find({ category: "location", type: "Terrain" });
    return res.status(200).json(lterrain);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get terrain." });
  }
};
const getLocationCommercial = async (req, res) => {
  try {
    const lcommercial = await realEstateProp.find({ category: "location", type: "Commercial" });
    return res.status(200).json(lcommercial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get commercial." });
  }
};
const getLocationAppartement = async (req, res) => {
  try {
    const lappartement = await realEstateProp.find({ category: "location", type: "Appartement" });
    return res.status(200).json(lappartement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get appartement." });
  }
};

const getLocationVilla = async (req, res) => {
  try {
    const lvilla = await realEstateProp.find({ category: "location", type: "Villa" });
    return res.status(200).json(lvilla);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get villa." });
  }
};
const getLocationBureau = async (req, res) => {
  try {
    const lbureau = await realEstateProp.find({ category: "location", type: "Bureau" });
    return res.status(200).json(lbureau);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get bureau." });
  }
};
const getLocationImmeuble = async (req, res) => {
  try {
    const limmeuble = await realEstateProp.find({ category: "location", type: "Immeuble" });
    return res.status(200).json(limmeuble);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get immeuble." });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  editProperty,
  deleteProperty,
  getVenteProperties,
  getLocationProperties,
  getPropertyDetails,
  getLastSixProperties,
  getLastSixLocationProperties,
  getLastSixVenteProperties,
  getVenteMaison,
  getVenteVilla,
  getVenteAppartement,
  getVenteImmeuble,
  getVenteTerrain,
  getVenteBureau,
  getVenteCommercial,
  getLocationMaison,
  getLocationAppartement,
  getLocationBureau,
  getLocationCommercial,
  getLocationImmeuble,
  getLocationVilla,
  getLocationTerrain

};

