import { useState } from "react";
import {
  ColoredCardsIcon,
  PlusIcon,
  StarIcon,
  XIcon,
} from "../../../../assets/icon";

export default function ColorModal({
  setColorModalOpen,
  colorModalOpen,
  category,
}) {
  return (
    <div className={`w-full px-4  md:px-10`}>
      <div
        className={`fixed cursor-pointer z-[200] inset-0 w-full h-full bg-black opacity-40 ${
          colorModalOpen ? "" : "hidden"
        }`}
        onClick={() => setColorModalOpen(false)}
      ></div>

      <section
        className={`max-w-[650px] pt-[85px] z-[201] w-full flex-col h-fit bg-white fixed px-10 py-10 rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
          colorModalOpen
            ? " bottom-0 md:flex"
            : "md:hidden bottom-[-800px] z-[-10]"
        }`}
      >
        {/* Category 1 */}

        {category === "1" ? (
          <div className="text-[#303030] border border-[F0F0F0] p-[30px] rounded-lg h-[70vh] md:h-auto overflow-y-auto">
            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Обхват головы{" "}
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
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
              <div className="px-[20px] mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  One Size <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
                </div>
                <div>
                  <div className="w-[44px] h-[22px] bg-[#8B8B8B] rounded-2xl p-[1px]">
                    <div className="h-[20px] w-[20px] bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                  Количество <span className="text-[#8C8C8C] mx-2">(см)</span>
                  <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Возраст
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Цена</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>{" "}
                    <div className="text-[#8C8C8C]">сум</div>
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                  Скидка
                  <span className="text-[#8C8C8C] ml-[8px]">
                    (необязательно)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">сум</div>
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Category 2 */}

        {category === "2" ? (
          <div className="text-[#303030] border border-[F0F0F0] p-[30px] rounded-lg h-[70vh] md:h-auto overflow-y-auto">
            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Обхват Груди
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
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
              <div className="px-[20px] mb-[34px]">
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
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                  Буквенный Размер
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Обхват Талии
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
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
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Обхват Бедер
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
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
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Количество</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Возраст
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Цена</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>{" "}
                    <div className="text-[#8C8C8C]">сум</div>
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                  Скидка
                  <span className="text-[#8C8C8C] ml-[8px]">
                    (необязательно)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">сум</div>
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Category 3 */}

        {category === "3" ? (
          <div className="text-[#303030] border border-[F0F0F0] p-[30px] rounded-lg h-[70vh] md:h-auto overflow-y-auto">
            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Обхват Талии
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
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
              <div className="px-[20px] mb-[34px]">
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
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                  Буквенный Размер
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Обхват Бедер
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
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
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Рост
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
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Количество</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Возраст
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Цена</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>{" "}
                    <div className="text-[#8C8C8C]">сум</div>
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                  Скидка
                  <span className="text-[#8C8C8C] ml-[8px]">
                    (необязательно)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">%</div>
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">сум</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Category 4 */}

        {category === "4" ? (
          <div className="text-[#303030] border border-[F0F0F0] p-[30px] rounded-lg h-[70vh] md:h-auto overflow-y-auto">
            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Размер</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    21
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Длина Стопы
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
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

              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Количество</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Возраст
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Цена</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>{" "}
                    <div className="text-[#8C8C8C]">сум</div>
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                  Скидка
                  <span className="text-[#8C8C8C] ml-[8px]">
                    (необязательно)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">%</div>
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">сум</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Category 5 */}

        {category === "5" ? (
          <div className="text-[#303030] border border-[F0F0F0] p-[30px] rounded-lg h-[70vh] md:h-auto overflow-y-auto">
            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                  <div className="mr-[5px]">Размер</div> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    21
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Длина Стопы
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
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

              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Количество</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Длина
                  <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Ширина
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Количество</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between">
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                  Возраст
                </div>
                <div className="flex items-center">
                  <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    2
                  </div>
                </div>
              </div>
              <div className="px-[20px] mb-[34px]">
                <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                  <span className="mr-[8px]">Цена</span> <StarIcon />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                    <div className="mr-[15px]">2</div>{" "}
                    <div className="text-[#8C8C8C]">сум</div>
                  </div>
                </div>
              </div>
              <div className="mb-[34px]">
                <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                  Скидка
                  <span className="text-[#8C8C8C] ml-[8px]">
                    (необязательно)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">%</div>
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">2</div>{" "}
                      <div className="text-[#8C8C8C]">сум</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* X btn */}
        <button
          onClick={() => setColorModalOpen(false)}
          className="absolute right-4 top-4 p-[5px] border border-[F2F2F2] rounded-lg"
        >
          <XIcon />
        </button>
      </section>
    </div>
  );
}
