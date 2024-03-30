import { useContext, useEffect, useState } from "react";
import CancelModal from "./ModalCancel";
import ClothesItem from "./clothesItem/clothestem";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WiFiLoader from "../../../assets/loader/wifi_loader.gif";

import {
  AllowedIcon,
  BackIcon,
  CheckIcon,
  EditedIcon,
  NotAllowedIcon,
  SearchIcon,
  WaitingForAllowIcon,
} from "../../../assets/icon";
import { PhoneNavbar } from "../../phoneNavbar";
import { ClothesDataContext } from "../../../context/clothesDataContext";
import { SellersContext } from "../../../context/sellersContext";
import { ReFreshTokenContext } from "../../../context/reFreshToken";
import { IdsContext } from "../../../context/idContext";
import axios from "axios";

export default function ClothesList() {
  const url = "https://api.dressme.uz";
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData, , loader] = useContext(ClothesDataContext);

  const [, , reFetch] = useContext(ClothesDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const [, setId] = useContext(IdsContext);

  let newData = data;

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(newData);
  }, [newData]);

  const filterFunc = (e) => {
    const filtered = data?.map((seller) => {
      const filteredShops = seller?.shops?.map((shop) => {
        const filteredProducts = shop?.products?.filter((product) => {
          return product?.name_ru
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });

        return { ...shop, products: filteredProducts };
      });

      return { ...seller, shops: filteredShops };
    });

    setFilteredData(filtered);
  };

  // // Count items -----------

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;
  let updatedCount = 0;

  filteredData?.forEach((seller) => {
    seller?.shops?.forEach((shop) => {
      shop?.products?.forEach((product) => {
        if (product?.status === "pending") {
          ++waitingCount;
        } else if (product?.status === "approved") {
          ++allowedCount;
        } else if (product?.status === "declined") {
          ++notAllowedCount;
        } else if (product?.status === "updated") {
          ++updatedCount;
        }
      });
    });
  });

  let allCount = waitingCount + allowedCount + notAllowedCount + updatedCount;

  // // -----------------

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // Products Context
  const [showSellers, setShowSellers] = useContext(SellersContext);

  let dataCount = 0;
  if (showSellers === "pending") {
    dataCount = waitingCount;
  } else if (showSellers === "approved") {
    dataCount = allowedCount;
  } else if (showSellers === "declined") {
    dataCount = notAllowedCount;
  } else if (showSellers === "updated") {
    dataCount = updatedCount;
  }

  // up btn

  useEffect(() => {
    let upBtn = document.querySelector("#upBtn");

    upBtn.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });

    window.addEventListener("scroll", () => {
      let scrollTop = window.scrollY;

      if (scrollTop > 80) {
        upBtn.style.display = "flex";
      } else {
        upBtn.style.display = "none";
      }
    });
  }, []);

  // Select all -----------------

  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const [massiveCheckeds, setMassiveCheckeds] = useState([]);
  const [checkedShops, setCheckedShops] = useState([]);

  const shopIdCheck = (id) => {
    const idString = id.toString();

    const productIDs = filteredData
      ?.flatMap((seller) => {
        return seller?.shops?.flatMap((shop) => {
          // Filter products by shop_id
          const filteredProducts = shop?.products.filter((product) => {
            // Convert shop_id to string for comparison
            return product?.shop_id === idString;
          });

          // Extract product IDs if shop_id matches
          const matchingProductIDs = filteredProducts?.map((product) => {
            // Convert product ID to number
            return parseInt(product?.id);
          });

          return matchingProductIDs;
        });
      })
      .flat(); // Flatten the array of arrays

    // Set the array of product IDs
    setMassiveCheckeds([...massiveCheckeds, ...productIDs]);
  };

  const delCheck = (id) => {
    const idString = id.toString();

    const productIDs = filteredData
      ?.flatMap((seller) => {
        return seller?.shops?.flatMap((shop) => {
          // Filter products by shop_id
          const filteredProducts = shop?.products?.filter((product) => {
            // Convert shop_id to string for comparison
            return product?.shop_id === idString;
          });

          // Extract product IDs if shop_id matches
          const matchingProductIDs = filteredProducts?.map((product) => {
            // Convert product ID to number
            return parseInt(product?.id);
          });

          return matchingProductIDs;
        });
      })
      .flat(); // Flatten the array of arrays

    // Set the array of product IDs

    const filteredArray = massiveCheckeds.filter(
      (num) => !productIDs.includes(num)
    );

    setMassiveCheckeds([...filteredArray]);
  };

  const selectAllIds = () => {
    const result = filteredData?.reduce(
      (acc, seller) => {
        seller?.shops?.forEach((shop) => {
          acc?.productIDs?.push(
            ...shop?.products
              .filter((product) => product?.status === showSellers)
              .map((product) => parseInt(product?.id))
          );
          acc?.shopIDs?.push(parseInt(shop?.id));
        });
        return acc;
      },
      { productIDs: [], shopIDs: [] }
    );

    // Set the arrays
    setMassiveCheckeds([...result?.productIDs]);
    setCheckedShops([...result?.shopIDs]);
  };

  useEffect(() => {
    if (allChecked) {
      selectAllIds();
    } else {
      setCheckedShops([]);
      setMassiveCheckeds([]);
    }
  }, [allChecked, showSellers]);

  const allApproveFunc = () => {
    let formData = new FormData();
    formData.append("status", "approved");
    if (massiveCheckeds) {
      massiveCheckeds.forEach((id) => {
        formData.append("ids[]", id);
      });
    }

    axios
      .post(`${url}/api/admin/massive-approve-products`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((d) => {
        if (d.status === 200) {
          toast.success(d?.data?.message);
          reFetch();
        }
      })
      .catch((v) => {
        if (v?.response?.status === 401 || v?.response?.status === 403) {
          reFreshTokenFunc();
          allApproveFunc();
        }
      });
  };

  return (
    <div>
      <div className="fixed md:static bg-white w-full top-0 px-4 md:mb-[15px] left-0 right-0 md:border-b py-[18px] flex items-center justify-between">
        <div className="block md:hidden w-full">
          <PhoneNavbar filterFuncCloThes={filterFunc} />
        </div>

        {showSellers === "pending" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Ожидающие товары
          </div>
        ) : null}
        {showSellers === "approved" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Одобренные товары
          </div>
        ) : null}
        {showSellers === "declined" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Отказанные товары
          </div>
        ) : null}
        {showSellers === "updated" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Обновленные товары
          </div>
        ) : null}

        <label className="overflow-hidden px-[13px] relative w-full max-w-[400px] hidden md:flex items-center border border-searchBgColor rounded-lg ">
          <input
            className="text-[13px] md:text-base outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
            type="email"
            placeholder="Поиск"
            required
            inputMode="search"
            onChange={(e) => filterFunc(e)}
          />
          <button className="bg-[#F7F7F7] h-full w-[50px] rounded-r-lg flex items-center justify-center absolute top-0 right-0 active:scale-90">
            <SearchIcon />
          </button>
        </label>
      </div>

      <div className="w-full mt-[72px] md:mt-4 pb-2">
        <div className="flex items-center justify-between gap-x-1 mb-[25px] md:mb-[0]">
          <div className="flex gap-x-1">
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
              Общее количество:
            </span>
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
              {allCount}
            </span>
          </div>

          {/* Выбранные */}
          <div className="hidden w-full md:w-fit md:flex items-center gap-x-[30px] border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
            <span className=" font-AeonikProMedium text-[13px] ls:text-[13px] ll:text-[13px] md:text-lg text-mobileTextColor">
              Выбранные:
            </span>
            <div className="flex items-center">
              {showSellers === "pending" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        allApproveFunc();
                      }
                    }}
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#12C724]"
                        : "text-[#12c7245e] cursor-not-allowed"
                    }`}
                    type="button"
                  >
                    Одобрить
                  </button>
                  <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        setId({ type: "massive", id: massiveCheckeds });
                        setModalOpen(true);
                      }
                    }}
                    type="button"
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#E51515]"
                        : "text-[#85444485] cursor-not-allowed"
                    }`}
                  >
                    Отказать
                  </button>
                </div>
              ) : null}
              {showSellers === "approved" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        setId({ type: "massive", id: massiveCheckeds });
                        setModalOpen(true);
                      }
                    }}
                    type="button"
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#E51515]"
                        : "text-[#85444485] cursor-not-allowed"
                    }`}
                  >
                    Отказать
                  </button>
                </div>
              ) : null}
              {showSellers === "declined" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        allApproveFunc();
                      }
                    }}
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#12C724]"
                        : "text-[#12c7245e] cursor-not-allowed"
                    }`}
                    type="button"
                  >
                    Одобрить
                  </button>
                </div>
              ) : null}
              {showSellers === "updated" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        allApproveFunc();
                      }
                    }}
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#12C724]"
                        : "text-[#12c7245e] cursor-not-allowed"
                    }`}
                    type="button"
                  >
                    Одобрить
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex mb-[24px] md:hidden select-none">
          <div
            onClick={() => {
              setAllChecked(false);
              setShowSellers("pending");
            }}
            className={`${
              showSellers === "pending"
                ? "text-[#007DCA] border-[#007DCA]"
                : "text-[#303030] border-[#F2F2F2]"
            } border-b pb-[12px] text-center text-[13px] ll:text-[13px] px-[2x] cursor-pointer font-AeonikProRegular`}
          >
            <div className="mb-[3px]">Ожидающие товары</div>{" "}
            <div>({waitingCount})</div>
          </div>
          <div
            onClick={() => {
              setAllChecked(false);
              setShowSellers("approved");
            }}
            className={`${
              showSellers === "approved"
                ? "text-[#007DCA] border-[#007DCA]"
                : "text-[#303030] border-[#F2F2F2]"
            } border-b pb-[12px] text-center text-[13px] ll:text-[13px] px-[2x] cursor-pointer font-AeonikProRegular`}
          >
            <div className="mb-[3px]">Одобренные товары</div>{" "}
            <div>({allowedCount})</div>
          </div>
          <div
            onClick={() => {
              setAllChecked(false);
              setShowSellers("declined");
            }}
            className={`${
              showSellers === "declined"
                ? "text-[#007DCA] border-[#007DCA]"
                : "text-[#303030] border-[#F2F2F2]"
            } border-b pb-[12px] text-center text-[13px] ll:text-[13px] px-[2x] cursor-pointer font-AeonikProRegular`}
          >
            <div className="mb-[3px]">Отказанные товары</div>{" "}
            <div>({notAllowedCount})</div>
          </div>
          <div
            onClick={() => {
              setAllChecked(false);
              setShowSellers("updated");
            }}
            className={`${
              showSellers === "updated"
                ? "text-[#007DCA] border-[#007DCA]"
                : "text-[#303030] border-[#F2F2F2]"
            } border-b pb-[12px] text-center text-[13px] ll:text-[13px] px-[2x] cursor-pointer font-AeonikProRegular`}
          >
            <div className="mb-[3px]">Обновленные товары</div>{" "}
            <div>({updatedCount})</div>
          </div>
        </div>

        {dataCount > 0 ? (
          <div
            className={`flex md:hidden mb-[18px] items-center justify-end gap-x-1`}
          >
            <div
              onClick={() => {
                // onCheck(checkIndicator);
                setAllChecked(!allChecked);
              }}
              className="select-none cursor-pointer flex md:hidden items-center text-[13px] font-AeonikProMedium text-[#303030]"
            >
              Выбрать все
              <div
                className={`ml-[8px] cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
                  allChecked
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } flex items-center justify-center rounded`}
              >
                <span
                  className={`${
                    allChecked ? "flex items-center justify-center" : "hidden"
                  }`}
                >
                  <CheckIcon size={"small"} />
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {dataCount > 0 ? (
          <div
            className={` flex w-full md:hidden items-center justify-between pb-[24px]`}
          >
            <div className=" font-AeonikProMedium text-[13px] ll:text-[13px] md:text-lg text-mobileTextColor">
              Выбранные:
            </div>
            <div className="flex items-center">
              {showSellers === "pending" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        allApproveFunc();
                      }
                    }}
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#12C724]"
                        : "text-[#12c7245e] cursor-not-allowed"
                    }`}
                    type="button"
                  >
                    Одобрить
                  </button>
                  <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        setId({ type: "massive", id: massiveCheckeds });
                        setModalOpen(true);
                      }
                    }}
                    type="button"
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#E51515]"
                        : "text-[#85444485] cursor-not-allowed"
                    }`}
                  >
                    Отказать
                  </button>
                </div>
              ) : null}
              {showSellers === "approved" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        setId({ type: "massive", id: massiveCheckeds });
                        setModalOpen(true);
                      }
                    }}
                    type="button"
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#E51515]"
                        : "text-[#85444485] cursor-not-allowed"
                    }`}
                  >
                    Отказать
                  </button>
                </div>
              ) : null}
              {showSellers === "declined" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        allApproveFunc();
                      }
                    }}
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#12C724]"
                        : "text-[#12c7245e] cursor-not-allowed"
                    }`}
                    type="button"
                  >
                    Одобрить
                  </button>
                </div>
              ) : null}
              {showSellers === "updated" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => {
                      if (massiveCheckeds?.length > 0) {
                        allApproveFunc();
                      }
                    }}
                    className={`text-[13px] md:text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? "text-[#12C724]"
                        : "text-[#12c7245e] cursor-not-allowed"
                    }`}
                    type="button"
                  >
                    Одобрить
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="select-none mt-4 hidden md:flex justify-end items-center md:justify-between mx-auto pb-6">
          <section className="flex items-center w-fit bg-LocationSelectBg rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setAllChecked(false);
                setShowSellers("pending");
              }}
              className={`${
                showSellers === "pending"
                  ? "text-weatherWinterColor border-[1.5px]"
                  : "text[#303030]"
              }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
            >
              <span className="mr-[5px]">
                <WaitingForAllowIcon />
              </span>
              <span>Ожидающие товары ({waitingCount})</span>
            </button>
            <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
            <button
              type="button"
              onClick={() => {
                setAllChecked(false);
                setShowSellers("approved");
              }}
              className={`${
                showSellers === "approved"
                  ? "text-weatherWinterColor border-[1.5px]"
                  : "text[#303030]"
              }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
            >
              <span className="mr-[5px]">
                <AllowedIcon />
              </span>
              <span>Одобренные товары ({allowedCount})</span>
            </button>
            <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
            <button
              type="button"
              onClick={() => {
                setAllChecked(false);
                setShowSellers("declined");
              }}
              className={`${
                showSellers === "declined"
                  ? "text-weatherWinterColor border-[1.5px]"
                  : "text[#303030]"
              }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
            >
              <span className="mr-[5px]">
                <NotAllowedIcon />
              </span>
              <span>Отказанные товары ({notAllowedCount})</span>
            </button>
            <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
            <button
              type="button"
              onClick={() => {
                setAllChecked(false);
                setShowSellers("updated");
              }}
              className={`${
                showSellers === "updated"
                  ? "text-weatherWinterColor border-[1.5px]"
                  : "text[#303030]"
              }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
            >
              <span className="mr-[5px]">
                <EditedIcon />
              </span>
              <span>Обновленные товары ({updatedCount})</span>
            </button>
          </section>

          <div
            onClick={() => {
              // onCheck(checkIndicator);
              setAllChecked(!allChecked);
            }}
            className="hidden md:flex items-center text-[16px] cursor-pointer select-none font-AeonikProMedium"
          >
            Выбрать все
            <div
              className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                allChecked
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
              } hidden md:flex items-center justify-center rounded ml-[10px]`}
            >
              <span
                className={`${
                  allChecked ? "flex items-center justify-center" : "hidden"
                }`}
              >
                <CheckIcon />
              </span>
            </div>
          </div>
        </div>

        {dataCount ? (
          filteredData?.map((item) => {
            return (
              <div className="w-full" key={item?.id}>
                <div className="mx-auto font-AeonikProRegular text-[16px]">
                  <div className="w-full ">
                    {/* Status Waiting */}

                    {showSellers === "pending"
                      ? item?.shops?.map((item_2) => {
                          let index = 0;
                          let productLength = 0;
                          item_2?.products?.forEach((v) => {
                            if (v?.status === "pending") {
                              ++productLength;
                            }
                          });
                          return (
                            <div key={item_2?.id}>
                              {item_2?.products?.length ? (
                                <div className="w-full">
                                  <div className="">
                                    {item_2?.products?.map((item_3) => {
                                      if (item_3?.status === "pending") {
                                        ++index;
                                      }

                                      return (
                                        <div key={item_3?.id}>
                                          {item_3?.status === "pending" ? (
                                            <div className="mb-8">
                                              {index === 1 ? (
                                                <div className="w-ful">
                                                  <div className="flex items-center justify-between mb-1 md:mb-7 font-AeonikProMedium text-[16px]">
                                                    <div className="text-[20px] md:text-[24px] w-full font-AeonikProMedium flex items-center flex-wrap">
                                                      <div
                                                        className="flex w-full md:w-fit items-center cursor-pointer"
                                                        onClick={() => {
                                                          if (
                                                            checkedShops?.includes(
                                                              item_2?.id
                                                            )
                                                          ) {
                                                            setCheckedShops(
                                                              (prevState) =>
                                                                prevState.filter(
                                                                  (id) =>
                                                                    id !==
                                                                    item_2?.id
                                                                )
                                                            );
                                                            delCheck(
                                                              item_2?.id
                                                            );
                                                          } else {
                                                            setCheckedShops([
                                                              ...checkedShops,
                                                              item_2?.id,
                                                            ]);

                                                            shopIdCheck(
                                                              item_2?.id
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        <div
                                                          className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                                                            checkedShops?.includes(
                                                              item_2?.id
                                                            )
                                                              ? "bg-[#007DCA] border-[#007DCA]"
                                                              : "bg-white border-checkboxBorder"
                                                          } flex items-center justify-center rounded mr-[8px]`}
                                                        >
                                                          <span
                                                            className={`${
                                                              checkedShops?.includes(
                                                                item_2?.id
                                                              )
                                                                ? "hidden md:flex items-center justify-center"
                                                                : "hidden"
                                                            }`}
                                                          >
                                                            <CheckIcon />
                                                          </span>
                                                          <span
                                                            className={`${
                                                              checkedShops?.includes(
                                                                item_2?.id
                                                              )
                                                                ? "flex md:hidden items-center justify-center"
                                                                : "hidden"
                                                            }`}
                                                          >
                                                            <CheckIcon
                                                              size={"small"}
                                                            />
                                                          </span>
                                                        </div>
                                                        <button className="text-[#007DCA] md:mr-[7px]">
                                                          {item?.name}
                                                          {" " + item?.surname}
                                                        </button>
                                                      </div>
                                                      <div className="flex text-[16px] md:text-[24px] text-center pl-[26px] md:pl-0 items-center mt-[10px] md:mt-0">
                                                        <span className="hidden md:inline-block">
                                                          -
                                                        </span>
                                                        <div className="break-all pr-2 md:px-2">
                                                          {item_2?.name}
                                                        </div>
                                                        ({productLength})
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="mb-[10px] flex items-center text-tableTextTitle">
                                                    <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>
                                                    <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                                                      <div className="w-[3%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        No:
                                                      </div>
                                                      <div className="w-[9%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Фото
                                                      </div>
                                                      <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Название
                                                      </div>
                                                      <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Артикул
                                                      </div>
                                                      <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Тип
                                                      </div>
                                                      <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Дата
                                                      </div>
                                                      <div className="w-[31%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Цена
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : null}

                                              <ClothesItem
                                                data={item_3}
                                                key={item_3?.id}
                                                index={index}
                                                setModalOpen={setModalOpen}
                                                toast={toast}
                                                showSellers={showSellers}
                                                setMassiveCheckeds={
                                                  setMassiveCheckeds
                                                }
                                                massiveCheckeds={
                                                  massiveCheckeds
                                                }
                                                allChecked={allChecked}
                                                setSomeChecked={setSomeChecked}
                                                checkedShops={checkedShops}
                                              />
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {/* Status Allowed */}

                    {showSellers === "approved"
                      ? item?.shops?.map((item_2) => {
                          let index = 0;
                          let productLength = 0;
                          item_2?.products?.forEach((v) => {
                            if (v?.status === "approved") {
                              ++productLength;
                            }
                          });
                          return (
                            <div key={item_2?.id}>
                              {item_2?.products?.length ? (
                                <div className="w-full">
                                  <div className="">
                                    {item_2?.products?.map((item_3) => {
                                      if (item_3?.status === "approved") {
                                        ++index;
                                      }

                                      return (
                                        <div key={item_3?.id}>
                                          {item_3?.status === "approved" ? (
                                            <div className="mb-8">
                                              {index === 1 ? (
                                                <div className="w-ful">
                                                  <div className="flex items-center justify-between mb-1 md:mb-7 font-AeonikProMedium text-[16px]">
                                                    <div className="text-[20px] md:text-[24px] w-full font-AeonikProMedium flex items-center flex-wrap">
                                                      <div
                                                        className="flex w-full md:w-fit items-center cursor-pointer"
                                                        onClick={() => {
                                                          if (
                                                            checkedShops?.includes(
                                                              item_2?.id
                                                            )
                                                          ) {
                                                            setCheckedShops(
                                                              (prevState) =>
                                                                prevState.filter(
                                                                  (id) =>
                                                                    id !==
                                                                    item_2?.id
                                                                )
                                                            );
                                                            delCheck(
                                                              item_2?.id
                                                            );
                                                          } else {
                                                            setCheckedShops([
                                                              ...checkedShops,
                                                              item_2?.id,
                                                            ]);

                                                            shopIdCheck(
                                                              item_2?.id
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        <div
                                                          className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                                                            checkedShops?.includes(
                                                              item_2?.id
                                                            )
                                                              ? "bg-[#007DCA] border-[#007DCA]"
                                                              : "bg-white border-checkboxBorder"
                                                          } flex items-center justify-center rounded mr-[8px]`}
                                                        >
                                                          <span
                                                            className={`${
                                                              checkedShops?.includes(
                                                                item_2?.id
                                                              )
                                                                ? "hidden md:flex items-center justify-center"
                                                                : "hidden"
                                                            }`}
                                                          >
                                                            <CheckIcon />
                                                          </span>
                                                          <span
                                                            className={`${
                                                              checkedShops?.includes(
                                                                item_2?.id
                                                              )
                                                                ? "flex md:hidden items-center justify-center"
                                                                : "hidden"
                                                            }`}
                                                          >
                                                            <CheckIcon
                                                              size={"small"}
                                                            />
                                                          </span>
                                                        </div>
                                                        <button className="text-[#007DCA] md:mr-[7px]">
                                                          {item?.name}
                                                          {" " + item?.surname}
                                                        </button>
                                                      </div>
                                                      <div className="flex text-[16px] md:text-[24px] text-center pl-[26px] md:pl-0 items-center mt-[10px] md:mt-0">
                                                        <span className="hidden md:inline-block">
                                                          -
                                                        </span>
                                                        <div className="break-all pr-2 md:px-2">
                                                          {item_2?.name}
                                                        </div>
                                                        ({productLength})
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="mb-[10px] flex items-center text-tableTextTitle">
                                                    <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>
                                                    <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                                                      <div className="w-[3%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        No:
                                                      </div>
                                                      <div className="w-[9%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Фото
                                                      </div>
                                                      <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Название
                                                      </div>
                                                      <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Артикул
                                                      </div>
                                                      <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Тип
                                                      </div>
                                                      <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Дата
                                                      </div>
                                                      <div className="w-[31%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Цена
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : null}

                                              <ClothesItem
                                                data={item_3}
                                                key={item_3?.id}
                                                index={index}
                                                setModalOpen={setModalOpen}
                                                toast={toast}
                                                showSellers={showSellers}
                                                setMassiveCheckeds={
                                                  setMassiveCheckeds
                                                }
                                                massiveCheckeds={
                                                  massiveCheckeds
                                                }
                                                allChecked={allChecked}
                                                setSomeChecked={setSomeChecked}
                                                checkedShops={checkedShops}
                                              />
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {/* Status NotAllowed */}

                    {showSellers === "declined"
                      ? item?.shops?.map((item_2) => {
                          let index = 0;
                          let productLength = 0;
                          item_2?.products?.forEach((v) => {
                            if (v?.status === "declined") {
                              ++productLength;
                            }
                          });
                          return (
                            <div key={item_2?.id}>
                              {item_2?.products?.length ? (
                                <div className="w-full">
                                  <div className="">
                                    {item_2?.products?.map((item_3) => {
                                      if (item_3?.status === "declined") {
                                        ++index;
                                      }

                                      return (
                                        <div key={item_3?.id}>
                                          {item_3?.status === "declined" ? (
                                            <div className="mb-8">
                                              {index === 1 ? (
                                                <div className="w-ful">
                                                  <div className="flex items-center justify-between mb-1 md:mb-7 font-AeonikProMedium text-[16px]">
                                                    <div className="text-[20px] md:text-[24px] w-full font-AeonikProMedium flex items-center flex-wrap">
                                                      <div
                                                        className="flex w-full md:w-fit items-center cursor-pointer"
                                                        onClick={() => {
                                                          if (
                                                            checkedShops?.includes(
                                                              item_2?.id
                                                            )
                                                          ) {
                                                            setCheckedShops(
                                                              (prevState) =>
                                                                prevState.filter(
                                                                  (id) =>
                                                                    id !==
                                                                    item_2?.id
                                                                )
                                                            );
                                                            delCheck(
                                                              item_2?.id
                                                            );
                                                          } else {
                                                            setCheckedShops([
                                                              ...checkedShops,
                                                              item_2?.id,
                                                            ]);

                                                            shopIdCheck(
                                                              item_2?.id
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        <div
                                                          className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                                                            checkedShops?.includes(
                                                              item_2?.id
                                                            )
                                                              ? "bg-[#007DCA] border-[#007DCA]"
                                                              : "bg-white border-checkboxBorder"
                                                          } flex items-center justify-center rounded mr-[8px]`}
                                                        >
                                                          <span
                                                            className={`${
                                                              checkedShops?.includes(
                                                                item_2?.id
                                                              )
                                                                ? "hidden md:flex items-center justify-center"
                                                                : "hidden"
                                                            }`}
                                                          >
                                                            <CheckIcon />
                                                          </span>
                                                          <span
                                                            className={`${
                                                              checkedShops?.includes(
                                                                item_2?.id
                                                              )
                                                                ? "flex md:hidden items-center justify-center"
                                                                : "hidden"
                                                            }`}
                                                          >
                                                            <CheckIcon
                                                              size={"small"}
                                                            />
                                                          </span>
                                                        </div>
                                                        <button className="text-[#007DCA] md:mr-[7px]">
                                                          {item?.name}
                                                          {" " + item?.surname}
                                                        </button>
                                                      </div>
                                                      <div className="flex text-[16px] md:text-[24px] text-center pl-[26px] md:pl-0 items-center mt-[10px] md:mt-0">
                                                        <span className="hidden md:inline-block">
                                                          -
                                                        </span>
                                                        <div className="break-all pr-2 md:px-2">
                                                          {item_2?.name}
                                                        </div>
                                                        ({productLength})
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="mb-[10px] flex items-center text-tableTextTitle">
                                                    <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>
                                                    <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                                                      <div className="w-[3%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        No:
                                                      </div>
                                                      <div className="w-[9%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Фото
                                                      </div>
                                                      <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Название
                                                      </div>
                                                      <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Артикул
                                                      </div>
                                                      <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Тип
                                                      </div>
                                                      <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Дата
                                                      </div>
                                                      <div className="w-[31%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Цена
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : null}

                                              <ClothesItem
                                                data={item_3}
                                                key={item_3?.id}
                                                index={index}
                                                setModalOpen={setModalOpen}
                                                toast={toast}
                                                showSellers={showSellers}
                                                setMassiveCheckeds={
                                                  setMassiveCheckeds
                                                }
                                                massiveCheckeds={
                                                  massiveCheckeds
                                                }
                                                allChecked={allChecked}
                                                setSomeChecked={setSomeChecked}
                                                checkedShops={checkedShops}
                                              />
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {/* Status Updated */}

                    {showSellers === "updated"
                      ? item?.shops?.map((item_2) => {
                          let index = 0;
                          let productLength = 0;
                          item_2?.products?.forEach((v) => {
                            if (v?.status === "updated") {
                              ++productLength;
                            }
                          });
                          return (
                            <div key={item_2?.id}>
                              {item_2?.products?.length ? (
                                <div className="w-full">
                                  <div className="">
                                    {item_2?.products?.map((item_3) => {
                                      if (item_3?.status === "updated") {
                                        ++index;
                                      }

                                      return (
                                        <div key={item_3?.id}>
                                          {item_3?.status === "updated" ? (
                                            <div className="mb-8">
                                              {index === 1 ? (
                                                <div className="w-ful">
                                                  <div className="flex items-center justify-between mb-1 md:mb-7 font-AeonikProMedium text-[16px]">
                                                    <div className="text-[20px] md:text-[24px] w-full font-AeonikProMedium flex items-center flex-wrap">
                                                      <div
                                                        className="flex w-full md:w-fit items-center cursor-pointer"
                                                        onClick={() => {
                                                          if (
                                                            checkedShops?.includes(
                                                              item_2?.id
                                                            )
                                                          ) {
                                                            setCheckedShops(
                                                              (prevState) =>
                                                                prevState.filter(
                                                                  (id) =>
                                                                    id !==
                                                                    item_2?.id
                                                                )
                                                            );
                                                            delCheck(
                                                              item_2?.id
                                                            );
                                                          } else {
                                                            setCheckedShops([
                                                              ...checkedShops,
                                                              item_2?.id,
                                                            ]);

                                                            shopIdCheck(
                                                              item_2?.id
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        <div
                                                          className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                                                            checkedShops?.includes(
                                                              item_2?.id
                                                            )
                                                              ? "bg-[#007DCA] border-[#007DCA]"
                                                              : "bg-white border-checkboxBorder"
                                                          } flex items-center justify-center rounded mr-[8px]`}
                                                        >
                                                          <span
                                                            className={`${
                                                              checkedShops?.includes(
                                                                item_2?.id
                                                              )
                                                                ? "hidden md:flex items-center justify-center"
                                                                : "hidden"
                                                            }`}
                                                          >
                                                            <CheckIcon />
                                                          </span>
                                                          <span
                                                            className={`${
                                                              checkedShops?.includes(
                                                                item_2?.id
                                                              )
                                                                ? "flex md:hidden items-center justify-center"
                                                                : "hidden"
                                                            }`}
                                                          >
                                                            <CheckIcon
                                                              size={"small"}
                                                            />
                                                          </span>
                                                        </div>
                                                        <button className="text-[#007DCA] md:mr-[7px]">
                                                          {item?.name}
                                                          {" " + item?.surname}
                                                        </button>
                                                      </div>
                                                      <div className="flex text-[16px] md:text-[24px] text-center pl-[26px] md:pl-0 items-center mt-[10px] md:mt-0">
                                                        <span className="hidden md:inline-block">
                                                          -
                                                        </span>
                                                        <div className="break-all pr-2 md:px-2">
                                                          {item_2?.name}
                                                        </div>
                                                        ({productLength})
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="mb-[10px] flex items-center text-tableTextTitle">
                                                    <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>
                                                    <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                                                      <div className="w-[3%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        No:
                                                      </div>
                                                      <div className="w-[9%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Фото
                                                      </div>
                                                      <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Название
                                                      </div>
                                                      <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Артикул
                                                      </div>
                                                      <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Тип
                                                      </div>
                                                      <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Дата
                                                      </div>
                                                      <div className="w-[31%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                                        Цена
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : null}

                                              <ClothesItem
                                                data={item_3}
                                                key={item_3?.id}
                                                index={index}
                                                setModalOpen={setModalOpen}
                                                toast={toast}
                                                showSellers={showSellers}
                                                setMassiveCheckeds={
                                                  setMassiveCheckeds
                                                }
                                                massiveCheckeds={
                                                  massiveCheckeds
                                                }
                                                allChecked={allChecked}
                                                setSomeChecked={setSomeChecked}
                                                checkedShops={checkedShops}
                                              />
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center bg-lightBgColor rounded-lg h-[calc(100vh-280px)]">
            {loader ? (
              <div
                style={{
                  backgroundImage: `url('${WiFiLoader}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
                className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
              ></div>
            ) : (
              <div className="font-AeonikProMedium text-xl">Нет товаров</div>
            )}
          </div>
        )}
      </div>

      <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />

      <button
        id="upBtn"
        className="fixed bg-bgColor opacity-70 bottom-5 right-5 hidden items-center justify-center w-[48px] h-[48px] border border-[#c1c1c1] rounded-full shadow-[0_9px_25px_0_#8480b147] active:scale-90"
      >
        <div className="rotate-90">
          <BackIcon width={24} height={24} />
        </div>
      </button>

      <ToastContainer autoClose={2000} />
    </div>
  );
}
