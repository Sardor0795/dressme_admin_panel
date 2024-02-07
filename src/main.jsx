import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Root } from "./root";
import { BrowserRouter as Router } from "react-router-dom";
import { SellerContextProvider } from "./context/sellersContext";
import { ProductsContextProvider } from "./context/productsContext";
import { IdContextProvider } from "./context/idContext";
import { SellersDataContextProvider } from "./context/sellersDataContext";
import { ClothesDataContextProvider } from "./context/clothesDataContext";
import { LocationsDataContextProvider } from "./context/locationsDataContext";
import { ShopsDataContextProvider } from "./context/shopsDataContext";
import { ShopContextProvider } from "./context/shopsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <SellerContextProvider>
        <ShopContextProvider>
          <ProductsContextProvider>
          <IdContextProvider>
            <SellersDataContextProvider>
              <ClothesDataContextProvider>
                <ShopsDataContextProvider>
                  <LocationsDataContextProvider>
                    <Root />
                  </LocationsDataContextProvider>
                </ShopsDataContextProvider>
              </ClothesDataContextProvider>
            </SellersDataContextProvider>
          </IdContextProvider>
        </ProductsContextProvider>
      </ShopContextProvider>
      </SellerContextProvider>
    </Router>
  </React.StrictMode>
);
