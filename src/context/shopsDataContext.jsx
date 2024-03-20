/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { ReFreshTokenContext } from "./reFreshToken";

export const ShopsDataContext = createContext();

export const ShopsDataContextProvider = ({ children }) => {
  const [loaderShop, setLoaderShop] = useState(true);

  const [dataShops, setDataShops] = useState([]);

  // const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const url = "https://api.dressme.uz";

  setTimeout(() => {
    setLoaderShop(false);
  }, 2000);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/shops`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((d) => {
        setDataShops(d?.data);
        setLoaderShop(false);
      });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/shops`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((d) => {
      setDataShops(d?.data);
    });
  };
  return (
    <ShopsDataContext.Provider value={[dataShops, loaderShop, reFetch]}>
      {children}
    </ShopsDataContext.Provider>
  );
};
