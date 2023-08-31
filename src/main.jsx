import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Root } from "./root";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Root />
    </Router>
  </React.StrictMode>
);
