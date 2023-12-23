import { createContext, useReducer, useEffect, useMemo } from "react";
import { setAuth } from "../util/setAuth";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "CHECKING_AUTH":
      return { ...state, isAuthenticating: true };
    case "LOGIN":
      return { user: action.payload, isSuccess: true, isAuthenticating: false };
    case "LOGOUT":
      return { user: null, isSuccess: false, isAuthenticating: false };
    // Add a case to handle when auth check is completed with no user found
    case "AUTH_CHECK_COMPLETE":
      return { ...state, isAuthenticating: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isSuccess: false,
    isAuthenticating: true, // Start as true, so the app knows we're checking auth status
  });
  useEffect(() => {
    dispatch({ type: "CHECKING_AUTH" }); // Dispatch action to indicate we are starting an auth check

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("user");
    if (token) {
      setAuth(token);
    }
    if (username) {
      dispatch({ type: "LOGIN", payload: username });
    } else {
      dispatch({ type: "AUTH_CHECK_COMPLETE" }); // Run when there is no user found after the check
    }
  }, []);

  const contextValue = useMemo(() => {
    return { ...state, dispatch };
  }, [state, dispatch]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
