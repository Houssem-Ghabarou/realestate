import { createContext, useReducer, useEffect } from "react";
import { setAuth } from "../util/setAuth";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isSuccess: true };

    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isSuccess: false,
  });

  useEffect(() => {
    const username = localStorage.getItem("username");

    const token = localStorage.getItem("user");
    if (token) {
      setAuth(token);
    }
    if (username) {
      dispatch({ type: "LOGIN", payload: username });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
