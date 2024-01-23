import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const SellersDataContext = createContext();

export const SellersDataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const [loader, setLoader] = useState(false);

  const url = "https://api.dressme.uz";

  let token = sessionStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    if (token) {
      axios(`${url}/api/admin/sellers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((d) => {
        setData(d?.data?.sellers);
        setLoader(true);
      });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/sellers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.sellers);
    });
  };

  return (
    <SellersDataContext.Provider value={[data, setData, reFetch, loader]}>
      {children}
    </SellersDataContext.Provider>
  );
};
