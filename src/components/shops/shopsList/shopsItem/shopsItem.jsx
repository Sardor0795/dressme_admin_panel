/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import { CheckIcon, StarRatengIcon } from "../../../../assets/icon";
import {
  deliveryIcon,
  manGenderIcon,
  womanGenderIcon,
} from "../../../../assets/shopIcons/icon";
import { useContext, useEffect, useState } from "react";
import { ShopsDataContext } from "../../../../context/shopsDataContext";
import axios from "axios";
import { IdsContext } from "../../../../context/idContext";
import { LocationsDataContext } from "../../../../context/locationsDataContext";
import { ClothesDataContext } from "../../../../context/clothesDataContext";
import { ReFreshTokenContext } from "../../../../context/reFreshToken";
export default function ShopsItem({
  data,
  index,
  showSellers,
  toast,
  setModalOpen,
  setMassiveCheckeds,
  massiveCheckeds,
  allChecked,
  setSomeChecked,
}) {
  const [, , reFetch] = useContext(ShopsDataContext);
  const [, , locationsReFetch] = useContext(LocationsDataContext);
  const [, , clothesReFetch] = useContext(ClothesDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const url = "https://api.dressme.uz";

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-shop-status/${data?.id}`,
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
      setMassiveCheckeds((prev) => [...prev, data?.id]);
    } else {
      setMassiveCheckeds((prevState) =>
        prevState.filter((id) => id !== data?.id)
      );
    }
  }, [allChecked]);

  return (
    <div className="w-full flex flex-row">
      <div className="w-fit flex items-center justify-start">
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
          className={`cursor-pointer w-[24px] h-[24px] border border-checkboxBorder ${
            ckeck
              ? "bg-[#007DCA] border-[#007DCA]"
              : "bg-white border-checkboxBorder"
          } hidden md:flex items-center justify-center rounded mr-[8px]`}
        >
          <span
            className={`${
              ckeck ? "flex items-center justify-center" : "hidden"
            }`}
          >
            <CheckIcon />
          </span>
        </div>
      </div>

      {/* Mobile */}

      <div
        key={data?.id}
        className="w-full h-fit md:h-[100px] border border-borderColor md:pr-10 p-[10px] rounded-lg flex md:flex-row flex-col items-center"
      >
        <div className="w-full md:w-[35%] flex flex-col md:flex-row items-center md:justify-start md:border-0 border-b border-borderColor">
          <div className="w-full md:w-fit flex items-center justify-between md:justify-start md:pr-7 md:pl-5 text-xl font-AeonikProMedium ">
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
            <div className="w-[3%] hidden md:block  text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
              {index + 1}
            </div>
            <div className="flex items-center md:hidden">
              <div className="border-b min-w-[10px]"></div>
              <div className="mx-[5px] text-[16px] font-AeonikProMedium text-[#D2D2D2]">
                {index < 10 ? "0" : ""}
                {index + 1}
              </div>
              <div className="border-b min-w-[10px]"></div>
            </div>

            <Link
              to={`shop/${data?.id}`}
              className="text-[#007DCA] text-[13px] font-AeonikProMedium cursor-pointer md:hidden block"
            >
              Подробнее
            </Link>
          </div>

          <div className="w-full flex items-center mt-[5px] mb-[15px] md:mb-0 md:mt-0">
            <figure className="max-w-[80px] max-h-[80px] md:max-w-[120px] md:max-h-[120px] min-w-[80px] min-h-[80px] md:min-w-[120px] md:min-h-[120px] overflow-hidden md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
              <img
                src={data?.url_logo_photo}
                alt=""
                className="w-full h-full object-contain"
              />
            </figure>
            <div className="w-fit flex flex-col ml-5 md:ml-8">
              <p className="relative md:block hidden max-h-[56px] overflow-hidden w-fit max-w-[350px] break-all md:pr-12 text-[13px] md:w-full ls:text-[14px] xs:text-xl font-AeonikProMedium mb-3">
                {data?.name || null} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Voluptate atque fugiat deserunt quia aut
                voluptas hic odio sapiente? Vero molestiae maxime, adipisci
                deleniti nihil dolorem omnis exercitationem. Ullam, ea
                voluptatem?
                <span className="absolute right-[16px] top-[28px] w-full block linearGr h-[28px]"></span>
              </p>
              <p className="md:hidden w-fit break-all md:pr-4 text-[13px] md:w-full ls:text-[14px] xs:text-xl font-AeonikProMedium mb-3">
                {data?.name || null}
              </p>
              <div className="w-full flex items-center">
                <div className="w-fit flex items-center ">
                  <div className="w-fit flex items-center mr-[6px]">
                    <StarRatengIcon />
                  </div>
                  <div className="not-italic font-AeonikProMedium ls:text-[13px] leading-4 text-right text-gray-500 md:ml-1 flex items-center text-[13px]">
                    <p className="font-AeonikProMedium text-[13px] md:text-[16px] ls:font-AeonikProMedium text-black mr-1">
                      {data?.overall_rating || 0}
                    </p>
                    <p className="text-setTexOpacity font-AeonikProMedium text-[13px] ls:text-[13px] md:text-[16px] ">
                      ({data?.rated_users_count || 0}){" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto w-full md:w-[34%] flex items-center gap-x-[10px] mt-3 md:mt-0">
          <div className="md:w-[30%] flex items-center gap-x-1 ">
            {(Number(data?.gender?.id) === 3 ||
              Number(data?.gender?.id) == 1) && (
              <div className="ll:w-12 w-[36px] h-[36px] md:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                <img src={manGenderIcon} alt="" />
              </div>
            )}
            {(Number(data?.gender?.id) === 3 ||
              Number(data?.gender?.id) == 2) && (
              <div className="ll:w-12 w-[36px] h-[36px] md:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                <img src={womanGenderIcon} alt="" />
              </div>
            )}
          </div>

          <div className="md:w-fit text-[13px] md:text-base w-full min-w-[120px] md:min-w-[150px] h-[36px] md:h-12 flex items-center justify-center px-1 ls:px-[10px] ll:px-5 md:px-0 active:opacity-70 border border-borderColor rounded-lg  gap-x-1 ll:gap-x-3 ">
            <img src={deliveryIcon} alt="" />
            <span className="font-AeonikProMedium">
              {data?.delivery?.name_ru}
            </span>
          </div>

          <NavLink
            to={`locations/${data?.id}`}
            className="md:w-fit w-full flex md:hidden items-center justify-center md:text-textBlueColor md:text-base text-[13px] md:font-AeonikProMedium font-AeonikProMedium md:hover:underline md:px-0 px-[10px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 h-[36px] md:rounded-0 rounded-lg md:bg-white bg-locationBg text-locationText"
          >
            Локации
          </NavLink>
        </div>
        <div className="w-full md:w-[30%] flex items-center justify-end gap-x-4 sm:gap-x-10 mt-4 ll:mt-6 md:mt-0">
          <NavLink
            to={`locations/${data?.id}`}
            className="md:w-fit w-full md:flex hidden items-center justify-center md:text-textBlueColor md:text-base text-[13px] font-AeonikProMedium md:hover:underline md:px-0 px-[10px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-locationBg text-locationText"
          >
            Локации
          </NavLink>
          <Link
            to={`shop/${data?.id}`}
            className="text-[#007DCA] md:hover:underline md:text-base font-AeonikProMedium cursor-pointer hidden md:block"
          >
            Подробнее
          </Link>
          {showSellers !== "updated" ? (
            <div className="md:w-fit w-full flex items-center gap-x-2">
              {" "}
              <button
                onClick={() => approveFunc()}
                className={`${
                  data?.status === "pending" || data?.status === "declined"
                    ? ""
                    : "hidden"
                } md:w-fit w-full px-2 py-[5px] rounded-[20px] font-AeonikProMedium border border-[#5EB267] text-[#5EB267]`}
              >
                Одобрить
              </button>
              {showSellers === "approved" ? (
                <button
                  onClick={() => {
                    setId({ type: "single", id: data?.id });
                    setModalOpen(true);
                  }}
                  className={`${
                    data?.status === "pending" || data?.status === "approved"
                      ? ""
                      : "hidden"
                  } rounded-[8px] text-[13px] md:text-[16px] py-[8px] md:py-[5px] md:rounded-[20px] md:border px-2 md:w-fit md:border-[#E85353] w-full bg-[#FFE1E1] md:bg-transparent font-AeonikProMedium text-[#E51515]`}
                >
                  Отказать
                </button>
              ) : (
                <button
                  onClick={() => {
                    setId({ type: "single", id: data?.id });
                    setModalOpen(true);
                  }}
                  className={`${
                    data?.status === "pending" || data?.status === "approved"
                      ? ""
                      : "hidden"
                  } md:w-fit w-full text-[13px] md:text-[16px] px-2 py-[5px] rounded-[20px] font-AeonikProMedium border border-[#E85353] text-[#E85353]`}
                >
                  Отказать
                </button>
              )}
            </div>
          ) : null}

          {showSellers === "updated" ? (
            <button
              onClick={() => approveFunc()}
              className={`md:w-fit w-full px-2 py-[5px] font-AeonikProMedium rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
            >
              Одобрить
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
