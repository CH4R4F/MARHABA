import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));

rootElement.render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </React.StrictMode>
);
