import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const SellersDataContext = createContext();

export const SellersDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);

  const [data, setData] = useState([]);

  const url = "https://api.dressme.uz";

  let token = sessionStorage.getItem("token");

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
    <SellersDataContext.Provider
      value={[data, setData, reFetch, loader, setLoader]}
    >
      {children}
    </SellersDataContext.Provider>
  );
};
