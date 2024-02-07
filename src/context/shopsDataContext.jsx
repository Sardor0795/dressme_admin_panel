import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ShopsDataContext = createContext();

export const ShopsDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);

  const [dataShops, setDataShops] = useState([]);

  const url = "https://api.dressme.uz";

  let token = sessionStorage.getItem("token");

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  useEffect(() => {
    if (token) {
      axios(`${url}/api/admin/shops`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((d) => {
        console.log(d);
        setDataShops(d?.data?.sellers_shops);
        setLoader(false);
      });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/shops`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setDataShops(d?.data?.sellers_shops);
    });
  };

  return (
    <ShopsDataContext.Provider
      value={[dataShops, setDataShops, reFetch, loader, setLoader]}
    >
      {children}
    </ShopsDataContext.Provider>
  );
};
