import { useContext, useEffect, useState } from "react";
import SellerItems from "./SellerItems/SellerItems";
import CancelModal from "./ModalCancel";
import { SellersContext } from "../../../context/sellersContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function SellersList() {
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useContext(SellersDataContext);

  let newData = data;

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(newData);
  }, [newData]);

  const filterFunc = (e) => {
    const filteredData = data.filter((v) =>
      v?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  // Count items -----------

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;

  filteredData.forEach((v) => {
    if (v?.status === "pending") {
      ++waitingCount;
    } else if (v?.status === "approved") {
      ++allowedCount;
    } else {
      ++notAllowedCount;
    }
  });

  // -----------------

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  let checkIndicator = allChecked ? "allNotCheck" : "allCheck";

  const onCheck = (id) => {
    if (id === "allCheck") {
      let newArr = data.map((item) => {
        return { ...item, isCheck: true };
      });
      setData(newArr);
    } else if (id === "allNotCheck") {
      let newArr = data.map((item) => {
        return { ...item, isCheck: false };
      });
      setData(newArr);
    } else {
      let newArr = data.map((item) => {
        return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
      });
      setData(newArr);
    }
  };

  useEffect(() => {
    let newData = data.filter((item) => item.isCheck === true);
    if (newData.length) {
      setSomeChecked(true);
    } else {
      setSomeChecked(false);
    }
  }, [data]);

  // ------- sellers context
  const [showSellers, setShowSellers] = useContext(SellersContext);

  let dataCount = 0;
  if (showSellers === "pending") {
    dataCount = waitingCount;
  } else if (showSellers === "approved") {
    dataCount = allowedCount;
  } else {
    dataCount = notAllowedCount;
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

  return (
    <div>
      <div className="md:mb-[15px] md:border-b py-[18px] flex items-center justify-between">
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

      <div className="flex mb-[24px] md:hidden">
        <div
          onClick={() => setShowSellers("pending")}
          className={`${
            showSellers === "pending"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[14px] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3pxs]">Ожидающие продавцы</div>{" "}
          <div>({waitingCount})</div>
        </div>
        <div className="min-w-[5%] ll:min-w-[10%] border-b border-[#F2F2F2]"></div>
        <div
          onClick={() => setShowSellers("approved")}
          className={`${
            showSellers === "approved"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[14px] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3pxs]">Одобренные продавцы</div>{" "}
          <div> ({allowedCount})</div>
        </div>
        <div className="min-w-[5%] ll:min-w-[10%] border-b border-[#F2F2F2]"></div>
        <div
          onClick={() => setShowSellers("declined")}
          className={`${
            showSellers === "declined"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[14px] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3pxs]">Отказанные продавцы</div>{" "}
          <div>({notAllowedCount})</div>
        </div>
      </div>

      <div className="w-full mt-4">
        {/* Mobile selected */}
        <div className="w-full md:hidden flex items-center justify-between pb-[24px]">
          <div className=" font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
            Выбранные:
          </div>
          <div className="flex items-center">
            {showSellers === "pending" ? (
              <div className="flex items-center ml-auto">
                <button
                  onClick={() => approveFunc()}
                  type="button"
                  className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
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
                  onClick={() => setModalOpen(true)}
                  type="button"
                  className="text-[#E51515] text-lg not-italic font-AeonikProMedium"
                >
                  Отказать
                </button>
              </div>
            ) : null}
            {showSellers === "declined" ? (
              <div className="flex items-center ml-auto">
                <button
                  onClick={() => approveFunc()}
                  type="button"
                  className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
                >
                  Одобрить
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-1">
          <div>
            <span className="text[#303030] text-[13px] md:text-[20px] mr-[5px] not-italic font-AeonikProMedium">
              Общее количество:
            </span>
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
              {data?.length}
            </span>
          </div>

          <div
            onClick={() => {
              onCheck(checkIndicator);
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

        <div className="mt-4 flex justify-end items-center md:justify-between mx-auto md:pb-6">
          <section className="hidden md:flex items-center w-fit bg-LocationSelectBg rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSellers("pending")}
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
              onClick={() => setShowSellers("approved")}
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
              onClick={() => setShowSellers("declined")}
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
          </section>

          {/* Выбранные */}
          <div className="w-full md:w-fit hidden md:flex items-center gap-x-[30px] border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
            <span className=" font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
              Выбранные:
            </span>
            <div className="flex items-center">
              {showSellers === "pending" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => approveFunc()}
                    type="button"
                    className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
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
                    onClick={() => setModalOpen(true)}
                    type="button"
                    className="text-[#E51515] text-lg not-italic font-AeonikProMedium"
                  >
                    Отказать
                  </button>
                </div>
              ) : null}
              {showSellers === "declined" ? (
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => approveFunc()}
                    type="button"
                    className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
                  >
                    Одобрить
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mx-auto font-AeonikProRegular text-[16px]">
          {dataCount > 0 ? (
            <div className="md:mb-[10px] flex items-center text-tableTextTitle">
              <div
                onClick={() => {
                  onCheck(checkIndicator);
                  setAllChecked(!allChecked);
                }}
                className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                  allChecked
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } hidden md:flex items-center justify-center rounded mr-[8px]`}
              >
                <span
                  className={`${
                    allChecked ? "flex items-center justify-center" : "hidden"
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
                <div className="w-[20%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Регион
                </div>
                <div className="w-[18%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Действие
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-lightBgColor rounded-lg h-[calc(100vh-280px)]">
              <div className="font-AeonikProMedium text-xl">Нет продавцов</div>
            </div>
          )}

          <div className="w-full flex flex-col gap-y-[10px]">
            {/* Status Waiting */}

            {showSellers === "pending"
              ? filteredData.map((data) => {
                  if (data?.status === "pending") {
                    ++index;
                    return (
                      <SellerItems
                        data={data}
                        key={data?.id}
                        index={index}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                        toast={toast}
                      />
                    );
                  }
                })
              : null}
            {/* Status Allowed */}
            {showSellers === "approved"
              ? filteredData.map((data) => {
                  if (data?.status === "approved") {
                    ++index;
                    return (
                      <SellerItems
                        data={data}
                        key={data?.id}
                        index={index}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                        toast={toast}
                      />
                    );
                  }
                })
              : null}
            {/* Status NotAllowed */}
            {showSellers === "declined"
              ? filteredData.map((data) => {
                  if (data?.status === "declined") {
                    ++index;
                    return (
                      <SellerItems
                        data={data}
                        key={data?.id}
                        click={onCheck}
                        index={index}
                        setModalOpen={setModalOpen}
                        toast={toast}
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
