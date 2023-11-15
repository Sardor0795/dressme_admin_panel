import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Root } from "./root";
import { BrowserRouter as Router } from "react-router-dom";
import { SellerContextProvider } from "./context/sellersContext";
import { ProductsContextProvider } from "./context/productsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <SellerContextProvider>
        <ProductsContextProvider>
          <Root />
        </ProductsContextProvider>
      </SellerContextProvider>
    </Router>
  </React.StrictMode>
);
