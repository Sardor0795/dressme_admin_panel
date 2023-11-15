import { useContext, useEffect, useState } from "react";
import CancelModal from "./ModalCancel";
import ClothesItem from "./clothesItem/clothestem";
import { ProductsContext } from "../../../context/productsContext";

import {
  AllowedIcon,
  BackIcon,
  CheckIcon,
  NotAllowedIcon,
  SearchIcon,
  WaitingForAllowIcon,
} from "../../../assets/icon";
import { PhoneNavbar } from "../../phoneNavbar";
import axios from "axios";

export default function ClothesList() {
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const url = "https://api.dressme.uz";

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios(`${url}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.products);
    });

    setData(data);
  }, []);

  // // Count items -----------

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;

  data.forEach((v) => {
    if (v?.status === "pending") {
      ++waitingCount;
    } else if (v?.status === "approved") {
      ++allowedCount;
    } else {
      ++notAllowedCount;
    }
  });

  // // -----------------

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

  // Products Context
  const [showProducts, setShowProducts] = useContext(ProductsContext);

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
          <PhoneNavbar />
        </div>

        {showProducts === "pending" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Ожидающие товары
          </div>
        ) : null}
        {showProducts === "approved" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Одобренные товары
          </div>
        ) : null}
        {showProducts === "declined" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Отказанные товары
          </div>
        ) : null}

        <label className="overflow-hidden px-[13px] relative w-full max-w-[400px] hidden md:flex items-center border border-searchBgColor rounded-lg ">
          <input
            className="text-[13px] md:text-base outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
            type="email"
            placeholder="Поиск"
            required
            inputMode="search"
          />
          <button className="bg-[#F7F7F7] h-full w-[50px] rounded-r-lg flex items-center justify-center absolute top-0 right-0 active:scale-90">
            <SearchIcon />
          </button>
        </label>
      </div>

      <div className="w-full mt-4">
        <div className="flex items-center gap-x-1 mb-[25px] md:mb-[0]">
          <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
            Общее количество:
          </span>
          <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
            {data?.length}
          </span>
        </div>

        <div className="flex mb-[24px] md:hidden">
          <button
            onClick={() => setShowProducts("pending")}
            className={`${
              showProducts === "waiting"
                ? "text-[#007DCA] border-[#007DCA]"
                : "text-[#303030] border-[#F2F2F2]"
            } border-b pb-[12px] text-center text-[14px] font-AeonikProRegular`}
          >
            Ожидающие товары ({waitingCount})
          </button>
          <div className="min-w-[5%] ll:min-w-[10%] border-b border-[#F2F2F2]"></div>
          <button
            onClick={() => setShowProducts("approved")}
            className={`${
              showProducts === "approved"
                ? "text-[#007DCA] border-[#007DCA]"
                : "text-[#303030] border-[#F2F2F2]"
            } border-b pb-[12px] text-center text-[14px] font-AeonikProRegular`}
          >
            Одобренные товары ({allowedCount})
          </button>
          <div className="min-w-[5%] ll:min-w-[10%] border-b border-[#F2F2F2]"></div>
          <button
            onClick={() => setShowProducts("declined")}
            className={`${
              showProducts === "declined"
                ? "text-[#007DCA] border-[#007DCA]"
                : "text-[#303030] border-[#F2F2F2]"
            } border-b pb-[12px] text-center text-[14px] font-AeonikProRegular`}
          >
            Отказанные товары ({notAllowedCount})
          </button>
        </div>

        <div className="flex md:hidden mb-[18px] items-center justify-between gap-x-1">
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

        {/* Mobile selected */}
        <div className="w-full md:hidden flex items-center justify-between pb-[24px]">
          <div className=" font-AeonikProMedium text-[14px] ll:text-sm md:text-lg text-mobileTextColor">
            Выбранные:
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="text-[#12C724] text-sm not-italic font-AeonikProMedium"
            >
              Одобрить
            </button>
            <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="text-[#E51515] text-sm not-italic font-AeonikProMedium"
            >
              Отказать
            </button>
          </div>
        </div>

        <div className="mt-4 hidden md:flex justify-end items-center md:justify-between mx-auto pb-6">
          <section className="flex items-center w-fit bg-LocationSelectBg rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowProducts("pending")}
              className={`${
                showProducts === "pending"
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
              onClick={() => setShowProducts("approved")}
              className={`${
                showProducts === "approved"
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
              onClick={() => setShowProducts("declined")}
              className={`${
                showProducts === "declined"
                  ? "text-weatherWinterColor border-[1.5px]"
                  : "text[#303030]"
              }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
            >
              <span className="mr-[5px]">
                <NotAllowedIcon />
              </span>
              <span>Отказанные товары ({notAllowedCount})</span>
            </button>
          </section>

          {/* Выбранные */}
          <div className="hidden w-full md:w-fit md:flex items-center gap-x-[30px] border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
            <span className=" font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
              Выбранные:
            </span>
            <div className="flex items-center">
              <button
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
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 md:mb-7 font-AeonikProMedium text-[16px]">
          <div className="text-[20px] md:text-[24px] font-AeonikProMedium flex items-center">
            <div
              onClick={() => {
                onCheck(checkIndicator);
                setAllChecked(!allChecked);
              }}
              className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                allChecked
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
              } flex items-center justify-center rounded mr-[8px]`}
            >
              <span
                className={`${
                  allChecked
                    ? "hidden md:flex items-center justify-center"
                    : "hidden"
                }`}
              >
                <CheckIcon />
              </span>
              <span
                className={`${
                  allChecked
                    ? "flex md:hidden items-center justify-center"
                    : "hidden"
                }`}
              >
                <CheckIcon size={"small"} />
              </span>
            </div>
            <button
              onClick={() => {
                onCheck(checkIndicator);
                setAllChecked(!allChecked);
              }}
              className="text-[#007DCA] border-b-[3px] border-[#007DCA] mr-[7px]"
            >
              Umar
            </button>
            - Nike Store (6)
          </div>

          <div
            onClick={() => {
              onCheck(checkIndicator);
              setAllChecked(!allChecked);
            }}
            className="hidden md:flex items-center cursor-pointer select-none"
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

        <div className="mx-auto font-AeonikProRegular text-[16px]">
          <div className="mb-[10px] flex items-center text-tableTextTitle">
            <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>

            <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
              <div className="w-[4%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                No:
              </div>
              <div className="w-[8%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
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
              <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Цена
              </div>
              <div className="w-[20%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Действие
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-[10px]">
            {/* Status Waiting */}

            {showProducts === "pending"
              ? data.map((data) => {
                  if (data?.status === "pending") {
                    ++index;
                    return (
                      <ClothesItem
                        data={data}
                        index={index}
                        key={data?.id}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                      />
                    );
                  }
                })
              : null}

            {/* Status Allowed */}

            {showProducts === "approved"
              ? data.map((data) => {
                  if (data?.status === "approved") {
                    ++index;
                    return (
                      <ClothesItem
                        data={data}
                        key={data?.id}
                        index={index}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                      />
                    );
                  }
                })
              : null}

            {/* Status NotAllowed */}

            {showProducts === "declined"
              ? data.map((data) => {
                  if (data?.status === "declined") {
                    ++index;
                    return (
                      <ClothesItem
                        data={data}
                        key={data?.id}
                        index={index}
                        click={onCheck}
                        setModalOpen={setModalOpen}
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
    </div>
  );
}
