import { createContext, useState } from "react";

export const SellersContext = createContext();

export const SellerContextProvider = ({ children }) => {
  const [showSellers, setShowSellers] = useState("pending");

  return (
    <SellersContext.Provider value={[showSellers, setShowSellers]}>
      {children}
    </SellersContext.Provider>
  );
};
