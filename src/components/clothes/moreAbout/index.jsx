import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon, StarIcon } from "../../../assets/icon";
import { Space, DatePicker } from "antd";
import CancelModal from "./modalCancel";
import ColorModal from "./modalColor";
import Carousel from "./carousel";

export const ClothMoreAbout = () => {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="border-b py-[18px] flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="rounded-md border border-[#D5D5D5] mr-auto"
        >
          <BackIcon />
        </button>

        <section className="mobileDate hidden md:flex items-center">
          <Space direction="vertical" size={12}>
            <RangePicker style={{ fontSize: "16px", paddingBlock: "12px" }} />
          </Space>
        </section>
      </div>

      <div className="w-full flex items-center justify-between my-9">
        <div className="bg-[#E5F2FA] py-[5px] px-[10px] rounded-[4px] font-AeonikProMedium text-[18px]">
          <span className="text-[#007DCA]">Обновлено: </span>
          Фото/цвет, Информация
        </div>

        <div className="flex items-center ml-auto">
          <button
            type="button"
            className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
          >
            Одобрить
          </button>
          <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className="text-[#E51515] text-lg not-italic font-AeonikProMedium"
          >
            Отказать
          </button>
        </div>
      </div>

      <div className="flex mx-auto">
        <div className="w-[350px] h-[400px]">
          <div className="flex items-center mb-[5px]">
            <div className="font-AeonikProRegular text-[16px] mr-[5px] ml-[10px]">
              Фото
            </div>
            <StarIcon />
          </div>
          <Carousel />
        </div>

        <div className="px-[30px] border-r border-[#E5E5E5] flex gap-[30px]">
          <div className="font-AeonikProRegular text-[16px] w-[350px]">
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Раздел одежды</span> <StarIcon />
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              Lorem Ipsum
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Сезон одежды</span> <StarIcon />
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              Lorem Ipsum
            </div>
            <div className="flex mb-[25px]">
              <div className="mr-[15px]">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Пол</span> <StarIcon />
                </div>
                <div className="border border-[#E5E5E5] rounded-[8px] p-3">
                  Lorem Ipsum
                </div>
              </div>
              <div>
                <div className="mr-[5px] mb-[5px]">Возрастная категория</div>
                <div className="flex items-center">
                  <div className="border border-[#E5E5E5] rounded-[8px] py-3 px-5">
                    10
                  </div>
                  <span className="border-t border-[#E5E5E5] w-[15px] mx-[5px]"></span>
                  <div className="border border-[#E5E5E5] rounded-[8px] py-3 px-5">
                    20
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Категория одежды</span> <StarIcon />
            </div>
            <div className="flex justify-between mb-[25px]">
              <button className="font-AeonikProMedium text-[16px] min-w-[160px] rounded-lg bg-[#007DCA] py-[12px] px-[15px] text-white">
                Верхняя одежда
              </button>
              <button
                onClick={() => setColorModalOpen(true)}
                className="font-AeonikProMedium text-[16px] min-w-[160px] border-[1.5px] border-[#007DCA] rounded-lg text-[#007DCA] py-[12px] px-[15px] bg-white"
              >
                Все размеры
              </button>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Качество на русском</span> <StarIcon />
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              Lorem Ipsum
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Состав на русском</span>
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              <span className="font-AeonikProMedium text-[16px] py-[6px] px-5 bg-[#007DCA] rounded-md text-white">
                хлопок
              </span>
            </div>
          </div>

          <div className="w-[350px]">
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Подраздел одежды</span> <StarIcon />
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              Lorem Ipsum
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Цвет</span> <StarIcon />
            </div>
            <div className="w-[42px] h-[42px] flex items-center justify-center border border-[#E5E5E5] rounded-[8px] mb-[25px]">
              <div className="w-[22px] h-[22px] bg-black rounded-[50%]"></div>
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Артикул</span>
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              Lorem Ipsum
            </div>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Тип</span>
                  <StarIcon />
                </div>
                <div className="w-[160px] border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  Lorem Ipsum
                </div>
              </div>
              <div>
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Страна размера</span>
                  <StarIcon />
                </div>
                <div className="w-[160px] border border-[#E5E5E5] text-[#A1A1A1] rounded-[8px] p-3 mb-[25px]">
                  Выбрать
                </div>
              </div>
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Качество на узбекском</span>{" "}
              <StarIcon />
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              Lorem Ipsum
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Состав на узбекском</span>
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              Lorem Ipsum
            </div>
          </div>
        </div>

        <div className="ml-[40px] w-[350px]">
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Название на русском</span> <StarIcon />
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
            Lorem Ipsum
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Название на узбекском</span> <StarIcon />
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
            Lorem Ipsum
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Описание на русском</span> <StarIcon />
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] text-[14px] text-[#666] p-3 mb-[25px]">
            Lorem ipsum dolor sit amet consectetur. Accumsan pulvinar eros sed
            et. Neque vestibulum turpis eu dignissim nisl in tellus. Adipiscing
            morbi lacinia morbi duis non nec.
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Описание на русском</span> <StarIcon />
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] text-[14px] text-[#666] p-3 mb-[25px]">
            Lorem ipsum dolor sit amet consectetur. Accumsan pulvinar eros sed
            et. Neque vestibulum turpis eu dignissim nisl in tellus. Adipiscing
            morbi lacinia morbi duis non nec.
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Бренд</span>
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
            Lorem Ipsum
          </div>
        </div>
      </div>

      <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <ColorModal
        setColorModalOpen={setColorModalOpen}
        colorModalOpen={colorModalOpen}
      />
    </div>
  );
};
