import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//eslint-disable-next-line
import i18n from "./i18n"; //lazm menha
import ClipLoader from "react-spinners/ClipLoader";

const loading = (
  <div className="loader">
    <ClipLoader
      color={"#333"}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

ReactDOM.render(
  <Suspense fallback={loading}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
