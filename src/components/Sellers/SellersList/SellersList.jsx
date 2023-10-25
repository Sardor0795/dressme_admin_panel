import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SellerItems from "./SellerItems/SellerItems";

import { SearchIcon } from "../../../assets/icon";
import { Space, DatePicker } from "antd";

import {
  ClockIcons,
  RefusedUserIcons,
  SoldUserIcons,
} from "../../../assets/icon";
import CancelModal from "./ModalCancel";

export default function SellersList() {
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
    },
    {
      id: 2,
      index: 2,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
      money: "96000",
    },
    {
      id: 3,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
      money: "96000",
    },
    {
      id: 4,
      index: 1,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
    },
    {
      id: 5,
      index: 2,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
      money: "96000",
    },
    {
      id: 6,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
    },
  ]);

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

  return (
    <div>
      <div className="">
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
      </div>

      <div className="w-full px-4 md:px-0 mt-4">
        <div className="flex items-center gap-x-1">
          <span className="text[#303030] text-[20px] not-italic font-AeonikProMedium">
            Общее количество:
          </span>
          <span className="text[#303030] text-[20px] not-italic font-AeonikProMedium">
            74
          </span>
        </div>

        <div className="mt-4 flex justify-end items-center md:justify-between mx-auto pb-6">
          <section className="hidden md:flex items-center w-fit bg-LocationSelectBg rounded-lg overflow-hidden">
            <button
              type="button"
              className="focus:border-[1.5px] focus:text-weatherWinterColor text[#303030] text-base not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1"
            >
              <span>
                <ClockIcons />
              </span>
              <span>Ожидающие продавцы (12)</span>
            </button>
            <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
            <button
              type="button"
              className="focus:border-[1.5px] focus:text-weatherWinterColor text[#303030] text-base not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1"
            >
              <span>
                <ClockIcons />
              </span>{" "}
              <span>Одобренные продавцы (7)</span>
            </button>
            <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
            <button
              type="button"
              className="focus:border-[1.5px] focus:text-weatherWinterColor text[#303030] text-base not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1"
            >
              <span>
                <ClockIcons />
              </span>{" "}
              <span>Отказанные продавцы (3)</span>
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
                type="button"
                className="text-[#E51515] text-lg not-italic font-AeonikProMedium"
              >
                Отказать
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto font-AeonikProRegular text-[16px]">
          <div className="mb-[10px] flex items-center text-tableTextTitle">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={11}
                  height={13}
                  viewBox="0 0 11 13"
                  fill="none"
                >
                  <path
                    d="M1 9.5L5.88235 11L10 1"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
              <div className="w-[5%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                No:
              </div>
              <div className="w-[10%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Имя
              </div>
              <div className="w-[14%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Номер
              </div>
              <div className="w-[12%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Тип
              </div>
              <div className="w-[8%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Дата
              </div>
              <div className="w-[14%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Регион
              </div>
              <div className="w-[39%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                Действие
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-[10px]">
            {data.map((data, i) => {
              return (
                <SellerItems
                  setModalOpen={setModalOpen}
                  key={data?.id}
                  data={data}
                  click={onCheck}
                />
              );
            })}
          </div>
        </div>
        <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      </div>
    </div>
  );
}
