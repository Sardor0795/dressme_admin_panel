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

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/locations`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((d) => {
        setData(d?.data);
        setLoader(false);
      });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/locations`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((d) => {
      setData(d?.data);
    });
  };

  return (
    <LocationsDataContext.Provider
      value={[data, loader ]}
    >
      {children}
    </LocationsDataContext.Provider>
  );
};
