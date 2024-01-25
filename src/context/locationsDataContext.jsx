import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LocationsDataContext = createContext();

export const LocationsDataContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);

  const [data, setData] = useState([]);

  const url = "https://api.dressme.uz";

  let token = sessionStorage.getItem("token");

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  useEffect(() => {
    if (token) {
      axios(`${url}/api/admin/locations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((d) => {
        setData(d?.data?.sellers_locations);
        setLoader(false);
      });
    }
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/locations`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
