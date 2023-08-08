const realEstateProp = require("../models/real-estate-prop");

const addProperty = async (req, res) => {
  // Extract data from the request body
  const {
    category,
    type,
    price,
    location,
    description,
    chambres,
    sallesDeBains,
    surface,
    parking,
    characteristics,
  } = req.body;

  // Check for required fields
  if (!category || !type || !price || !location || !description || !surface) {
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
      req.files.forEach(function (file) {
        path += file.path + ",";
      });
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
    const properties = await realEstateProp.find();
    return res.status(200).json({ properties: properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get properties." });
  }
};

const getVenteProperties = async (req, res) => {
  try {
    const properties = await realEstateProp.find({ category: "vente" });
    return res.status(200).json({ properties: properties });
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: "Failed to get properties." });
  }
};
const getLocationProperties = async (req, res) => {
  try {
    const properties = await realEstateProp.find({ category: "location" });
    return res.status(200).json({ properties: properties });
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: "Failed to get properties." });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  editProperty,
  deleteProperty,
  getVenteProperties,
  getLocationProperties,
};
