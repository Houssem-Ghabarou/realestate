import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { setAuth } from "../util/setAuth";
const apiUrl = import.meta.env.VITE_API_KEY;
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/admin/loginadmin`, {
        username,
        password,
      });
      if (response) {
        // save the user to local storage
        // Store token
        let token = response?.data?.token;
        localStorage.setItem("user", token);
        setAuth(token);

        // Store username
        let username = response?.data?.username;
        localStorage.setItem("username", username);

        // update the auth context
        dispatch({ type: "LOGIN", payload: response?.data?.username });

        // update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error?.response?.data);
    }
  };

  return { login, isLoading, error };
};
