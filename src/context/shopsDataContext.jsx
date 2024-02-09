/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ReFreshTokenContext } from "./reFreshToken";

export const ShopsDataContext = createContext();

export const ShopsDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);

  const [dataShops, setDataShops] = useState([]);

  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const url = "https://api.dressme.uz";

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  const getData = () => {
    axios(`${url}/api/admin/shops`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((d) => {
      setDataShops(d?.data?.sellers_shops);
      setLoader(false);
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/shops`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((d) => {
          setDataShops(d?.data?.sellers_shops);
          setLoader(false);
        })
        .catch((v) => {
          if (v?.response?.status === 401) {
            reFreshTokenFunc();
            getData();
          }
        });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/shops`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
