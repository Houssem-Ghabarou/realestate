import React from "react";
import MoonLoaderSpinner from "./MoonLoaderSpinner";
const WaitingImagesLoad = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>
        Veuillez patienter pendant que les images sont chargées pour l'édition
        du bien.
      </h1>
      <MoonLoaderSpinner type={1} />
    </div>
  );
};

export default WaitingImagesLoad;
