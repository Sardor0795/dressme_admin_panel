import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckIcon } from "../../../../assets/icon";

export default function SellerItems({ data, click, setModalOpen }) {
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
          <CheckIcon />
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
          <button
            className={`${
              data?.status === "waiting" || data?.status === "notAllowed"
                ? ""
                : "hidden"
            } w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
          >
            Одобрить
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className={`${
              data?.status === "waiting" || data?.status === "allowed"
                ? ""
                : "hidden"
            } w-fit px-2 py-1 rounded-[20px] border border-[#E85353] text-[#E85353]`}
          >
            Отказать
          </button>
          <button
            className={`${
              data?.status === "notAllowed" ? "" : "hidden"
            } w-fit px-2 py-1 rounded-[20px] border border-[#E85353] text-[#E85353]`}
          >
            Удалить
          </button>
        </div>
        <Link
          to={`seller/5`}
          className="w-[8%] cursor-pointer flex items-center justify-end pr-5 hover:underline text-weatherWinterColor text-base not-italic font-AeonikProMedium"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
