import React from "react";
import { Navigate } from "react-router-dom";

const ForceRedirect = ({ user, children }) => {
  if (user?.isSuccess) {
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ForceRedirect;
