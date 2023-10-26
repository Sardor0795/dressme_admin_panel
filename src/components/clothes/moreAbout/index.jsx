import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "../../../assets/icon";
import { Space, DatePicker } from "antd";
import CancelModal from "./modalCancel";

export const ClothMoreAbout = () => {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
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

      <div>{/* Carousel */}</div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div></div>

      <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  );
};
