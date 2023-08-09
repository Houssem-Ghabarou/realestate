import axios from "axios";

const API_URL = "http://localhost:3001/property";

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
    const response = await axios.get(API_URL + "/vente");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getAlllocation = async () => {
  try {
    const response = await axios.get(API_URL + "/location");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const proeprtyService = {
  getAllProperties,
  getAllvente,
  getAlllocation,
};

export default proeprtyService;
