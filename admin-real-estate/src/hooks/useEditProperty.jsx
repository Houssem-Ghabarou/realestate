import React, { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_KEY; // Ensure this points to your server's URL

export const useEditProperty = () => {
  const [isSuccessEditing, setIsSuccessEditing] = useState(false);
  const [errorEditing, setErrorEditing] = useState(null);
  const [isLoadingEditing, setIsLoadingEditing] = useState(false);

  const editProperty = async (editPropData, propId) => {
    setIsLoadingEditing(true);
    setErrorEditing(null);
    const formData = new FormData();

    // Append text fields to the FormData object
    Object.keys(editPropData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, editPropData[key]);
      }
    });

    // Append images to the FormData object

    for (let i = 0; i < editPropData.images.length; i++) {
      const file = editPropData.images[i];
      formData.append("images[]", file);
    }

    try {
      const response = await axios.put(
        `${apiUrl}/property/${propId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setIsSuccessEditing(true);
      }
    } catch (err) {
      setErrorEditing(err?.response?.data);
    } finally {
      setIsLoadingEditing(false);
    }
  };
  return {
    editProperty,
    isSuccessEditing,
    errorEditing,
    isLoadingEditing,
  };
};
