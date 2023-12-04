import axios from "axios";

const API_URL = process.env.REACT_APP_API_KEY;

const getLastSixProperties = async () => {
  try {
    const response = await axios.get(API_URL + "lastsixprop");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLastSixVenteProperties = async () => {
  try {
    const response = await axios.get(API_URL + "lastsixventeprop");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLastSixLocationProperties = async () => {
  try {
    const response = await axios.get(API_URL + "lastsixlocationprop");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getAllvente = async () => {
  try {
    const response = await axios.get(API_URL + "vente");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getAlllocation = async () => {
  try {
    const response = await axios.get(API_URL + "location");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getPropertyDetails = async (propId) => {
  try {
    const response = await axios.get(API_URL + "singleproperty/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLocalisation = async () => {
  try {
    const response = await axios.get(API_URL + "localisation");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getPropByCategoryType = async (category, type) => {
  try {
    const response = await axios.get(
      API_URL + category + "/categorytype/" + type
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const searchProperty = async (
  category,
  propertyRef,

  propertyType,
  minPrice,
  maxPrice,
  minSurface,
  maxSurface
) => {
  try {
    const response = await axios.get(API_URL + "searchproperty/", {
      params: {
        category,
        propertyRef,

        propertyType,
        minPrice,
        maxPrice,
        minSurface,
        maxSurface,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const proeprtyService = {
  getLastSixProperties,
  getAllvente,
  getAlllocation,
  getPropertyDetails,
  getLastSixVenteProperties,
  getLastSixLocationProperties,
  getPropByCategoryType,
  searchProperty,
  getLocalisation,
};

export default proeprtyService;
