import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MoonLoaderSpinner from "./MoonLoaderSpinner";
const PrivateRouter = ({ children }) => {
  const { isSuccess, isAuthenticating } = useContext(AuthContext);

  // While authenticating, you might want to render a loader or simply null
  if (isAuthenticating) {
    return <MoonLoaderSpinner type={1} />; // Or return null;
  }
  if (!isSuccess) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default PrivateRouter;
