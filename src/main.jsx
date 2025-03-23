import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router"; // React Router Routes
import "./style.css"; // Style
import AuthProvider from "./provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} /> {/* Router Provider */}
    </AuthProvider>
  </StrictMode>
);
