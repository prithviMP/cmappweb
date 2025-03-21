import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DashboardWeb } from "./screens/DashboardWeb/DashboardWeb";

// Ensure the DOM is fully loaded before initialization
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("app");
  
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <BrowserRouter>
        <DashboardWeb />
      </BrowserRouter>
    </StrictMode>
  );
});