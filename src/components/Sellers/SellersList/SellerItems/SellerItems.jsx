/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "../../../../assets/icon";
import axios from "axios";
import { IdsContext } from "../../../../context/idContext";
import { SellersDataContext } from "../../../../context/sellersDataContext";
import { ShopsDataContext } from "../../../../context/shopsDataContext";
import { LocationsDataContext } from "../../../../context/locationsDataContext";
import { ClothesDataContext } from "../../../../context/clothesDataContext";
import { ReFreshTokenContext } from "../../../../context/reFreshToken";

export default function SellerItems({
  data,
  setModalOpen,
  index,
  toast,
  showSellers,
  setMassiveCheckeds,
  massiveCheckeds,
  allChecked,
  setSomeChecked,
}) {
  const [, , reFetch] = useContext(SellersDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);
  const [, , shopsReFetch] = useContext(ShopsDataContext);
  const [, , locationsReFetch] = useContext(LocationsDataContext);
  const [, , clothesReFetch] = useContext(ClothesDataContext);

  const url = "https://api.dressme.uz";

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-seller-status/${data?.id}`,
        {
          status: "approved",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((d) => {
        if (d.status === 200) {
          toast.success(d?.data?.message);
          reFetch();
          shopsReFetch();
          locationsReFetch();
          clothesReFetch();
        }
      })
      .catch((v) => {
        if (v?.response?.status === 401 || v?.response?.status === 403) {
          reFreshTokenFunc();
          approveFunc();
        }
      });
  };

  const [, setId] = useContext(IdsContext);

  const [ckeck, setCheck] = useState(false);

  useEffect(() => {
    if (massiveCheckeds?.includes(data?.id)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [massiveCheckeds]);

  useEffect(() => {
    if (allChecked) {
      // setMassiveCheckeds([...massiveCheckeds, data?.id]);
      setMassiveCheckeds((prev) => [...prev, data?.id]);
    } else {
      setMassiveCheckeds((prevState) =>
        prevState.filter((id) => id !== data?.id)
      );
    }
  }, [allChecked]);

  return (
    <div className="flex items-center w-full">
      <div
        onClick={() => {
          setSomeChecked(true);
          if (massiveCheckeds?.includes(data?.id)) {
            setMassiveCheckeds((prevState) =>
              prevState.filter((id) => id !== data?.id)
            );
          } else {
            setMassiveCheckeds([...massiveCheckeds, data?.id]);
          }
        }}
        className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
          ckeck
            ? "bg-[#007DCA] border-[#007DCA]"
            : "bg-white border-checkboxBorder"
        } hidden md:flex items-center justify-center rounded mr-[8px]`}
      >
        <span
          className={`${ckeck ? "flex items-center justify-center" : "hidden"}`}
        >
          <CheckIcon />
        </span>
      </div>
      <div className="hidden border-lightBorderColor border rounded-[12px] bg-white px-5 h-[58px] md:flex items-center w-full">
        <div className="w-[3%]   text-tableTextTitle2 text-[13px] not-italic font-AeonikProMedium">
          {index}
        </div>
        <div className="w-[10%] px-2 flex items-center text-tableTextTitle2 text-[13px] not-italic font-AeonikProMedium">
          {data?.name}
        </div>
        <div className="w-[15%] px-2 flex items-center text-tableTextTitle2 text-[13px] not-italic font-AeonikProMedium">
          <a href={`${"tel:" + data?.phone}`}>{data?.phone}</a>
        </div>
        <div className="w-[15%] px-2 flex items-center text-tableTextTitle2 text-[13px] not-italic font-AeonikProMedium">
          {data?.seller_type?.type_ru}
        </div>
        <div className="w-[11%] px-2 flex items-center text-tableTextTitle2 text-[13px] not-italic font-AeonikProMedium">
          {data?.created_at}
        </div>
        <div className="w-[20%] px-2 pr-3 flex items-center text-tableTextTitle2 text-[13px] not-italic font-AeonikProMedium">
          {data?.region?.name_ru}, {data?.sub_region?.name_ru}
        </div>
        <div className="w-[8%]">
          <Link
            to={`seller/${data?.id}`}
            className="cursor-pointer flex items-center justify-center text-center hover:underline text-weatherWinterColor text-[16px] not-italic font-AeonikProMedium"
          >
            Подробнее
          </Link>
        </div>

        <div className="w-[18%] px-2 flex items-center justify-end gap-x-2 text-tableTextTitle2 text-[13px] not-italic font-AeonikProMedium">
          {showSellers !== "updated" ? (
            <div className="flex items-center gap-x-2">
              {" "}
              <button
                onClick={() => approveFunc()}
                className={`${
                  data?.status === "pending" || data?.status === "declined"
                    ? ""
                    : "hidden"
                } w-fit px-2 py-1 rounded-[20px] font-AeonikProMedium border border-[#5EB267] text-[#5EB267]`}
              >
                Одобрить
              </button>
              <button
                onClick={() => {
                  setId({ type: "single", id: data?.id });
                  setModalOpen(true);
                }}
                className={`${
                  data?.status === "pending" || data?.status === "approved"
                    ? ""
                    : "hidden"
                } w-fit px-2 py-1 rounded-[20px] font-AeonikProMedium border border-[#E85353] text-[#E85353]`}
              >
                Отказать
              </button>
            </div>
          ) : null}

          {showSellers === "updated" ? (
            <button
              onClick={() => approveFunc()}
              className={`w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
            >
              Одобрить
            </button>
          ) : null}
        </div>
      </div>

      {/* Mobile */}

      <div className="block md:hidden border rounded-[8px] border-[#F2F2F2] p-[10px] w-full mb-[12px] last:mb-[0]">
        <div className="flex items-center w-full justify-between mb-[8px]">
          <div
            onClick={() => {
              setSomeChecked(true);
              if (massiveCheckeds?.includes(data?.id)) {
                setMassiveCheckeds((prevState) =>
                  prevState.filter((id) => id !== data?.id)
                );
              } else {
                setMassiveCheckeds([...massiveCheckeds, data?.id]);
              }
            }}
            className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
              ckeck
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } md:hidden flex items-center justify-center rounded mr-[8px]`}
          >
            <span
              className={`${
                ckeck ? "flex items-center justify-center" : "hidden"
              }`}
            >
              <CheckIcon size={"small"} />
            </span>
          </div>

          <div className="flex items-center">
            <div className="border-b min-w-[10px]"></div>
            <div className="mx-[5px] text-[16px] font-AeonikProRegular text-[#D2D2D2]">
              {index < 10 ? "0" : ""}
              {index}
            </div>
            <div className="border-b min-w-[10px]"></div>
          </div>

          <Link
            to={`seller/${data?.id}`}
            className="text-[#007DCA] text-[13px] font-AeonikProMedium cursor-pointer"
          >
            Подробнее
          </Link>
        </div>

        <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
          <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[25%]">
            Имя
          </div>
          <div className="text-[#3F6175] text-[13px] px-3 font-AeonikProMedium w-[40%]">
            Номер
          </div>
          <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[35%]">
            Тип
          </div>
        </div>

        <div className="py-[5px] px-[15px] flex mb-[10px]">
          <div className="w-[25%] text-[13px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.name}
          </div>
          <div className="w-[40%] px-3 text-[13px] font-AeonikProMedium text-[#2C2C2C]">
            <a href={`${"tel:" + data?.phone}`}>{data?.phone}</a>
          </div>
          <div className="w-[35%] text-[13px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.seller_type?.type_ru}
          </div>
        </div>

        <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
          <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[25%]">
            Дата
          </div>
          <div className="text-[#3F6175] px-3 text-[13px] font-AeonikProMedium w-[40%]">
            Регион
          </div>
        </div>

        <div className="py-[5px] px-[15px] flex mb-[24px]">
          <div className="w-[25%] text-[13px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.created_at}
          </div>
          <div className="w-[40%] px-3 text-[13px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.region?.name_ru}, {data?.sub_region?.name_ru}
          </div>
        </div>

        {showSellers !== "updated" ? (
          <div className="w-full flex gap-x-4 md:gap-x-[30px]">
            <button
              onClick={() => {
                setId({ type: "single", id: data?.id });
                setModalOpen(true);
              }}
              className={`${
                data?.status === "pending" || data?.status === "approved"
                  ? ""
                  : "hidden"
              } rounded-[8px] py-[8px] w-full bg-[#FFE1E1] text-[13px] font-AeonikProMedium text-[#E51515]`}
            >
              Отказать
            </button>
            <button
              onClick={() => approveFunc()}
              className={`${
                data?.status === "pending" || data?.status === "declined"
                  ? ""
                  : "hidden"
              } rounded-[8px] py-[8px] w-full bg-[#DEFCE1] text-[13px] font-AeonikProMedium text-[#12C724]`}
            >
              Одобрить
            </button>
          </div>
        ) : null}
        {showSellers === "updated" ? (
          <div className="w-full flex gap-[30px]">
            <button
              onClick={() => approveFunc()}
              className={` rounded-[8px] py-[8px] w-full bg-[#DEFCE1] text-[13px] font-AeonikProMedium text-[#12C724]`}
            >
              Одобрить
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
