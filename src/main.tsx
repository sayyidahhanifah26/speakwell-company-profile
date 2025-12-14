// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Provider Routing
import { Toaster } from "sonner";                 // Provider Toasting
import App from "./App";
import "./index.css";

// KODE HANYA BOOTSTRAPPING

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster richColors position="bottom-right" duration={3000} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);