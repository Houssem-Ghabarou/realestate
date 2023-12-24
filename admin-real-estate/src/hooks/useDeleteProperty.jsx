import React, { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_KEY; // Ensure this points to your server's URL

export const useDeleteProperty = () => {
  const [isSuccessDeleting, setIsSuccessDeleting] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const [isLoadingDeleting, setIsLoadingDeleting] = useState(false);

  const deleteProperty = async (propId) => {
    setIsLoadingDeleting(true);
    setErrorDeleting(null);

    try {
      const response = await axios.delete(`${apiUrl}/property/${propId}`);

      if (response.status === 200) {
        setIsSuccessDeleting(true);
      }
    } catch (err) {
      setErrorDeleting(err?.response?.data);
    } finally {
      setIsLoadingDeleting(false);
    }
  };
  return {
    deleteProperty,
    isSuccessDeleting,
    errorDeleting,
    isLoadingDeleting,
  };
};
