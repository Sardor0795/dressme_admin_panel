import { Space, DatePicker } from "antd";
import { BackIcon, SearchIcon } from "../../assets/icon";
import { useNavigate } from "react-router-dom";

export const MoreAbout = () => {
  const { RangePicker } = DatePicker;

  const navigate = useNavigate();

  return (
    <div>
      <div className="border-b py-[18px] flex items-center">
        <div className="flex items-center font-AeonikProMedium text-[24px]">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md border border-[#D5D5D5] mr-[30px]"
          >
            <BackIcon />
          </button>
          Ожидающие продавцы
        </div>
        <label className="ml-auto mr-5 px-[13px] w-full max-w-[400px] flex items-center border border-searchBgColor rounded-lg ">
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

      <div className="w-full flex items-center my-9">
        <div className="flex items-center ml-auto">
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
    </div>
  );
};
