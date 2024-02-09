import axios from "axios";
import { createContext, useEffect } from "react";

export const ReFreshTokenContext = createContext();

export const ReFreshTokenContextProvider = ({ children }) => {
  const url = "https://api.dressme.uz";

  const reFreshToken = sessionStorage.getItem("reFreshToken");

  const reFreshTokenFunc = async () => {
    if (reFreshToken) {
      try {
        const data = await axios.post(`${url}/api/admin/refresh-token`, {
          refresh_token: reFreshToken,
        });

        if (data.status === 200) {
          sessionStorage.setItem("token", data?.data?.access_token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      reFreshTokenFunc();
    }, 2 * 59 * 60 * 1000);
    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ReFreshTokenContext.Provider value={[reFreshTokenFunc]}>
      {children}
    </ReFreshTokenContext.Provider>
  );
};
