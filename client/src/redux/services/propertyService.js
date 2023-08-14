import axios from "axios";
// require("dotenv").config();

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
    const response = await axios.get(API_URL + "lastsixventeprop");
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

const getVenteMaison = async (propId) => {
  try {
    const response = await axios.get(API_URL + "ventemaison/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getVenteAppartement = async (propId) => {
  try {
    const response = await axios.get(API_URL + "venteappartement/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getVenteImmeuble = async (propId) => {
  try {
    const response = await axios.get(API_URL + "venteimmeuble/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getVenteTerrain = async (propId) => {
  try {
    const response = await axios.get(API_URL + "venteterrain/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getVenteBureau = async (propId) => {
  try {
    const response = await axios.get(API_URL + "ventebueau/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getVenteCommercial = async (propId) => {
  try {
    const response = await axios.get(API_URL + "ventecommercial/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLocationMaison = async (propId) => {
  try {
    const response = await axios.get(API_URL + "locationmaison/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLocationAppartement = async (propId) => {
  try {
    const response = await axios.get(API_URL + "locationappartement/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLocationBureau = async (propId) => {
  try {
    const response = await axios.get(API_URL + "locationbureau/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLocationCommercial = async (propId) => {
  try {
    const response = await axios.get(API_URL + "locationcommercial/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLocationImmeuble = async (propId) => {
  try {
    const response = await axios.get(API_URL + "locationimmeuble/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLocationVilla = async (propId) => {
  try {
    const response = await axios.get(API_URL + "locationVilla/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getLocationTerrain = async (propId) => {
  try {
    const response = await axios.get(API_URL + "locationterrain/" + propId);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const proeprtyService = {
  getLastSixProperties,
  getAllvente,
  getAlllocation,
  getPropertyDetails,
  getLastSixVenteProperties,
  getLastSixLocationProperties,
  getVenteMaison,
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

export default proeprtyService;
