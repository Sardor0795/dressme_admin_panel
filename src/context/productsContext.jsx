import { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [showProducts, setShowProducts] = useState("pending");

  return (
    <ProductsContext.Provider value={[showProducts, setShowProducts]}>
      {children}
    </ProductsContext.Provider>
  );
};
