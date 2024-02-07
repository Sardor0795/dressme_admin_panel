import { createContext, useState } from "react";

export const ShopsContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [showShops, setShowShops] = useState("pending");

  return (
    <ShopsContext.Provider value={[showShops, setShowShops]}>
      {children}
    </ShopsContext.Provider>
  );
};