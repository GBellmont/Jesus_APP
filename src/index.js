import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalLoaderProvider, GlobalUserProvider } from "./core/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Deixado caso queiram acionar o ReactStrictMode
  //  <React.StrictMode>
  <GlobalLoaderProvider>
    <GlobalUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalUserProvider>
  </GlobalLoaderProvider>
  //  </React.StrictMode>
);
