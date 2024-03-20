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

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((d) => {
        if (d?.status === 200) {
          setData(d?.data);
          setLoader(false);
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
      setData(d?.data);
    });
  };

  return (
    <ClothesDataContext.Provider
      value={[data, loader, reFetch]}
    >
      {children}
    </ClothesDataContext.Provider>
  );
};
