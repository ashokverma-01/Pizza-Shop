import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppState } from "./Context/AppState.jsx";
import "./index.css";
import logo from "../assets/logo.jpg"; // <- tumhara favicon

const Root = () => {
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']");
    if (link) link.href = logo;
  }, []);

  return (
    <AppState>
      <App />
    </AppState>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
