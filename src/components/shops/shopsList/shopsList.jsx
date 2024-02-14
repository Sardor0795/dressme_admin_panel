import { useContext, useEffect, useState } from "react";
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
import { ShopsDataContext } from "../../../context/shopsDataContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WiFiLoader from "../../../assets/loader/wifi_loader.gif";
import ShopsItem from "./shopsItem/shopsItem";
import CancelShopsModal from "./ModalCancel";
import { SellersContext } from "../../../context/sellersContext";
import { IdsContext } from "../../../context/idContext";
import axios from "axios";
import { LocationsDataContext } from "../../../context/locationsDataContext";
import { ClothesDataContext } from "../../../context/clothesDataContext";
import { ReFreshTokenContext } from "../../../context/reFreshToken";

export default function ShopsList() {
  const url = "https://api.dressme.uz";
  const [modalOpen, setModalOpen] = useState(false);

  const [dataShops, setDataShops, , loader] = useContext(ShopsDataContext);

  const [, setId] = useContext(IdsContext);

  const [, , reFetch] = useContext(ShopsDataContext);
  const [, , locationsReFetch] = useContext(LocationsDataContext);
  const [, , clothesReFetch] = useContext(ClothesDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  let newData = dataShops;

  const [filteredData, setFilteredData] = useState([]);

  // console.log(filteredData, "lllllllllllllll");

  // console.log(dataShops, 'data-Shops');

  useEffect(() => {
    setFilteredData(newData);
  }, [newData]);

  const filterFunc = (e) => {
    const filtered = dataShops?.map((seller) => {
      const filteredShops = seller?.shops?.filter((shop) => {
        return shop?.name.toLowerCase().includes(e.target.value.toLowerCase());
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

  filteredData?.forEach((sellers_shops) => {
    // console.log(sellers_shops, 'sellers_shops');
    sellers_shops?.shops?.forEach((shop) => {
      if (shop?.status === "pending") {
        ++waitingCount;
      } else if (shop?.status === "approved") {
        ++allowedCount;
      } else if (shop?.status === "declined") {
        ++notAllowedCount;
      } else if (shop?.status === "updated") {
        ++updatedCount;
      }
    });
  });

  // console.log(filteredData, "filteredData");

  let allCount = waitingCount + allowedCount + notAllowedCount + updatedCount;

  // let checkIndicator = allChecked ? "allNotCheck" : "allCheck";

  const onCheck = (id) => {};

  // Products Context
  const [showSellers, setShowSellers] = useContext(SellersContext);

  // console.log(showSellers,'showSellers');

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

  // console.log(waitingCount,'waitingCount');
  // console.log(allowedCount,'allowedCount');
  // console.log(notAllowedCount,'notAllowedCount');
  // console.log(updatedCount,'updatedCount');

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // Select all -----------------

  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const [massiveCheckeds, setMassiveCheckeds] = useState([]);
  const [checkedShops, setCheckedShops] = useState([]);

  const shopIdCheck = (id) => {
    const seller = filteredData?.find((seller) => {
      return seller.id === id;
    });

    // Extract product IDs if shop_id matches
    const matchingProductIDs = seller?.shops?.map((shop) => {
      // Convert product ID to number
      return shop?.id;
    });

    // Set the array of product IDs
    setMassiveCheckeds([...massiveCheckeds, ...matchingProductIDs]);
  };

  const delCheck = (id) => {
    const seller = filteredData?.find((seller) => {
      return seller.id === id;
    });

    // Extract product IDs if shop_id matches
    const matchingProductIDs = seller?.shops?.map((shop) => {
      // Convert product ID to number
      return shop?.id;
    });

    const filteredArray = massiveCheckeds.filter(
      (num) => !matchingProductIDs.includes(num)
    );

    setMassiveCheckeds([...filteredArray]);
  };

  const selectAllIds = () => {
    const sellerIds = [];
    const shopIds = [];

    filteredData?.forEach((seller) => {
      seller?.shops?.forEach((shop) => {
        if (shop) {
          shopIds.push(shop.id);
        }
      });
      if (seller) {
        sellerIds.push(seller.id);
      }
    });

    // Set the arrays
    setMassiveCheckeds(shopIds);
    setCheckedShops(sellerIds);
  };

  useEffect(() => {
    if (allChecked) {
      selectAllIds();
    } else {
      setCheckedShops([]);
      setMassiveCheckeds([]);
    }
  }, [allChecked]);

  const allApproveFunc = () => {
    let formData = new FormData();
    formData.append("status", "approved");
    if (massiveCheckeds) {
      massiveCheckeds.forEach((id) => {
        formData.append("ids[]", id);
      });
    }

    axios
      .post(`${url}/api/admin/massive-approve-shops`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((d) => {
        if (d.status === 200) {
          toast.success(d?.data?.message);
          reFetch();
          locationsReFetch();
          clothesReFetch();
        }
      })
      .catch((v) => {
        if (v?.response?.status === 401) {
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
            Ожидающие магазины
          </div>
        ) : null}
        {showSellers === "approved" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Одобренные магазины
          </div>
        ) : null}
        {showSellers === "declined" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Отказанные магазины
          </div>
        ) : null}
        {showSellers === "updated" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Обновленные магазины
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
            <span className=" font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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

        <div className="flex mb-[24px] md:hidden">
          <div
            onClick={() => {
              setAllChecked(false);
              setShowSellers("pending");
            }}
            className={`${
              showSellers === "pending"
                ? "text-[#007DCA] border-[#007DCA]"
                : "text-[#303030] border-[#F2F2F2]"
            } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
          >
            <div className="mb-[3px]">Ожидающие магазины</div>{" "}
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
            } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
          >
            <div className="mb-[3px]">Одобренные магазины</div>{" "}
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
            } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
          >
            <div className="mb-[3px]">Отказанные магазины</div>{" "}
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
            } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
          >
            <div className="mb-[3px]">Обновленные магазины</div>{" "}
            <div>({updatedCount})</div>
          </div>
        </div>

        {/* Mobile select all */}
        {dataCount > 0 ? (
          <div className="flex md:hidden mb-[18px] items-center justify-between gap-x-1">
            <div
              onClick={() => {
                // onCheck(checkIndicator);
                setAllChecked(!allChecked);
              }}
              className="select-none cursor-pointer flex md:hidden items-center text-[14px] font-AeonikProMedium text-[#303030]"
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

        {/* Mobile selected */}

        {dataCount > 0 ? (
          <div className="w-full md:hidden flex items-center justify-between pb-[24px]">
            <div className=" font-AeonikProMedium text-base ll:text-sm md:text-lg text-mobileTextColor">
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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
                    className={`text-sm md:text-lg not-italic font-AeonikProMedium ${
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

        <div className="mt-4 hidden md:flex justify-end items-center md:justify-between mx-auto pb-6">
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
              <span>Ожидающие магазины ({waitingCount})</span>
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
              <span>Одобренные магазины ({allowedCount})</span>
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
              <span>Отказанные магазины ({notAllowedCount})</span>
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
              <span>Обновленные магазины ({updatedCount})</span>
            </button>
          </section>

          <div
            onClick={() => {
              // onCheck(checkIndicator);
              setAllChecked(!allChecked);
            }}
            className="hidden md:flex items-center cursor-pointer select-none font-AeonikProMedium"
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
            return item?.shops?.length ? (
              <div className="w-full" key={item?.id}>
                <div className="mx-auto font-AeonikProRegular text-[16px]">
                  {item?.shops?.find((v) => v?.status === showSellers) ? (
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-4 md:mb-7 font-AeonikProMedium text-[16px]">
                        <div className="text-[20px] md:text-[24px] font-AeonikProMedium flex items-center">
                          <div
                            onClick={() => {
                              if (checkedShops?.includes(item?.id)) {
                                setCheckedShops((prevState) =>
                                  prevState.filter((id) => id !== item?.id)
                                );
                                delCheck(item?.id);
                              } else {
                                setCheckedShops([...checkedShops, item?.id]);

                                shopIdCheck(item?.id);
                              }
                            }}
                            className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                              checkedShops?.includes(item?.id)
                                ? "bg-[#007DCA] border-[#007DCA]"
                                : "bg-white border-checkboxBorder"
                            } flex items-center justify-center rounded mr-[8px]`}
                          >
                            <span
                              className={`${
                                checkedShops?.includes(item?.id)
                                  ? "hidden md:flex items-center justify-center"
                                  : "hidden"
                              }`}
                            >
                              <CheckIcon />
                            </span>
                            <span
                              className={`${
                                checkedShops?.includes(item?.id)
                                  ? "flex md:hidden items-center justify-center"
                                  : "hidden"
                              }`}
                            >
                              <CheckIcon size={"small"} />
                            </span>
                          </div>
                          <button className="text-[#007DCA] mr-[7px]">
                            {item?.name}
                          </button>
                          ({item?.shops?.length || 0})
                        </div>
                      </div>

                      <div className="mb-[18px] flex items-center text-tableTextTitle">
                        <div className=" min-w-[24px]  min-h-[24px] hidden md:flex mr-[8px]"></div>
                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                          <div className="w-[4%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                            No:
                          </div>
                          <div className="w-[9%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                            Фото
                          </div>
                          <div className="w-[20%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                            Название
                          </div>
                          <div className="w-[12%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                            Пол
                          </div>
                          <div className="w-[55%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                            Доставка
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="w-full ">
                    {/* Status Waiting */}

                    {showSellers === "pending"
                      ? item?.shops?.map((data, index) => {
                          return (
                            <div key={data?.id}>
                              {data?.status === "pending" ? (
                                <div className="mb-8">
                                  <ShopsItem
                                    data={data}
                                    index={index}
                                    onCheck={onCheck}
                                    showSellers={showSellers}
                                    toast={toast}
                                    setModalOpen={setModalOpen}
                                    setMassiveCheckeds={setMassiveCheckeds}
                                    massiveCheckeds={massiveCheckeds}
                                    allChecked={allChecked}
                                    setSomeChecked={setSomeChecked}
                                    checkedShops={checkedShops}
                                  />
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {/* Status Allowed */}
                    {showSellers === "approved"
                      ? item?.shops?.map((data, index) => {
                          return (
                            <div key={data?.id}>
                              {data?.status === "approved" ? (
                                <div className="mb-8">
                                  <ShopsItem
                                    data={data}
                                    index={index}
                                    onCheck={onCheck}
                                    showSellers={showSellers}
                                    toast={toast}
                                    setModalOpen={setModalOpen}
                                    setMassiveCheckeds={setMassiveCheckeds}
                                    massiveCheckeds={massiveCheckeds}
                                    allChecked={allChecked}
                                    setSomeChecked={setSomeChecked}
                                    checkedShops={checkedShops}
                                  />
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {/* Status NotAllowed */}

                    {showSellers === "declined"
                      ? item?.shops?.map((data, index) => {
                          return (
                            <div key={data?.id}>
                              {data?.status === "declined" ? (
                                <div className="mb-8">
                                  <ShopsItem
                                    data={data}
                                    index={index}
                                    onCheck={onCheck}
                                    showSellers={showSellers}
                                    toast={toast}
                                    setModalOpen={setModalOpen}
                                    setMassiveCheckeds={setMassiveCheckeds}
                                    massiveCheckeds={massiveCheckeds}
                                    allChecked={allChecked}
                                    setSomeChecked={setSomeChecked}
                                    checkedShops={checkedShops}
                                  />
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {/* Status Updated */}

                    {showSellers === "updated"
                      ? item?.shops?.map((data, index) => {
                          return (
                            <div key={data?.id}>
                              {data?.status === "updated" ? (
                                <div className="mb-8">
                                  <ShopsItem
                                    data={data}
                                    index={index}
                                    onCheck={onCheck}
                                    showSellers={showSellers}
                                    toast={toast}
                                    setModalOpen={setModalOpen}
                                    setMassiveCheckeds={setMassiveCheckeds}
                                    massiveCheckeds={massiveCheckeds}
                                    allChecked={allChecked}
                                    setSomeChecked={setSomeChecked}
                                    checkedShops={checkedShops}
                                  />
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            ) : null;
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
                className="w-[100px] h-[100px]"
              ></div>
            ) : (
              <div className="font-AeonikProMedium text-xl">Нет магазинов</div>
            )}
          </div>
        )}
      </div>

      <CancelShopsModal setModalOpen={setModalOpen} modalOpen={modalOpen} />

      <button
        id="upBtn"
        className="fixed bg-bgColor opacity-70 bottom-5 right-5 hidden items-center justify-center w-[48px] h-[48px] border border-[#c1c1c1] rounded-full shadow-[0_9px_25px_0_#8480b147] active:scale-90"
      >
        <div className="rotate-90">
          <BackIcon width={24} height={24} />
        </div>
      </button>

      <ToastContainer />
    </div>
  );
}
