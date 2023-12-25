import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const MoonLoaderSpinner = ({ type }) => {
  return (
    <div className={`${type === 1 ? "moon-loader" : ""}`}>
      <MoonLoader color='rgba(211, 148, 33, 0.78)' size={40} />
    </div>
  );
};

export default MoonLoaderSpinner;
