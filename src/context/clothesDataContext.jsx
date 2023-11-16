import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ClothesDataContext = createContext();

export const ClothesDataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const url = "https://api.dressme.uz";

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios(`${url}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.products);
    });
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.products);
    });
  };

  return (
    <ClothesDataContext.Provider value={[data, setData, reFetch]}>
      {children}
    </ClothesDataContext.Provider>
  );
};
