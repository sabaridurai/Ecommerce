import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import adminStore from "./pages/admin/store/adminStore"; // ONLY if store exists here

createRoot(document.getElementById("root")).render(
  <Provider store={adminStore}>
    <App />
  </Provider>
);