import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // provides routing to the whole app
import router from "./app/router"; // our centralized route definitions
import { AuthProvider } from "./context/AuthProvider"; // Path to the file we just optimized

// Global CSS files.
// Separate styles by concern.
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/pages.css";
import "./index.css";

// ReactDOM.createRoot connects React to the <div id="root"></div> in index.html.
// Everything in the app starts rendering from here.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 1. Wrap everything in AuthProvider first */}
    <AuthProvider>
      {/* 2. Now the Router can access useAuth() inside its components */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
