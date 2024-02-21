/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ReFreshTokenContext } from "./reFreshToken";

export const SellersDataContext = createContext();

export const SellersDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);

  const [data, setData] = useState([]);

  const [reFreshTokenFunc, reFreshTokenFuncForContext] =
    useContext(ReFreshTokenContext);

  const url = "https://api.dressme.uz";

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/sellers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((d) => {
          setData(d?.data?.sellers);
          setLoader(false);
        })
        .catch((v) => {
          if (v?.response?.status === 401 || v?.response?.status === 403) {
            reFreshTokenFuncForContext();
          }
        });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/sellers`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
