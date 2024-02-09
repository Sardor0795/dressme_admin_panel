import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ReFreshTokenContext } from "./reFreshToken";

export const ClothesDataContext = createContext();

export const ClothesDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);

  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const [data, setData] = useState([]);

  const url = "https://api.dressme.uz";

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  const getData = () => {
    axios(`${url}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((d) => {
      if (d?.status === 200) {
        setData(d?.data?.sellers_products?.data);
        setLoader(false);
      }
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((d) => {
          if (d?.status === 200) {
            setData(d?.data?.sellers_products?.data);
            setLoader(false);
          }
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
    axios(`${url}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
