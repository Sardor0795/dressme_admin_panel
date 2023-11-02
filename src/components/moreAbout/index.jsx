import { Space, DatePicker } from "antd";
import {
  BackIcon,
  CalendarIcon,
  MobileSearchIcon,
  SearchIcon,
} from "../../assets/icon";
import { useNavigate } from "react-router-dom";
import CancelModal from "./modalCancel";
import { useState } from "react";

export const MoreAbout = () => {
  const { RangePicker } = DatePicker;
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <div className="md:border-b py-[18px] flex items-center mb-[7px] md:mb-[0]">
        <div className="flex w-full items-center font-AeonikProMedium text-[20px] md:text-[24px]">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md border border-[#D5D5D5] mr-[30px]"
          >
            <BackIcon />
          </button>
          <div className="w-full md:w-fit text-center md:text-left ml-[-30px] md:ml-[0]">
            Ожидающие продавцы
          </div>
        </div>
        <label className="hidden md:flex ml-auto mr-5 px-[13px] w-full max-w-[400px] items-center border border-searchBgColor rounded-lg ">
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
      </div>

      <div className="flex mb-[4px] md:hidden w-full items-center justify-end">
        <div>
          <button className="mr-[16px]">
            <MobileSearchIcon />
          </button>
        </div>
      </div>

      <div className="w-full hidden md:flex items-center my-9">
        <div className="flex items-center ml-auto">
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

      <div className="mb-[10px] flex items-center text-tableTextTitle">
        <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 py-[10px] md:flex items-center w-full">
          <div className="w-[5%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Имя
          </div>
          <div className="w-[7%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Фамилия
          </div>
          <div className="w-[11%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Имя организации
          </div>
          <div className="w-[12%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Номер
          </div>
          <div className="w-[15%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Email
          </div>
          <div className="w-[9%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Тип
          </div>
          <div className="w-[17%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Раздел
          </div>
          <div className="w-[8%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Дата
          </div>
          <div className="w-[15%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
            Номер карты
          </div>
        </div>
      </div>

      <div className="mb-[10px] flex items-center text-tableTextTitle">
        <div className="hidden border-lightBorderColor border rounded-[12px] bg-white px-5 py-[15px] md:flex items-center w-full">
          <div className="w-[5%]  text-[#3F6175] text-base not-italic font-AeonikProMedium">
            Umar
          </div>
          <div className="w-[7%] text-[#3F6175] text-base not-italic font-AeonikProMedium">
            Bahodirov
          </div>
          <div className="w-[11%] text-[#3F6175] text-base not-italic font-AeonikProMedium">
            Nike Store Officia
          </div>
          <div className="w-[12%] text-[#3F6175] text-base not-italic font-AeonikProMedium">
            +998 (95) 123-45-67
          </div>
          <div className="w-[15%]  text-[#3F6175] text-base not-italic font-AeonikProMedium">
            Example123@gmail.com
          </div>
          <div className="w-[9%] text-[#3F6175] text-base not-italic font-AeonikProMedium">
            Юридическое лицо
          </div>
          <div className="w-[17%] text-[#3F6175] text-base not-italic font-AeonikProMedium">
            Общество с ограниченной о тветственностью (ООО)
          </div>
          <div className="w-[8%] text-[#3F6175] text-base not-italic font-AeonikProMedium">
            15-08-2023
          </div>
          <div className="w-[15%] text-[#3F6175] text-base not-italic font-AeonikProMedium">
            0000-0000-0000-0000
          </div>
        </div>
      </div>

      {/* Mobile */}

      <div className="block md:hidden border rounded-[8px] border-[#F2F2F2] p-[10px] w-full mb-[12px]">
        <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Имя и Фамилия
          </div>
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Тип
          </div>
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[20%]">
            Дата
          </div>
        </div>

        <div className="py-[5px] px-[15px] flex mb-[10px]">
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            Umar Bahodirov
          </div>
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            Юридическое лицо
          </div>
          <div className="w-[20%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            15-08-2023
          </div>
        </div>

        <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Номер
          </div>
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Email
          </div>
        </div>

        <div className="py-[5px] px-[15px] flex mb-[12px]">
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            +998 (95) 123-45-67
          </div>
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            Example123@gmail.com
          </div>
        </div>

        <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Раздел
          </div>
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Имя организации
          </div>
        </div>

        <div className="py-[5px] px-[15px] flex mb-[12px]">
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C] pr-[15px]">
            Общество с ограниченной о тветственностью (ООО)
          </div>
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            Nike Store Officia
          </div>
        </div>

        <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Номер карты
          </div>
        </div>

        <div className="py-[5px] px-[15px] flex mb-[24px]">
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C] pr-[15px]">
            0000-0000-0000-0000
          </div>
        </div>

        <div className="w-full flex gap-[30px]">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-[8px] py-[8px] w-[50%] bg-[#FFE1E1] text-[12px] font-AeonikProMedium text-[#E51515]"
          >
            Отказать
          </button>
          <button className="rounded-[8px] py-[8px] w-[50%] bg-[#DEFCE1] text-[12px] font-AeonikProMedium text-[#12C724]">
            Одобрить
          </button>
        </div>
      </div>

      <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  );
};
