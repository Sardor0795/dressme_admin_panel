/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { ReFreshTokenContext } from "./reFreshToken";

export const ShopsDataContext = createContext();

export const ShopsDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);

  const [dataShops, setDataShops] = useState([]);

  // const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const url = "https://api.dressme.uz";

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/shops`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((d) => {
        setDataShops(d?.data);
        setLoader(false);
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
    <ShopsDataContext.Provider
      value={[dataShops, setDataShops, reFetch, loader, setLoader]}
    >
      {children}
    </ShopsDataContext.Provider>
  );
};
