import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const SellersDataContext = createContext();

export const SellersDataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const url = "https://api.dressme.uz";

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios(`${url}/api/admin/sellers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d.data.sellers.data);
    });
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/sellers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d.data.sellers.data);
    });
  };

  return (
    <SellersDataContext.Provider value={[data, setData, reFetch]}>
      {children}
    </SellersDataContext.Provider>
  );
};
