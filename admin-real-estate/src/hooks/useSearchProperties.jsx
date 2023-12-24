import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_API_KEY;
import axios from "axios";
export const useSearchProperties = () => {
  const [searchedProperties, setSearchedProperties] = useState([]);
  const [errorSearching, setErrorSearching] = useState(null);
  const [isLoadingSearching, setIsLoadingSearching] = useState(null);
  const [succesSearching, setSuccesSearching] = useState(false);
  const searchProperties = async (searchData) => {
    setSearchedProperties([]);
    setIsLoadingSearching(true);
    setErrorSearching(null);
    try {
      const response = await axios.get(`${apiUrl}/property/searchbyrefname`, {
        params: {
          propertyRef: searchData,
        },
      });

      if (response.status === 200) {
        setSuccesSearching(true);
        setSearchedProperties(response?.data);
        setIsLoadingSearching(false);
      }
    } catch (error) {
      setErrorSearching(error?.response?.data);
      setIsLoadingSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchedProperties([]);
    setSuccesSearching(false);
  };

  return {
    searchProperties,
    searchedProperties,
    resetSearch,
    errorSearching,
    succesSearching,
    isLoadingSearching,
  };
};
