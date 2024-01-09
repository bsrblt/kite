import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./store/AuthContext";
import { LangContextProvider } from "../src/store/LangContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthContextProvider>
      <LangContextProvider>
        <App />
      </LangContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
