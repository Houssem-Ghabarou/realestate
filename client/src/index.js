import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
// eslint-disable-next-line
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
