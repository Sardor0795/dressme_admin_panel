import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Root } from "./root";
import { BrowserRouter as Router } from "react-router-dom";
import { SellerContextProvider } from "./context/sellersContext";
import { ProductsContextProvider } from "./context/productsContext";
import { IdContextProvider } from "./context/idContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <SellerContextProvider>
        <ProductsContextProvider>
          <IdContextProvider>
            <Root />
          </IdContextProvider>
        </ProductsContextProvider>
      </SellerContextProvider>
    </Router>
  </React.StrictMode>
);
