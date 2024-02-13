import { useContext, useEffect, useState } from "react";
import SellerItems from "./SellerItems/SellerItems";
import CancelModal from "./ModalCancel";
import { SellersContext } from "../../../context/sellersContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WiFiLoader from "../../../assets/loader/wifi_loader.gif";

import {
  AllowedIcon,
  BackIcon,
  CheckIcon,
  NotAllowedIcon,
  SearchIcon,
  WaitingForAllowIcon,
} from "../../../assets/icon";
import { PhoneNavbar } from "../../phoneNavbar";
import { SellersDataContext } from "../../../context/sellersDataContext";
import { ShopsDataContext } from "../../../context/shopsDataContext";
import { LocationsDataContext } from "../../../context/locationsDataContext";
import { ClothesDataContext } from "../../../context/clothesDataContext";
import { ReFreshTokenContext } from "../../../context/reFreshToken";
import axios from "axios";
import { IdsContext } from "../../../context/idContext";

export default function SellersList() {
  const [modalOpen, setModalOpen] = useState(false);

  const [, , reFetch] = useContext(SellersDataContext);
  const [, , shopsReFetch] = useContext(ShopsDataContext);
  const [, , locationsReFetch] = useContext(LocationsDataContext);
  const [, , clothesReFetch] = useContext(ClothesDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const [data, setData, , loader] = useContext(SellersDataContext);
  const [, setId] = useContext(IdsContext);

  let newData = data;

  const url = "https://api.dressme.uz";

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(newData);
  }, [newData]);

  // console.log(data,'data-sellers');

  const filterFunc = (e) => {
    const filteredData = data?.filter((v) =>
      v?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  // Count items -----------

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;
  let updatedCount = 0;

  filteredData?.forEach((v) => {
    if (v?.status === "pending") {
      ++waitingCount;
    } else if (v?.status === "approved") {
      ++allowedCount;
    } else if (v?.status === "declined") {
      ++notAllowedCount;
    } else if (v?.status === "updated") {
      ++updatedCount;
    }
  });

  // -----------------

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // ------- sellers context
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

  let index = 0;

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

  const [massiveCheckeds, setMassiveCheckeds] = useState([]);

  // console.log(massiveCheckeds, "massiveCheckeds");

  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const allApproveFunc = () => {
    let formData = new FormData();
    formData.append("status", "approved");
    if (massiveCheckeds) {
      massiveCheckeds.forEach((id) => {
        formData.append("ids[]", id);
      });
    }

    axios
      .post(`${url}/api/admin/massive-approve-sellers`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((d) => {
        if (d.status === 200) {
          toast.success(d?.data?.message);
          reFetch();
          shopsReFetch();
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
          <PhoneNavbar filterFuncSellers={filterFunc} />
        </div>

        {showSellers === "pending" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Ожидающие продавцы
          </div>
        ) : null}
        {showSellers === "approved" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Одобренные продавцы
          </div>
        ) : null}
        {showSellers === "declined" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Отказанные продавцы
          </div>
        ) : null}
        {showSellers === "updated" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Обновленные продавцы
          </div>
        ) : null}

        <label className="overflow-hidden px-[13px] relative w-full max-w-[400px] hidden md:flex items-center border border-searchBgColor rounded-lg ">
          <input
            className="text-[13px] md:text-base outline-none w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
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

      <div className="flex mb-[24px] mt-[80px] md:hidden">
        <div
          onClick={() => setShowSellers("pending")}
          className={`${
            showSellers === "pending"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-sm md:text-[14px] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3pxs]">Ожидающие продавцы</div>{" "}
          <div>({waitingCount})</div>
        </div>
        <div
          onClick={() => setShowSellers("approved")}
          className={`${
            showSellers === "approved"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-sm md:text-[14px] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3pxs]">Одобренные продавцы</div>{" "}
          <div> ({allowedCount})</div>
        </div>
        <div
          onClick={() => setShowSellers("declined")}
          className={`${
            showSellers === "declined"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-sm md:text-[14px] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3pxs]">Отказанные продавцы</div>{" "}
          <div>({notAllowedCount})</div>
        </div>
        <div
          onClick={() => setShowSellers("updated")}
          className={`${
            showSellers === "updated"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-sm md:text-[14px] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3pxs]"> Обновленные продавцы</div>{" "}
          <div>({updatedCount})</div>
        </div>
      </div>

      <div className="w-full mt-4">
        {/* Mobile selected */}
        {dataCount > 0 ? (
          <div className="w-full md:hidden flex items-center justify-between pb-[24px]">
            <div className=" font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
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
                    className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? ""
                        : "opacity-50 cursor-not-allowed"
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
                    className={`text-[#E51515] text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    type="button"
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
                    className={`text-[#E51515] text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    type="button"
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
                    className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? ""
                        : "opacity-50 cursor-not-allowed"
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
                    className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                      massiveCheckeds?.length > 0
                        ? ""
                        : "opacity-50 cursor-not-allowed"
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

        <div className="hidden w-full md:flex items-center justify-between gap-x-1">
          <div className="w-fit md:w-full flex items-center justify-between gap-x-1 md:mb-[0]">
            <div className="w-fit flex gap-x-1">
              <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
                Общее количество:
              </span>
              <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
                {data?.length}
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
                      className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                        massiveCheckeds?.length > 0
                          ? ""
                          : "opacity-50 cursor-not-allowed"
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
                      className={`text-[#E51515] text-lg not-italic font-AeonikProMedium ${
                        massiveCheckeds?.length > 0
                          ? ""
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      type="button"
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
                      className={`text-[#E51515] text-lg not-italic font-AeonikProMedium ${
                        massiveCheckeds?.length > 0
                          ? ""
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      type="button"
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
                      type="button"
                      className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                        massiveCheckeds?.length > 0
                          ? ""
                          : "opacity-50 cursor-not-allowed"
                      }`}
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
                      type="button"
                      className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                        massiveCheckeds?.length > 0
                          ? ""
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Одобрить
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setAllChecked(!allChecked);
              setSomeChecked(false);
            }}
            className="select-none cursor-pointer flex md:hidden items-center text-[14px] font-AeonikProMedium text-[#303030]"
          >
            Выбрать все
            <div
              className={`ml-[8px] cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
                allChecked && someChecked === false
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
              } flex items-center justify-center rounded`}
            >
              <span
                className={`${
                  allChecked && someChecked === false
                    ? "flex items-center justify-center"
                    : "hidden"
                }`}
              >
                <CheckIcon size={"small"} />
              </span>
            </div>
          </div>
        </div>

        {dataCount > 0 ? (
          <div className="w-full flex md:hidden items-center justify-between gap-x-1">
            <div className="w-fit md:w-full flex items-center justify-between gap-x-1 md:mb-[0]">
              <div className="w-fit flex gap-x-1">
                <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
                  Общее количество:
                </span>
                <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
                  {data?.length}
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
                        className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                          massiveCheckeds?.length > 0
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        type="button"
                      >
                        Одобрить
                      </button>
                      <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
                      <button
                        onClick={() => setModalOpen(true)}
                        type="button"
                        className="text-[#E51515] text-lg not-italic font-AeonikProMedium"
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
                            setModalOpen(true);
                          }
                        }}
                        className={`text-[#E51515] text-lg not-italic font-AeonikProMedium ${
                          massiveCheckeds?.length > 0
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        type="button"
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
                        className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                          massiveCheckeds?.length > 0
                            ? ""
                            : "opacity-50 cursor-not-allowed"
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
                        className={`text-[#12C724] text-lg not-italic font-AeonikProMedium ${
                          massiveCheckeds?.length > 0
                            ? ""
                            : "opacity-50 cursor-not-allowed"
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

            <div
              onClick={() => {
                setAllChecked(!allChecked);
                setSomeChecked(false);
              }}
              className="select-none cursor-pointer flex md:hidden items-center text-[14px] font-AeonikProMedium text-[#303030]"
            >
              Выбрать все
              <div
                className={`ml-[8px] cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
                  allChecked && someChecked === false
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } flex items-center justify-center rounded`}
              >
                <span
                  className={`${
                    allChecked && someChecked === false
                      ? "flex items-center justify-center"
                      : "hidden"
                  }`}
                >
                  <CheckIcon size={"small"} />
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex justify-end items-center md:justify-between mx-auto md:pb-6">
          <section className="hidden md:flex items-center w-fit bg-LocationSelectBg rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setShowSellers("pending");
                setAllChecked(false);
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
              <span>Ожидающие продавцы ({waitingCount})</span>
            </button>
            <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
            <button
              type="button"
              onClick={() => {
                setShowSellers("approved");
                setAllChecked(false);
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
              <span>Одобренные продавцы ({allowedCount})</span>
            </button>
            <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
            <button
              type="button"
              onClick={() => {
                setShowSellers("declined");
                setAllChecked(false);
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
              <span>Отказанные продавцы ({notAllowedCount})</span>
            </button>
            <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
            <button
              type="button"
              onClick={() => {
                setShowSellers("updated");
                setAllChecked(false);
              }}
              className={`${
                showSellers === "updated"
                  ? "text-weatherWinterColor border-[1.5px]"
                  : "text[#303030]"
              }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
            >
              <span className="mr-[5px]">
                <NotAllowedIcon />
              </span>
              <span>Обновленные продавцы ({updatedCount})</span>
            </button>
          </section>

          <div
            onClick={() => {
              setAllChecked(!allChecked);
              setSomeChecked(false);
            }}
            className="select-none cursor-pointer hidden md:flex items-center text-base font-AeonikProMedium text-[#303030]"
          >
            Выбрать все
            <div
              className={`ml-[10px] cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                allChecked && someChecked === false
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
              } flex items-center justify-center rounded`}
            >
              <span
                className={`${
                  allChecked && someChecked === false
                    ? "flex items-center justify-center"
                    : "hidden"
                }`}
              >
                <CheckIcon size={"small"} />
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto font-AeonikProRegular text-[16px]">
          {dataCount > 0 ? (
            <div className="md:mb-[10px] flex items-center text-tableTextTitle">
              <div
                onClick={() => {
                  setAllChecked(!allChecked);
                  setSomeChecked(false);
                }}
                className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                  allChecked && someChecked === false
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } hidden md:flex items-center justify-center rounded mr-[8px]`}
              >
                <span
                  className={`${
                    allChecked && someChecked === false
                      ? "flex items-center justify-center"
                      : "hidden"
                  }`}
                >
                  <CheckIcon />
                </span>
              </div>

              <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                <div className="w-[3%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  No:
                </div>
                <div className="w-[10%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Имя
                </div>
                <div className="w-[15%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Номер
                </div>
                <div className="w-[15%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Тип
                </div>
                <div className="w-[11%] px-2  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Дата
                </div>
                <div className="w-[38%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Регион
                </div>
              </div>
            </div>
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
                <div className="font-AeonikProMedium text-xl">
                  Нет продавцов
                </div>
              )}
            </div>
          )}

          <div className="w-full flex flex-col gap-y-[10px]">
            {/* Status Waiting */}

            {showSellers === "pending"
              ? filteredData?.map((data) => {
                  if (data?.status === "pending") {
                    ++index;
                    return (
                      <SellerItems
                        data={data}
                        key={data?.id}
                        index={index}
                        setModalOpen={setModalOpen}
                        toast={toast}
                        showSellers={showSellers}
                        setMassiveCheckeds={setMassiveCheckeds}
                        massiveCheckeds={massiveCheckeds}
                        allChecked={allChecked}
                        setSomeChecked={setSomeChecked}
                      />
                    );
                  }
                })
              : null}
            {/* Status Allowed */}
            {showSellers === "approved"
              ? filteredData?.map((data) => {
                  if (data?.status === "approved") {
                    ++index;
                    return (
                      <SellerItems
                        data={data}
                        key={data?.id}
                        index={index}
                        setModalOpen={setModalOpen}
                        toast={toast}
                        setMassiveCheckeds={setMassiveCheckeds}
                        massiveCheckeds={massiveCheckeds}
                        showSellers={showSellers}
                        allChecked={allChecked}
                        setSomeChecked={setSomeChecked}
                      />
                    );
                  }
                })
              : null}
            {/* Status NotAllowed */}
            {showSellers === "declined"
              ? filteredData?.map((data) => {
                  if (data?.status === "declined") {
                    ++index;
                    return (
                      <SellerItems
                        data={data}
                        key={data?.id}
                        index={index}
                        setModalOpen={setModalOpen}
                        toast={toast}
                        setMassiveCheckeds={setMassiveCheckeds}
                        massiveCheckeds={massiveCheckeds}
                        showSellers={showSellers}
                        allChecked={allChecked}
                        setSomeChecked={setSomeChecked}
                      />
                    );
                  }
                })
              : null}
            {/* Status NotAllowed */}
            {showSellers === "updated"
              ? filteredData?.map((data) => {
                  if (data?.status === "updated") {
                    ++index;
                    return (
                      <SellerItems
                        data={data}
                        key={data?.id}
                        index={index}
                        setModalOpen={setModalOpen}
                        toast={toast}
                        setMassiveCheckeds={setMassiveCheckeds}
                        massiveCheckeds={massiveCheckeds}
                        showSellers={showSellers}
                        allChecked={allChecked}
                        setSomeChecked={setSomeChecked}
                      />
                    );
                  }
                })
              : null}
          </div>
        </div>
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

      <ToastContainer />
    </div>
  );
}
