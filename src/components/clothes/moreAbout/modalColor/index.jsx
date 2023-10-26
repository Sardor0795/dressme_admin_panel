import { useState } from "react";
import { ColoredCardsIcon, StarIcon, XIcon } from "../../../../assets/icon";

export default function ColorModal({ setColorModalOpen, colorModalOpen }) {
  return (
    <div className={`w-full px-4  md:px-10`}>
      <div
        className={`fixed cursor-pointer z-[200] inset-0 w-full h-full bg-black opacity-40 ${
          colorModalOpen ? "" : "hidden"
        }`}
        onClick={() => setColorModalOpen(false)}
      ></div>

      <section
        className={`max-w-[650px] z-[201] w-full flex-col h-fit bg-white fixed px-5 py-5 rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
          colorModalOpen
            ? " bottom-0 md:flex"
            : "md:hidden bottom-[-800px] z-[-10]"
        }`}
      >
        <div className="flex justify-between mb-[10px]">
          <div className="border border-[F0F0F0] p-[5px] rounded-lg flex items-center">
            <ColoredCardsIcon />
            <div className="font-AeonikProRegular text-[14px] ml-[5px]">
              Фильт цвет
            </div>
          </div>
          <button className="p-[5px] border border-[F2F2F2] rounded-lg">
            <XIcon />
          </button>
        </div>

        <div className="flex items-center mb-5">
          <div className="mr-2 font-AeonikProRegular text-[14px]">
            Выбранный цвет:
          </div>
          <div className="w-5 h-5 rounded-full bg-black"></div>
        </div>

        <div className="border border-[#F2F2F2] rounded-lg p-4"></div>
      </section>
    </div>
  );
}
