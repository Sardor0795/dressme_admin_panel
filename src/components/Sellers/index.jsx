import { SearchIcon } from "../../assets/icon";
import { Space, DatePicker } from "antd";
import SellersList from "./SellersList/SellersList";

export const SalesComponent = () => {
  const { RangePicker } = DatePicker;

  return (
    <div className="w-full px-10">
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
      <div className="flex w-full">
        <SellersList/>
      </div>
    </div>
  );
};
