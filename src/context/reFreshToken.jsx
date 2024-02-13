import axios from "axios";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ReFreshTokenContext = createContext();

export const ReFreshTokenContextProvider = ({ children }) => {
  const url = "https://api.dressme.uz";

  const navigate = useNavigate();

  const reFreshTokenFunc = async () => {
    if (sessionStorage.getItem("reFreshToken")) {
      try {
        const data = await axios.post(`${url}/api/admin/refresh-token`, {
          refresh_token: sessionStorage.getItem("reFreshToken"),
        });

        if (data?.status === 200) {
          sessionStorage.setItem("token", data?.data?.access_token);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/signin");
          window.location.reload();
        }
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      reFreshTokenFunc();
    }, 2 * 59 * 60 * 1000);
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