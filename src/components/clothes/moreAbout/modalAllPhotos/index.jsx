import { XIcon } from "../../../../assets/icon";
import Carousel from "../carousel";

export default function ModalAllPhotos({
  setAllPhotosModalOpen,
  allPhotosModalOpen,
  setModalOpen,
}) {
  return (
    <div className={`w-full px-4  md:px-10`}>
      <div
        className={`fixed cursor-pointer z-[198] inset-0 w-full h-full bg-black opacity-40 ${
          allPhotosModalOpen ? "" : "hidden"
        }`}
        onClick={() => setAllPhotosModalOpen(false)}
      ></div>
      <section
        className={`max-w-[1450px] z-[199] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
          allPhotosModalOpen
            ? " bottom-0 md:flex"
            : "md:hidden bottom-[-800px] z-[-10]"
        }`}
      >
        <div className="font-AeonikProRegular text-[24px] mb-[20px]">
          Все фото
        </div>

        <div className="flex flex-wrap h-[528px] overflow-y-auto w-full gap-[30px]">
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-full md:w-[23%] p-[10px]">
            <Carousel height={"h-[327px]"} />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between gap-[20px]">
              <button
                onClick={() => setModalOpen(true)}
                className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5] hover:border-[#E51515] transition-colors duration-[0.3]"
              >
                Отказать
              </button>
              <button className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5] hover:border-[#12C724] transition-colors duration-[0.3]">
                Одобрить
              </button>
            </div>
          </div>
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-full md:w-[23%] p-[10px]">
            <Carousel height={"h-[327px]"} />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between gap-[20px]">
              <button
                onClick={() => setModalOpen(true)}
                className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5] hover:border-[#E51515] transition-colors duration-[0.3]"
              >
                Отказать
              </button>
              <button className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5] hover:border-[#12C724] transition-colors duration-[0.3]">
                Одобрить
              </button>
            </div>
          </div>
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-full md:w-[23%] p-[10px]">
            <Carousel height={"h-[327px]"} />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between gap-[20px]">
              <button
                onClick={() => setModalOpen(true)}
                className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5] hover:border-[#E51515] transition-colors duration-[0.3]"
              >
                Отказать
              </button>
              <button className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5] hover:border-[#12C724] transition-colors duration-[0.3]">
                Одобрить
              </button>
            </div>
          </div>
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-full md:w-[23%] p-[10px]">
            <Carousel height={"h-[327px]"} />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between gap-[20px]">
              <button
                onClick={() => setModalOpen(true)}
                className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5] hover:border-[#E51515] transition-colors duration-[0.3]"
              >
                Отказать
              </button>
              <button className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5] hover:border-[#12C724] transition-colors duration-[0.3]">
                Одобрить
              </button>
            </div>
          </div>
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-full md:w-[23%] p-[10px]">
            <Carousel height={"h-[327px]"} />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between gap-[20px]">
              <button
                onClick={() => setModalOpen(true)}
                className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5] hover:border-[#E51515] transition-colors duration-[0.3]"
              >
                Отказать
              </button>
              <button className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5] hover:border-[#12C724] transition-colors duration-[0.3]">
                Одобрить
              </button>
            </div>
          </div>
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-full md:w-[23%] p-[10px]">
            <Carousel height={"h-[327px]"} />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between gap-[20px]">
              <button
                onClick={() => setModalOpen(true)}
                className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5] hover:border-[#E51515] transition-colors duration-[0.3]"
              >
                Отказать
              </button>
              <button className="py-[8px] w-full font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5] hover:border-[#12C724] transition-colors duration-[0.3]">
                Одобрить
              </button>
            </div>
          </div>
        </div>

        {/* X button */}

        <button
          onClick={() => setAllPhotosModalOpen(false)}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-[5px] border border-[F2F2F2] rounded-lg"
        >
          <XIcon />
        </button>
      </section>
    </div>
  );
}
