import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_KEY;
import axios from "axios";
export const useProperty = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getAllProperties = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/property`);

      if (response) {
        setPropertyData(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error?.response?.data);
      setIsLoading(false);
    }
  };
  return {
    getAllProperties,
    propertyData,
    error,
    isLoading,
  };
};
