import { useState } from "react";
import {
  ColoredCardsIcon,
  PlusIcon,
  StarIcon,
  XIcon,
} from "../../../../assets/icon";

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
        <div className="flex items-center justify-between mb-[20px] md:mb-[10px]">
          <div className="hidden border border-[F0F0F0] p-[5px] rounded-lg md:flex items-center">
            <ColoredCardsIcon />
            <div className="font-AeonikProRegular text-[14px] ml-[5px]">
              Фильт цвет
            </div>
          </div>
          <div className="block md:hidden text-[20px] font-AeonikProMedium text-[#303030]">
            Все размеры
          </div>
          <button
            onClick={() => setColorModalOpen(false)}
            className="p-[5px] border border-[F2F2F2] rounded-lg"
          >
            <XIcon />
          </button>
        </div>

        <div className="h-[70vh] md:h-auto overflow-y-auto pr-[5px]">
          <div className="hidden md:flex items-center mb-5">
            <div className="mr-2 font-AeonikProRegular text-[14px]">
              Выбранный цвет:
            </div>
            <div className="w-5 h-5 rounded-full bg-black"></div>
          </div>

          <div className="mb-[15px] border border-[#F2F2F2] rounded-lg p-4">
            <div className="flex md:hidden items-center mb-[16px]">
              <div className="text-[14px] font-AeonikProRegular text-[#303030] mr-[10px]">
                Цвет:
              </div>
              <div className="text-[14px] text-white font-AeonikProMedium py-[3px] px-[15px] bg-black rounded-full">
                Черный
              </div>
            </div>

            <div className="flex justify-between mb-[25px] gap-[30px] md:gap-[0]">
              <div className="w-ful md:w-fit">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  Размер Груди
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    5
                  </div>
                </div>
              </div>

              <div className="w-ful md:w-fit">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Размер</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    21
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="bg-[#F8FCFF] h-[38px] w-[60px] flex items-center justify-center border border-[#E5E5E5] rounded-lg">
                    <PlusIcon />
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  Буквенный Размер
                </div>
                <div className="">
                  <div className="flex items-center mb-[10px]">
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        XXS
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        XS
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        S
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        M
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        L
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        XL
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        2XL
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        3XL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-[25px] gap-[30px] md:gap-[0]">
              <div className="w-full md:w-fit">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  Размер Талии
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    5
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    10
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  Размер Бедер
                </div>
                <div className="flex items-center">
                  <div className="w-full md:w-fit py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    15
                  </div>
                  <div className="min-w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="w-full md:w-fit py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    21
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Количество</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    6
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-[25px] gap-[30px] md:gap-[0]">
              <div className="">
                <div className="font-AeonikProRegular text-[16px] mb-[10px] text-[#303030]">
                  Возраст
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    40
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit">
                <div className="flex items-center font-AeonikProRegular text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Цена</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex w-full md:w-fit items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    10 000 000{" "}
                    <div className="ml-[8px] text-[14px] font-AeonikProRegular text-[#8C8C8C]">
                      сум
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit hidden md:block">
                <div className="flex items-center font-AeonikProRegular text-[16px] mb-[10px] text-[#303030]">
                  Скидка{" "}
                  <div className="text-[#8C8C8C] font-AeonikProMedium text-[13px] ml-[10px]">
                    (не обезательно)
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    13 <div className="text-[#8C8C8C] ml-[8px]">%</div>
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    10 000 000{" "}
                    <div className="ml-[8px] text-[14px] font-AeonikProRegular text-[#8C8C8C]">
                      сум
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden block mb-[25px]">
              <div className="font-AeonikProMedium text-[16px] text-[#303030]">
                Буквенный Размер
              </div>
              <div className="flex flex-wrap">
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    XXS
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    XS
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    S
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    M
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    L
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    XL
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    2XL
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    3XL
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="md:hidden block mb-[25px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Количество</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    6
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit md:hidden block">
                <div className="flex items-center font-AeonikProRegular text-[16px] mb-[10px] text-[#303030]">
                  Скидка{" "}
                  <div className="text-[#8C8C8C] font-AeonikProMedium text-[13px] ml-[10px]">
                    (не обезательно)
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    13 <div className="text-[#8C8C8C] ml-[8px]">%</div>
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    10 000 000{" "}
                    <div className="ml-[8px] text-[14px] font-AeonikProRegular text-[#8C8C8C]">
                      сум
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center">
                <div className="font-AeonikProRegular text-[16px] mr-[10px]">
                  Цвет:
                </div>
                <div className="bg-[#FFB029] text-[14px] font-AeonikProMedium py-[3px] px-[12px] rounded-[15px] text-white">
                  Желтый
                </div>
              </div>
            </div>
          </div>

          {/* copy */}
          <div className="mb-[15px] md:hidden border border-[#F2F2F2] rounded-lg p-4">
            <div className="flex md:hidden items-center mb-[16px]">
              <div className="text-[14px] font-AeonikProRegular text-[#303030] mr-[10px]">
                Цвет:
              </div>
              <div className="text-[14px] text-white font-AeonikProMedium py-[3px] px-[15px] bg-black rounded-full">
                Черный
              </div>
            </div>

            <div className="flex justify-between mb-[25px] gap-[30px] md:gap-[0]">
              <div className="w-ful md:w-fit">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  Размер Груди
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    5
                  </div>
                </div>
              </div>

              <div className="w-ful md:w-fit">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Размер</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    21
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="bg-[#F8FCFF] h-[38px] w-[60px] flex items-center justify-center border border-[#E5E5E5] rounded-lg">
                    <PlusIcon />
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  Буквенный Размер
                </div>
                <div className="">
                  <div className="flex items-center mb-[10px]">
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        XXS
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        XS
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        S
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        M
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        L
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        XL
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        2XL
                      </div>
                    </div>
                    <div className="flex items-center cursor-pointer mr-[10px]">
                      <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                      <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                        3XL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-[25px] gap-[30px] md:gap-[0]">
              <div className="w-full md:w-fit">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  Размер Талии
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    5
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    10
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  Размер Бедер
                </div>
                <div className="flex items-center">
                  <div className="w-full md:w-fit py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    15
                  </div>
                  <div className="min-w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="w-full md:w-fit py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    21
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Количество</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    6
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-[25px] gap-[30px] md:gap-[0]">
              <div className="">
                <div className="font-AeonikProRegular text-[16px] mb-[10px] text-[#303030]">
                  Возраст
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    40
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit">
                <div className="flex items-center font-AeonikProRegular text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Цена</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex w-full md:w-fit items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    10 000 000{" "}
                    <div className="ml-[8px] text-[14px] font-AeonikProRegular text-[#8C8C8C]">
                      сум
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit hidden md:block">
                <div className="flex items-center font-AeonikProRegular text-[16px] mb-[10px] text-[#303030]">
                  Скидка{" "}
                  <div className="text-[#8C8C8C] font-AeonikProMedium text-[13px] ml-[10px]">
                    (не обезательно)
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    13 <div className="text-[#8C8C8C] ml-[8px]">%</div>
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    10 000 000{" "}
                    <div className="ml-[8px] text-[14px] font-AeonikProRegular text-[#8C8C8C]">
                      сум
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden block mb-[25px]">
              <div className="font-AeonikProMedium text-[16px] text-[#303030]">
                Буквенный Размер
              </div>
              <div className="flex flex-wrap">
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    XXS
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    XS
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    S
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    M
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    L
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    XL
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    2XL
                  </div>
                </div>
                <div className="mt-[12px] flex items-center cursor-pointer mr-[10px]">
                  <div className="w-4 h-4 border border-[#B5B5B5] rounded-sm mr-[5px]"></div>
                  <div className="font-AeonikProMedium text-[#A1A1A1] text-[14px]">
                    3XL
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="md:hidden block mb-[25px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Количество</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    6
                  </div>
                </div>
              </div>

              <div className="w-full md:w-fit md:hidden block">
                <div className="flex items-center font-AeonikProRegular text-[16px] mb-[10px] text-[#303030]">
                  Скидка{" "}
                  <div className="text-[#8C8C8C] font-AeonikProMedium text-[13px] ml-[10px]">
                    (не обезательно)
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    13 <div className="text-[#8C8C8C] ml-[8px]">%</div>
                  </div>
                  <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProRegular text-[16px] border border-[#E5E5E5] rounded-lg">
                    10 000 000{" "}
                    <div className="ml-[8px] text-[14px] font-AeonikProRegular text-[#8C8C8C]">
                      сум
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center">
                <div className="font-AeonikProRegular text-[16px] mr-[10px]">
                  Цвет:
                </div>
                <div className="bg-[#FFB029] text-[14px] font-AeonikProMedium py-[3px] px-[12px] rounded-[15px] text-white">
                  Желтый
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
