import axios from "axios";

const API_URL = process.env.REACT_APP_API_KEY;
const EMAIL_URL = process.env.REACT_APP_EMAIL_URL;

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

const getPropertyDetails = async (propIdName) => {
  try {
    const response = await axios.get(API_URL + "singleproperty/" + propIdName);
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
const searchProperty = async (searchData) => {
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
  } = searchData;

  try {
    const response = await axios.get(API_URL + "searchproperty/", {
      params: {
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
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const sendEmail = async (emailData) => {
  try {
    const response = await axios.post(EMAIL_URL, emailData);
    return response.data;
  } catch (err) {
    throw err;
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
  sendEmail,
};

export default proeprtyService;
