import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ClothesDataContext = createContext();

export const ClothesDataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const url = "https://api.dressme.uz";

  let token = localStorage.getItem("token");

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;
  let updatedCount = 0;

  data?.forEach((seller) => {
    seller?.shops?.forEach((shop) => {
      shop?.products?.forEach((product) => {
        if (product?.status === "pending") {
          ++waitingCount;
        } else if (product?.status === "approved") {
          ++allowedCount;
        } else if (product?.status === "declined") {
          ++notAllowedCount;
        }
      });
    });
  });

  let allCount = waitingCount + allowedCount + notAllowedCount;

  // filteredData?.forEach((v) => {
  //   if (v?.status_update === "1") {
  //     ++updatedCount;
  //   }
  // });

  useEffect(() => {
    axios(`${url}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.sellers_products?.data);
    });
  }, []);

  const reFetch = () => {
    axios(`${url}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.sellers_products?.data);
    });
  };

  return (
    <ClothesDataContext.Provider
      value={[
        data,
        setData,
        reFetch,
        waitingCount,
        allowedCount,
        notAllowedCount,
        allCount,
      ]}
    >
      {children}
    </ClothesDataContext.Provider>
  );
};
