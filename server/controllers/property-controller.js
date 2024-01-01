const realEstateProp = require("../models/real-estate-prop");
const sharp = require("sharp");
const MAX_IMAGES_ALLOWED = 15;

const addProperty = async (req, res) => {
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
    ammeublement,
  } = req.body;

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
  if (["maison", "villa", "appartement"].includes(type)) {
    if (!chambres || !sallesDeBains || !ammeublement) {
      return res.status(400).json({
        message:
          "Nombre de chambres et de salles de bains et ammeublement est nécessaire pour le type sélectionné.",
      });
    }
  }

  const lowerName = name.toLowerCase();
  const locationLower = location.toLowerCase();

  function generateNumberIdentifier() {
    const timestamp = new Date().getTime(); // Get current timestamp
    return timestamp.toString().slice(-5); // Extract last 5 digits as a string
  }

  const numberIdentifier = generateNumberIdentifier();
  function generatePropIdName(lowerName, uniqueIdentifier) {
    // Replace accented characters with their non-accented counterparts
    const normalizedName = lowerName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Replace spaces with hyphens
    const formattedName = normalizedName.replace(/\s+/g, "-");

    // Combine with uniqueIdentifier
    const propIdName = `${uniqueIdentifier}-${formattedName}`;

    return propIdName;
  }

  const propIdName = generatePropIdName(lowerName, numberIdentifier);
  const characteristicsArray = characteristics
    ?.split(",")
    ?.map((item) => item?.trim());

  try {
    const newProp = new realEstateProp({
      category,
      type,
      propIdName,
      price,
      name: lowerName,
      location: locationLower,
      description,
      chambres,
      sallesDeBains,
      ammeublement,
      surface,
      parking,
      characteristics: characteristicsArray,
    });
    if (req.fileTypeError) {
      // Handle file type error
      return res.status(400).json({ imageError: req.fileTypeError });
    }
    if (req.files.length > MAX_IMAGES_ALLOWED) {
      return res.status(400).json({
        imageError: `Vous pouvez télécharger un maximum de ${MAX_IMAGES_ALLOWED} images. Veuillez supprimer quelques images et réessayer.`,
      });
    }
    // Check if images are provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are necessary" });
    } else {
      // Process and store image paths
      let path = "";
      for (const file of req?.files) {
        // Use sharp to compress the image
        // const compressedImageBuffer = await sharp(file.path)
        //   .resize(800) // You can adjust the size as needed
        //   .toBuffer();
        const compressedImageBuffer = await sharp(file?.path)
          .resize(850)
          .jpeg({ quality: 70 }) // You can adjust the quality as needed
          .toBuffer();

        // Save the compressed image back to the uploads folder
        await sharp(compressedImageBuffer).toFile(file?.path);

        path += file.path + ",";
      }
      path = path.substring(0, path.lastIndexOf(","));
      newProp.images = path;
    }

    if (
      type === "terrain" ||
      type === "immeuble" ||
      type === "bureau" ||
      type === "commercial"
    ) {
      newProp.chambres = null;
      newProp.sallesDeBains = null;
      newProp.parking = null;
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

  function generateNumberIdentifier() {
    const timestamp = new Date().getTime(); // Get current timestamp
    return timestamp.toString().slice(-5); // Extract last 5 digits as a string
  }
  function generatePropIdName(lowerName, uniqueIdentifier) {
    // Replace accented characters with their non-accented counterparts
    const normalizedName = lowerName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Replace spaces with hyphens
    const formattedName = normalizedName.replace(/\s+/g, "-");

    // Combine with uniqueIdentifier
    const propIdName = `${uniqueIdentifier}-${formattedName}`;

    return propIdName;
  }

  try {
    if (req.fileTypeError) {
      // Handle file type error
      return res.status(400).json({ imageError: req.fileTypeError });
    }
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
    if (name) {
      property.name = name;
      const numberIdentifier = generateNumberIdentifier();
      const propIdName = generatePropIdName(name, numberIdentifier);
      property.propIdName = propIdName;
    }
    if (location) property.location = location;
    if (description) property.description = description;
    if (chambres) property.chambres = chambres;
    if (sallesDeBains) property.sallesDeBains = sallesDeBains;
    if (surface) property.surface = surface;
    if (parking) property.parking = parking;
    if (characteristics) {
      const characteristicsArray = characteristics
        ?.split(",")
        ?.map((item) => item?.trim());
      property.characteristics = characteristicsArray;
    }

    if (req.files.length > MAX_IMAGES_ALLOWED) {
      return res.status(400).json({
        imageError: `Vous pouvez télécharger un maximum de ${MAX_IMAGES_ALLOWED} images. Veuillez supprimer quelques images et réessayer.`,
      });
    }

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
  const propIdName = req.params.propIdName;
  try {
    const property = await realEstateProp.findOne({ propIdName: propIdName });
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

const getPropertyCategoryType = async (req, res, next) => {
  const { category, propertyType } = req.params;

  try {
    const properties = await realEstateProp.find({
      category: category,
      type: propertyType,
    });
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `Failed to get ${propertyType} in ${category}.` });
  }
};

const searchProperty = async (req, res) => {
  const {
    category,
    propertyRef,
    propertyType,
    location,
    maxPrice,
    minSurface,
    chambreMin,
    sallesDeBains,
    ammeublement,
    selectedFeatures,
  } = req.query;

  try {
    const conditions = {};

    if (category) {
      conditions.category = category;
    }

    if (location) {
      conditions.location = { $in: location };
    }
    if (propertyType) {
      conditions.type = { $in: propertyType };
    }

    if (propertyRef) {
      // Escape special regex characters and digits to ensure they are treated as literals
      const escapedPropertyRef = propertyRef.replace(
        /[-\/\\^$*+?.()[\]{}]/g,
        "\\$&"
      );
      // Use $or operator to check for either reference or name
      conditions.$or = [
        {
          reference: {
            $regex: new RegExp(escapedPropertyRef.toLowerCase(), "i"),
          },
        },
        { name: { $regex: new RegExp(escapedPropertyRef.toLowerCase(), "i") } },
        // The 'i' flag in the regex makes the match case-insensitive
      ];
    }
    if (ammeublement) {
      conditions.ammeublement = ammeublement;
    }
    if (chambreMin !== undefined) {
      conditions.chambres = {};
      if (chambreMin !== undefined) {
        conditions.chambres.$gte = chambreMin;
      }
    }
    if (sallesDeBains !== undefined) {
      conditions.sallesDeBains = {};
      if (sallesDeBains !== undefined) {
        conditions.sallesDeBains.$gte = sallesDeBains;
      }
    }
    if (maxPrice !== undefined) {
      conditions.price = {};

      if (maxPrice !== undefined) {
        conditions.price.$lte = maxPrice;
      }
    }

    if (minSurface !== undefined) {
      conditions.surface = {};
      if (minSurface !== undefined) {
        conditions.surface.$gte = minSurface;
      }
    }

    if (selectedFeatures) {
      conditions.characteristics = { $in: selectedFeatures };
    }

    const properties = await realEstateProp
      .find(conditions)
      .sort({ timestamp: -1 });
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get properties." });
  }
};

const searchByRefName = async (req, res) => {
  const { propertyRef } = req.query;

  try {
    const conditions = {};
    if (propertyRef) {
      // Escape special regex characters and digits to ensure they are treated as literals
      const escapedPropertyRef = propertyRef.replace(
        /[-\/\\^$*+?.()[\]{}]/g,
        "\\$&"
      );
      // Use $or operator to check for either reference or name
      conditions.$or = [
        {
          reference: {
            $regex: new RegExp(escapedPropertyRef.toLowerCase(), "i"),
          },
        },
        {
          name: {
            $regex: new RegExp(escapedPropertyRef.toLowerCase(), "i"),
          },
        },
        // The 'i' flag in the regex makes the match case-insensitive
      ];
    }
    const properties = await realEstateProp
      .find(conditions)
      .sort({ timestamp: -1 });
    if (!properties) {
      return res.status(404).json({ message: "Aucun résultat trouvé." });
    }
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get properties." });
  }
};
const getLocation = async (req, res) => {
  try {
    const locations = await realEstateProp.distinct("location");

    if (locations && locations.length > 0) {
      return res.status(200).json(locations);
    } else {
      return res
        .status(404)
        .json({ message: "No locations found in the database." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
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
  getPropertyCategoryType,
  searchProperty,
  getLocation,
  searchByRefName,
};
