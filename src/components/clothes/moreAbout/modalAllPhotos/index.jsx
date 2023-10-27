import Carousel from "../carousel";

export default function ModalAllPhotos({
  setAllPhotosModalOpen,
  allPhotosModalOpen,
}) {
  return (
    <div className={`w-full px-4  md:px-10`}>
      <div
        className={`fixed cursor-pointer z-[200] inset-0 w-full h-full bg-black opacity-40 ${
          allPhotosModalOpen ? "" : "hidden"
        }`}
        onClick={() => setAllPhotosModalOpen(false)}
      ></div>
      <section
        className={`max-w-[1450px] z-[201] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
          allPhotosModalOpen
            ? " bottom-0 md:flex"
            : "md:hidden bottom-[-800px] z-[-10]"
        }`}
      >
        <div className="font-AeonikProRegular text-[24px] mb-[20px]">
          Все фото
        </div>

        <div className="flex justify-between">
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-[319px] p-[10px]">
            <Carousel />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="py-[8px] px-[40px] font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5]">
                Отказать
              </button>
              <button className="py-[8px] px-[40px] font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5]">
                Одобрить
              </button>
            </div>
          </div>
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-[319px] p-[10px]">
            <Carousel />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="py-[8px] px-[40px] font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5]">
                Отказать
              </button>
              <button className="py-[8px] px-[40px] font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5]">
                Одобрить
              </button>
            </div>
          </div>
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-[319px] p-[10px]">
            <Carousel />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="py-[8px] px-[40px] font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5]">
                Отказать
              </button>
              <button className="py-[8px] px-[40px] font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5]">
                Одобрить
              </button>
            </div>
          </div>
          <div className="bg-[#FCFCFC] border border-[#F2F2F2] rounded-xl w-[319px] p-[10px]">
            <Carousel />
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="font-AeonikProRegular text-[16px] mr-[5px]">
                Цвет:
              </div>
              <div className="py-[5px] px-[10px] rounded-3xl bg-black text-white">
                Черный
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="py-[8px] px-[40px] font-AeonikProRegular text-[14px] text-[#E51515] rounded-lg border border-[#E5E5E5]">
                Отказать
              </button>
              <button className="py-[8px] px-[40px] font-AeonikProRegular text-[14px] text-[#12C724] rounded-lg border border-[#E5E5E5]">
                Одобрить
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
