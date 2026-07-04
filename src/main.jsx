import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { StudentProvider } from "./context/student/studentContext.jsx";
import { AppProvider } from "./context/app/appContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
);
