import axios from "axios";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_KEY;


const getAllProperties = async () => {
  try {
    const response = await axios.get(API_URL);
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
const proeprtyService = {
  getAllProperties,
  getAllvente,
  getAlllocation,
  getPropertyDetails,
};

export default proeprtyService;
