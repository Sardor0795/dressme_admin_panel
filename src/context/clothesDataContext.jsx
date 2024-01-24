import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ClothesDataContext = createContext();

export const ClothesDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);

  const [data, setData] = useState([]);

  const url = "https://api.dressme.uz";

  let token = sessionStorage.getItem("token");

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  useEffect(() => {
    if (token) {
      axios(`${url}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((d) => {
        setData(d?.data?.sellers_products?.data);
        setLoader(false);
      });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.sellers_products?.data);
    });
  };

  return (
    <ClothesDataContext.Provider
      value={[data, setData, reFetch, loader, setLoader]}
    >
      {children}
    </ClothesDataContext.Provider>
  );
};
