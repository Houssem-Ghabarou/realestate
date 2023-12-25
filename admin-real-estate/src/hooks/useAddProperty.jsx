import React, { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_KEY; // Ensure this points to your server's URL

export const useAddProperty = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addProperty = async (addPropData) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();

    // Append text fields to the FormData object
    Object.keys(addPropData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, addPropData[key]);
      }
    });

    // Append images to the FormData object

    for (let i = 0; i < addPropData.images.length; i++) {
      const file = addPropData.images[i];
      formData.append("images[]", file);
    }

    try {
      const response = await axios.post(`${apiUrl}/property`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    addProperty,
    isSuccess,
    error,
    isLoading,
  };
};
