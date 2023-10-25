import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SellerItems({ data, click, setModalOpen }) {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(true);

  const navigate = useNavigate();
  const goProductDetailEdit = (id) => {
    navigate(`/locations-store/edit-detail/:${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };

  return (
    <div className="flex items-center w-full">
      <div
        onClick={() => {
          click(data?.id);
        }}
        className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
          data?.isCheck
            ? "bg-[#007DCA] border-[#007DCA]"
            : "bg-white border-checkboxBorder"
        } hidden md:flex items-center justify-center rounded mr-[8px]`}
      >
        <span
          className={`${
            data?.isCheck ? "flex items-center justify-center" : "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="13"
            viewBox="0 0 11 13"
            fill="none"
          >
            <path
              d="M1 9.5L5.88235 11L10 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
      <div className="hidden border-lightBorderColor border rounded-[12px] bg-white px-5 h-[58px] md:flex items-center w-full">
        <div className="w-[7%]   text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          {data?.id}
        </div>
        <div className="w-[10%] flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          Abdulloh
        </div>
        <div className="w-[16%] flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          +998 (95) 123-45-67
        </div>
        <div className="w-[16%] flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          Юридическое лицо
        </div>
        <div className="w-[10%] flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          15-08-2023
        </div>
        <div className="w-[17%] flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          Ташкент, Юнусовод
        </div>
        <div className="w-[16%] flex items-center gap-x-2 text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          <button className="w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]">
            Одобрить
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="w-fit px-2 py-1 rounded-[20px] border border-[#E85353] text-[#E85353]"
          >
            Отказать
          </button>
        </div>
        <Link
          to={`seller/${data?.id}`}
          className="w-[8%] cursor-pointer flex items-center justify-end pr-5 hover:underline text-weatherWinterColor text-base not-italic font-AeonikProMedium"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
