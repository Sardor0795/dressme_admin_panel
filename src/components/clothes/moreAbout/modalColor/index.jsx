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
  data,
}) {
  let mockData = [
    {
      id: 5,
      product_id: "12",
      shop_location_id: "8",
      letter_size: "M",
      amount: "5",
      product_color_id: "1",
      wear_size: "61.00",
      length: null,
      width: null,
      measure_unit: "cm",
      price: "261474",
      discount_price: null,
      discount_percent: null,
      currency: "UZS",
      created_at: "2023-11-10T13:00:25.000000Z",
      updated_at: "2023-11-10T13:00:25.000000Z",
    },
    {
      id: 5,
      product_id: "12",
      shop_location_id: "8",
      letter_size: "M",
      amount: "5",
      product_color_id: "1",
      wear_size: "61.00",
      length: null,
      width: null,
      measure_unit: "cm",
      price: "261474",
      discount_price: null,
      discount_percent: null,
      currency: "UZS",
      created_at: "2023-11-10T13:00:25.000000Z",
      updated_at: "2023-11-10T13:00:25.000000Z",
    },
  ];

  return (
    <div className={`w-full px-4  md:px-10`}>
      <div
        className={`fixed cursor-pointer z-[200] inset-0 w-full h-full bg-black opacity-40 ${
          colorModalOpen ? "" : "hidden"
        }`}
        onClick={() => setColorModalOpen(false)}
      ></div>

      <section
        className={`max-w-[750px] pt-[70px] z-[201] w-full flex-col h-fit bg-white fixed px-5 py-10 rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
          colorModalOpen
            ? " bottom-0 md:flex"
            : "md:hidden bottom-[-800px] z-[-10]"
        }`}
      >
        <div className="border p-[20px] rounded-lg w-full h-fit max-h-[70vh] md:max-h-[60vh] overflow-y-auto">
          {/* Category 1 full ++ */}

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
                      {data?.headwear_price?.min_head_girth
                        ? data?.headwear_price?.min_head_girth
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.headwear_price?.max_head_girth
                        ? data?.headwear_price?.max_head_girth
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="px-[10px] mb-[34px]">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                    One Size{" "}
                    <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
                  </div>
                  <div>
                    <div
                      className={`w-[44px] h-[22px] ${
                        data?.headwear_price?.one_size
                          ? "bg-[#1677FF] justify-end"
                          : "bg-[#8B8B8B] justify-start"
                      }  rounded-2xl p-[1px] flex`}
                    >
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
                      {data?.headwear_price?.amount
                        ? data?.headwear_price?.amount
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap justify-between">
                <div className="">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                    Возраст
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.headwear_price?.age
                        ? data?.headwear_price?.age
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="px-[10px]">
                  <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                    <span className="mr-[8px]">Цена</span> <StarIcon />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">
                        {data?.headwear_price?.price
                          ? data?.headwear_price?.price
                          : "-"}
                      </div>{" "}
                      <div className="text-[#8C8C8C]">сум</div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                    Скидка
                    <span className="text-[#8C8C8C] ml-[8px]">
                      (необязательно)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                        <div className="mr-[15px]">
                          {data?.headwear_price?.discount_price
                            ? data?.headwear_price?.discount_price
                            : "-"}
                        </div>{" "}
                        <div className="text-[#8C8C8C]">сум</div>
                      </div>
                      <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                      <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                        <div className="mr-[15px]">
                          {data?.headwear_price?.discount_percent
                            ? data?.headwear_price?.discount_percent
                            : "-"}
                        </div>{" "}
                        <div className="text-[#8C8C8C]">%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Category 2 full ++ */}

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
                      {data?.outwear_price?.min_chest_girth
                        ? data?.outwear_price?.min_chest_girth
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.outwear_price?.max_chest_girth
                        ? data?.outwear_price?.max_chest_girth
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="px-[10px] mb-[34px]">
                  <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                    <div className="mr-[5px]">Размер</div> <StarIcon />
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.outwear_price?.min_wear_size
                        ? data?.outwear_price?.min_wear_size
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.outwear_price?.max_wear_size
                        ? data?.outwear_price?.max_wear_size
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="mb-[34px]">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                    Буквенный Размер
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.outwear_price?.letter_size
                        ? data?.outwear_price?.letter_size
                        : "-"}
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
                      {data?.outwear_price?.min_waist_girth
                        ? data?.outwear_price?.min_waist_girth
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.outwear_price?.max_waist_girth
                        ? data?.outwear_price?.max_waist_girth
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="mb-[34px] px-[10px]">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                    Обхват Бедер
                    <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.outwear_price?.min_hip_girth
                        ? data?.outwear_price?.min_hip_girth
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.outwear_price?.max_hip_girth
                        ? data?.outwear_price?.max_hip_girth
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="mb-[34px]">
                  <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                    <span className="mr-[8px]">Количество</span> <StarIcon />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">
                        {data?.outwear_price?.amount
                          ? data?.outwear_price?.amount
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap justify-between">
                <div className="">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                    Возраст
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.outwear_price?.age
                        ? data?.outwear_price?.age
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="px-[20px]">
                  <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                    <span className="mr-[8px]">Цена</span> <StarIcon />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">
                        {data?.outwear_price?.price
                          ? data?.outwear_price?.price
                          : "-"}
                      </div>{" "}
                      <div className="text-[#8C8C8C]">сум</div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                    Скидка
                    <span className="text-[#8C8C8C] ml-[8px]">
                      (необязательно)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                        <div className="mr-[15px]">
                          {data?.outwear_price?.discount_price
                            ? data?.outwear_price?.discount_price
                            : "-"}
                        </div>{" "}
                        <div className="text-[#8C8C8C]">сум</div>
                      </div>
                      <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                      <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                        <div className="mr-[15px]">
                          {data?.outwear_price?.discount_percent
                            ? data?.outwear_price?.discount_percent
                            : "-"}
                        </div>{" "}
                        <div className="text-[#8C8C8C]">%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Category 3 full ++*/}

          {category === "3" ? (
            <div className="text-[#303030] border border-[F0F0F0] p-[30px] rounded-lg h-[70vh] md:h-auto overflow-y-auto">
              <div className="flex flex-wrap md:flex-nowrap justify-between">
                <div className="mb-[34px] pr-[10px]">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                    Обхват Талии
                    <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.underwear_price?.min_waist_girth
                        ? data?.underwear_price?.min_waist_girth
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.underwear_price?.max_waist_girth
                        ? data?.underwear_price?.max_waist_girth
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="mb-[34px]">
                  <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                    <div className="mr-[5px]">Размер</div> <StarIcon />
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.underwear_price?.min_wear_size
                        ? data?.underwear_price?.min_wear_size
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.underwear_price?.max_wear_size
                        ? data?.underwear_price?.max_wear_size
                        : "-"}
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
                      {data?.underwear_price?.min_hip_girth
                        ? data?.underwear_price?.min_hip_girth
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.underwear_price?.max_hip_girth
                        ? data?.underwear_price?.max_hip_girth
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="mb-[34px] px-[10px]">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                    Рост
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.underwear_price?.min_height
                        ? data?.underwear_price?.min_height
                        : "-"}
                    </div>
                    <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.underwear_price?.max_height
                        ? data?.underwear_price?.max_height
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="mb-[34px]">
                  <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                    <span className="mr-[8px]">Количество</span> <StarIcon />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">
                        {data?.underwear_price?.amount
                          ? data?.underwear_price?.amount
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap justify-between">
                <div className="">
                  <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                    <span className="mr-[8px]">Цена</span> <StarIcon />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      <div className="mr-[15px]">
                        {data?.underwear_price?.price
                          ? data?.underwear_price?.price
                          : "-"}
                      </div>
                      <div className="text-[#8C8C8C]">сум</div>
                    </div>
                  </div>
                </div>
                <div className="px-[10px]">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                    Скидка
                    <span className="text-[#8C8C8C] ml-[8px]">
                      (необязательно)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                        <div className="mr-[15px]">
                          {data?.underwear_price?.discount_percent
                            ? data?.underwear_price?.discount_percent
                            : "-"}
                        </div>
                        <div className="text-[#8C8C8C]">%</div>
                      </div>
                      <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                      <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                        <div className="mr-[15px]">
                          {data?.underwear_price?.discount_price
                            ? data?.underwear_price?.discount_price
                            : "-"}
                        </div>
                        <div className="text-[#8C8C8C]">сум</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                    Буквенный Размер
                  </div>
                  <div className="flex items-center">
                    <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                      {data?.underwear_price?.letter_size
                        ? data?.underwear_price?.letter_size
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Category 4 */}

          {category === "4"
            ? data?.footwear_sizes?.map((item) => {
                return (
                  <div className="text-[#303030] border border-[F0F0F0] p-[20px] md:p-[30px] mb-[15px] last:mb-[0] rounded-lg">
                    <div className="flex flex-wrap md:flex-nowrap justify-between">
                      <div className="mb-[34px] w-full md:w-fit">
                        <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                          <div className="mr-[5px]">Размер</div> <StarIcon />
                        </div>
                        <div className="flex items-center w-full md:w-fit">
                          <div className="py-[10px] px-[20px] w-full font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            {item?.wear_size ? item?.wear_size : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="mb-[34px] md:px-[20px] w-full md:w-fit">
                        <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                          Длина Стопы
                          <span className="text-[#8C8C8C] ml-[8px]">(см)</span>
                        </div>
                        <div className="flex items-center w-full md:w-fit">
                          <div className="w-full md:w-fit py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            {item?.min_foot_length
                              ? item?.min_foot_length
                              : "-"}
                          </div>
                          <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                          <div className="w-full md:w-fit py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            {item?.wear_size ? item?.wear_size : "-"}
                          </div>
                        </div>
                      </div>

                      <div className="mb-[34px] w-full md:w-fit">
                        <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                          <span className="mr-[8px]">Количество</span>{" "}
                          <StarIcon />
                        </div>
                        <div className="flex items-center w-full md:w-fit">
                          <div className="w-full md:w-fit flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            <div className="mr-[15px]">
                              {item?.amount ? item?.amount : "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap justify-between">
                      <div className="w-full md:w-fit mb-[34px] md:mb-[0]">
                        <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                          Возраст
                        </div>
                        <div className="flex items-center w-full md:w-fit">
                          <div className="w-full md:w-fit py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            {item?.age ? item?.age : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="md:px-[20px] w-full md:w-fit mb-[34px] md:mb-0">
                        <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                          <span className="mr-[8px]">Цена</span> <StarIcon />
                        </div>
                        <div className="flex items-center w-full md:w-fit">
                          <div className="w-full md:w-fit flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            <div className="mr-[5px]">
                              {item?.price ? item?.price : "-"}
                            </div>{" "}
                            <div className="text-[#8C8C8C]">сум</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-fit">
                        <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                          Скидка
                          <span className="text-[#8C8C8C] ml-[8px]">
                            (необязательно)
                          </span>
                        </div>
                        <div className="flex items-center w-full md:w-fit">
                          <div className="w-full md:w-fit flex items-center">
                            <div className="w-full md:w-fit flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                              <div className="mr-[5px]">
                                {item?.discount_percent
                                  ? item?.discount_percent
                                  : "-"}
                              </div>{" "}
                              <div className="text-[#8C8C8C]">%</div>
                            </div>
                            <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                            <div className="w-full md:w-fit flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                              <div className="mr-[5px]">
                                {item?.discount_price
                                  ? item?.discount_price
                                  : "-"}
                              </div>{" "}
                              <div className="text-[#8C8C8C]">сум</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}

          {/* Category 5 */}

          {category === "5"
            ? data?.accessory_sizes?.map((item) => {
                return (
                  <div className="text-[#303030] border mb-[15px] last:mb-[0] border-[F0F0F0] p-[30px] rounded-lg h-[70vh] md:h-auto overflow-y-auto">
                    <div className="flex flex-wrap md:flex-nowrap justify-between">
                      <div className="mb-[34px] w-full md:w-fit">
                        <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px] text-[#303030]">
                          <div className="mr-[5px]">Размер</div> <StarIcon />
                        </div>
                        <div className="flex w-full md:w-fit items-center">
                          <div className="w-full md:w-fit py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            {item?.wear_size ? item?.wear_size : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="mb-[34px] md:px-[20px]">
                        <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                          Буквенный Размер
                        </div>
                        <div className="flex items-center">
                          <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            {item?.letter_size ? item?.letter_size : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="mb-[34px]">
                        <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                          Возраст
                        </div>
                        <div className="flex items-center">
                          <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            {item?.age ? item?.age : "-"}
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
                            {item?.length ? item?.length : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="mb-[34px] px-[20px]">
                        <div className="font-AeonikProMedium text-[16px] mb-[10px]">
                          Ширина
                        </div>
                        <div className="flex items-center">
                          <div className="py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            {item?.width ? item?.width : "-"}
                          </div>
                        </div>
                      </div>
                      <div className=" mb-[34px]">
                        <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                          <span className="mr-[8px]">Количество</span>{" "}
                          <StarIcon />
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            <div className="mr-[15px]">
                              {item?.amount ? item?.amount : "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap justify-between">
                      <div className="mb-[34px] md:mb-[0] w-full md:w-fit md:pr-[20px]">
                        <div className="flex items-center font-AeonikProMedium text-[16px] mb-[10px]">
                          <span className="mr-[8px]">Цена</span> <StarIcon />
                        </div>
                        <div className="w-full md:w-fit flex items-center">
                          <div className="w-full md:w-fit flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                            <div className="mr-[15px]">
                              {item?.price ? item?.price : "-"}
                            </div>
                            <div className="text-[#8C8C8C]">сум</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-fit">
                        <div className="font-AeonikProMedium text-[16px] mb-[10px] flex items-center">
                          Скидка
                          <span className="text-[#8C8C8C] ml-[8px]">
                            (необязательно)
                          </span>
                        </div>
                        <div className="w-full md:w-fit flex items-center">
                          <div className="w-full md:w-fit flex items-center">
                            <div className="flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                              <div className="mr-[15px]">
                                {item?.discount_percent
                                  ? item?.discount_percent
                                  : "-"}
                              </div>{" "}
                              <div className="text-[#8C8C8C]">%</div>
                            </div>
                            <div className="w-[15px] border-t border-[#E5E5E5] mx-[5px]"></div>
                            <div className="w-full md:w-fit flex items-center py-[10px] px-[20px] font-AeonikProMedium text-[16px] border border-[#E5E5E5] rounded-lg">
                              <div className="w-full md:w-fit mr-[15px]">
                                {item?.discount_price
                                  ? item?.discount_price
                                  : "-"}
                              </div>{" "}
                              <div className="text-[#8C8C8C]">сум</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

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
