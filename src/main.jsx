import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { ExpandedProvider } from "./contexts/ExpandedContext.jsx";
import { SelectedProvider } from "./contexts/SelectedContext.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";
import { SensorsProvider } from "./contexts/SensorsContext.jsx";
import { AdminProvider } from "./contexts/AdminContext.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <ExpandedProvider>
        <SelectedProvider>
          <SensorsProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </SensorsProvider>
        </SelectedProvider>
      </ExpandedProvider>
    </DataProvider>
  </StrictMode>,
);
