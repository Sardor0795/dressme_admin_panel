import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ReFreshTokenContext } from "./reFreshToken";

export const LocationsDataContext = createContext();

export const LocationsDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);

  const [data, setData] = useState([]);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const url = "https://api.dressme.uz";

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  const getData = () => {
    axios(`${url}/api/admin/locations`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((d) => {
      setData(d?.data?.sellers_locations);
      setLoader(false);
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/locations`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((d) => {
          setData(d?.data?.sellers_locations);
          setLoader(false);
        })
        .catch((v) => {
          if (v?.response?.status === 401 || v?.response?.status === 403) {
            reFreshTokenFunc();
            getData();
          }
        });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/locations`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((d) => {
      setData(d?.data?.sellers_locations);
    });
  };

  return (
    <LocationsDataContext.Provider
      value={[data, setData, reFetch, loader, setLoader]}
    >
      {children}
    </LocationsDataContext.Provider>
  );
};
