import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App";
import { AuthProvider } from "./services/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </React.StrictMode>
);
