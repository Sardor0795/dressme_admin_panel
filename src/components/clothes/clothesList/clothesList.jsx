import { useEffect, useState } from "react";

import { Space, DatePicker } from "antd";
import {
  AllowedIcon,
  CheckIcon,
  NotAllowedIcon,
  SearchIcon,
  WaitingForAllowIcon,
} from "../../../assets/icon";

import CancelModal from "./ModalCancel";
import ClothesItem from "./clothesItem/clothestem";

export default function ClothesList() {
  const { RangePicker } = DatePicker;

  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      index: 1,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
      money: "96000",
      status: "waiting",
    },
    {
      id: 2,
      index: 2,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
      money: "96000",
      status: "allowed",
    },
    {
      id: 3,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
      money: "96000",
      status: "waiting",
    },
    {
      id: 4,
      index: 1,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "notAllowed",
    },
    {
      id: 5,
      index: 2,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
      money: "96000",
      status: "notAllowed",
    },
    {
      id: 6,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "allowed",
    },
    {
      id: 7,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "allowed",
    },
    {
      id: 8,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "allowed",
    },
    {
      id: 9,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "notAllowed",
    },
    {
      id: 10,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "allowed",
    },
    {
      id: 11,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "allowed",
    },
    {
      id: 12,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "waiting",
    },
    {
      id: 13,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
      status: "waiting",
    },
  ]);

  // // Count items -----------

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;

  data.forEach((v) => {
    if (v?.status === "waiting") {
      ++waitingCount;
    } else if (v?.status === "allowed") {
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

  const [showSellers, setShowSellers] = useState("waiting");

  return (
    <div>
      <div className="border-b py-[18px] flex items-center justify-between">
        <label className="px-[13px] w-full max-w-[400px] flex items-center border border-searchBgColor rounded-lg ">
          <input
            className="text-[13px] md:text-base outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
            type="email"
            placeholder="Поиск"
            required
            inputMode="search"
          />
          <span className="cursor-pointer">
            <SearchIcon />
          </span>
        </label>

        <section className="mobileDate hidden md:flex items-center">
          <Space direction="vertical" size={12}>
            <RangePicker style={{ fontSize: "16px", paddingBlock: "12px" }} />
          </Space>
        </section>
      </div>

      <div className="w-full px-4 md:px-0 mt-4">
        <div className="flex items-center gap-x-1">
          <span className="text[#303030] text-[20px] not-italic font-AeonikProMedium">
            Общее количество:
          </span>
          <span className="text[#303030] text-[20px] not-italic font-AeonikProMedium">
            {data?.length}
          </span>
        </div>

        <div className="mt-4 flex justify-end items-center md:justify-between mx-auto pb-6">
          <section className="hidden md:flex items-center w-fit bg-LocationSelectBg rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSellers("waiting")}
              className={`${
                showSellers === "waiting"
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
              onClick={() => setShowSellers("allowed")}
              className={`${
                showSellers === "allowed"
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
              onClick={() => setShowSellers("notAllowed")}
              className={`${
                showSellers === "notAllowed"
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
          <div className="w-full md:w-fit flex items-center gap-x-[30px] border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
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

        <div className="flex items-center justify-between mb-7 font-AeonikProMedium text-[16px]">
          <div className="text-[24px] font-AeonikProMedium flex items-center">
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
            className="flex items-center cursor-pointer select-none"
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
              <div className="w-[7%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                No:
              </div>
              <div className="w-[10%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Имя
              </div>
              <div className="w-[16%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Номер
              </div>
              <div className="w-[16%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Тип
              </div>
              <div className="w-[10%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Дата
              </div>
              <div className="w-[17%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Регион
              </div>
              <div className="w-[16%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Действие
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-[10px]">
            {/* Status Waiting */}

            {showSellers === "waiting"
              ? data.map((data) => {
                  if (data?.status === "waiting") {
                    return (
                      <ClothesItem
                        data={data}
                        key={data?.id}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                      />
                    );
                  }
                })
              : null}

            {/* Status Allowed */}

            {showSellers === "allowed"
              ? data.map((data) => {
                  if (data?.status === "allowed") {
                    return (
                      <ClothesItem
                        data={data}
                        key={data?.id}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                      />
                    );
                  }
                })
              : null}

            {/* Status NotAllowed */}

            {showSellers === "notAllowed"
              ? data.map((data) => {
                  if (data?.status === "notAllowed") {
                    return (
                      <ClothesItem
                        data={data}
                        key={data?.id}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                      />
                    );
                  }
                })
              : null}
          </div>
        </div>
        <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      </div>
    </div>
  );
}
