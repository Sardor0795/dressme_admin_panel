/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, NoImgIcon } from "../../../../assets/icon";
import axios from "axios";
import { IdsContext } from "../../../../context/idContext";
import { LocationsDataContext } from "../../../../context/locationsDataContext";
import { ClothesDataContext } from "../../../../context/clothesDataContext";
import { ReFreshTokenContext } from "../../../../context/reFreshToken";

export default function LocationsItem({
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
  const url = "https://api.dressme.uz";

  const [, , reFetch] = useContext(LocationsDataContext);
  const [, , clothesReFetch] = useContext(ClothesDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-location-status/${data?.id}`,
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
          clothesReFetch();
        }
      })
      .catch((v) => {
        if (v?.response?.status === 401) {
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
      setMassiveCheckeds((prev) => [...prev, data?.id]);
    } else {
      setMassiveCheckeds((prevState) =>
        prevState.filter((id) => id !== data?.id)
      );
    }
  }, [allChecked]);

  return (
    <div className="flex items-center w-full mb-8">
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
      <div
        key={data?.id}
        className="w-full h-full flex flex-col md:rounded-[12px] overflow-auto rounded-xl border  bg-lightBgColor"
      >
        <ul
          key={data?.id}
          className="w-full last:border-b-0 md:px-0 md:py-3  overflow-hidden hidden md:flex items-center justify-between mb-[6px] md:mb-0 gap-x-5 md:gap-x-0 "
        >
          <li className="w-[70px]  pl-4 flex items-center text-tableTextTitle2 text-lg not-italic font-AeonikProRegular">
            {index}
          </li>
          <li
            style={{
              backgroundImage: `url(${data?.url_image_path_one})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="w-[200px] h-[100px] flex items-center justify-center mr-[60px] rounded-lg overflow-hidden border"
          >
            {data?.url_image_path_one ? null : <NoImgIcon />}
          </li>
          <li className="w-[calc(100%-230px)] flex items-center justify-between">
            <ul className="flex items-center w-full">
              <li className="md:w-[20%] h-full pr-10">
                <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium">
                  {data?.region?.name_ru || "city"},{" "}
                  {data?.sub_region?.name_ru || "sub_region"}
                </span>
              </li>
              <li className="md:w-[30%] h-full pr-10">
                <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                  {data?.address || "address"}
                </span>{" "}
              </li>
              <li className="md:w-[13%] h-full">
                <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                  {data?.work_time_from || "startTime"} -{" "}
                  {data?.work_time_to || "endTime"}
                </span>
              </li>
              <li className="md:w-[12%] h-full flex items-center justify-center text-center">
                <Link
                  to={`location/${data?.id}`}
                  className="text-textBlueColor text-center hover:underline text-[11px] md:text-base not-italic font-AeonikProMedium"
                >
                  Подробнее
                </Link>
              </li>
              <li className="md:w-[29%] h-full flex items-center justify-center text-center">
                {showSellers !== "updated" ? (
                  <div className="flex items-center gap-x-2">
                    {" "}
                    <button
                      onClick={() => approveFunc()}
                      className={`${
                        data?.status === "pending" ||
                        data?.status === "declined"
                          ? ""
                          : "hidden"
                      } w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
                    >
                      Одобрить
                    </button>
                    <button
                      onClick={() => {
                        setId({ type: "single", id: data?.id });
                        setModalOpen(true);
                      }}
                      className={`${
                        data?.status === "pending" ||
                        data?.status === "approved"
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
                    className={`w-fit px-2 py-1 rounded-[20px] font-AeonikProMedium border border-[#5EB267] text-[#5EB267]`}
                  >
                    Одобрить
                  </button>
                ) : null}
              </li>
            </ul>
          </li>
        </ul>

        {/* Mobile */}
        <div className=" rounded-xl p-[10px] mb-1 md:hidden w-full">
          <div className="mb-2 flex justify-between items-center">
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
              to={`location/${data?.id}`}
              className="text-[#007DCA] text-[12px] font-AeonikProMedium cursor-pointer"
            >
              Подробнее
            </Link>
          </div>

          <div className="mb-3 h-[148px]">
            <figure className="w-full h-full rounded-lg overflow-hidden">
              <img
                className="w-[100%] h-[100%]  object-cover"
                src={data?.url_image_path_one}
                alt=""
              />
            </figure>
          </div>

          <div className="mb-2">
            <div className="border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-1 ll:px-[10px] py-[5px] flex text-[#3F6175] font-AeonikProMedium text-[13px] items-center mb-[8px]">
              <div className="text-[#3F6175] text-[12px] not-italic font-AeonikProMedium pr-[10px] w-[24%]">
                Регион
              </div>
              <div className="text-[#3F6175] text-[12px] not-italic font-AeonikProMedium pr-[10px] w-[46%]">
                Адрес
              </div>
              <div className="text-[#3F6175] text-[12px] text-center not-italic font-AeonikProMedium w-[30%]">
                Рабочее время
              </div>
            </div>

            <div className="px-1 ll:px-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[13px]">
              <div className="pr-[5px] ll:pr-[10px] w-[24%] break-words  text-gray-700 text-[11px] not-italic font-AeonikProMedium">
                {data?.region?.name_ru}, {data?.sub_region?.name_ru}
              </div>
              <div className="relative pr-[5px] ll:pr-[10px] h-fit overflow-hidden w-[46%] leading-4	text-[11px] not-italic font-AeonikProMedium">
                <div className="absolute ToogleOff left-0 w-full h-full top-0"></div>

                {data?.address}
              </div>
              <div className="w-[30%] flex justify-center text-[11px] not-italic font-AeonikProMedium">
                {data?.work_time_from || "startTime"} -{" "}
                {data?.work_time_to || "endTime"}
              </div>
            </div>
          </div>
          {/* <div className="w-full font-AeonikProRegular mb-2">{data?.region?.name_ru || "city"}, {data?.sub_region?.name_ru || "sub_region"}</div> */}

          <div className="flex items-center justify-between gap-x-[15px]">
            {showSellers !== "updated" ? (
              <div className="w-full flex gap-[30px]">
                <button
                  onClick={() => {
                    setId({ type: "single", id: data?.id });
                    setModalOpen(true);
                  }}
                  className={`${
                    data?.status === "pending" || data?.status === "approved"
                      ? ""
                      : "hidden"
                  } rounded-[8px] py-[8px] w-full bg-[#FFE1E1] text-[12px] font-AeonikProMedium text-[#E51515]`}
                >
                  Отказать
                </button>
                <button
                  onClick={() => approveFunc()}
                  className={`${
                    data?.status === "pending" || data?.status === "declined"
                      ? ""
                      : "hidden"
                  } rounded-[8px] py-[8px] w-full bg-[#DEFCE1] text-[12px] font-AeonikProMedium text-[#12C724]`}
                >
                  Одобрить
                </button>
              </div>
            ) : null}
            {showSellers === "updated" ? (
              <div className="w-full flex gap-[30px]">
                <button
                  onClick={() => approveFunc()}
                  className={` rounded-[8px] py-[8px] w-full bg-[#DEFCE1] text-[12px] font-AeonikProMedium text-[#12C724]`}
                >
                  Одобрить
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
