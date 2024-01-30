/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { CheckIcon, StarRatengIcon} from "../../../../assets/icon";
import { deliveryIcon, manGenderIcon, womanGenderIcon } from "../../../../assets/shopIcons/icon";
import { useContext } from "react";
import { ShopsDataContext } from "../../../../context/shopsDataContext";
import axios from "axios";
import { IdsContext } from "../../../../context/idContext";
export default function ShopsItem({
  data,
  index,
  onCheck,
  showProducts,
  toast,
  setModalOpen
}) {

  const url = "https://api.dressme.uz";
  let token = sessionStorage.getItem("token");

  const [, , reFetch] = useContext(ShopsDataContext);

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
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((d) => {
        if (d.status === 200) {
          console.log(d, 'DATA-SHOPS');
          toast.success(d?.data?.message);
          reFetch();
        }
      })
      .catch((v) => {
        console.log(v);
      });
  };

   const [, setId] = useContext(IdsContext);

  console.log(data,'data');

  return (
    <div className="w-full flex flex-row">
      <div className="w-fullh-full flex items-center justify-center">
        <div
          onClick={() => {
            onCheck(data?.id);
          }}
          className={`cursor-pointer w-[24px] h-[24px] border border-checkboxBorder ${
            data?.isCheck
              ? "bg-[#007DCA] border-[#007DCA]"
              : "bg-white border-checkboxBorder"
          } hidden md:flex items-center justify-center rounded mr-[8px]`}
        >
          <span
            className={`${
              data?.isCheck ? "flex items-center justify-center" : "hidden"
            }`}
          >
            <CheckIcon />
          </span>
        </div>
      </div>

      <div
        key={data?.id}
        className="w-full h-fit md:h-[100px] border border-borderColor md:pr-10 p-[10px] rounded-lg flex md:flex-row flex-col items-center"
      >
        <div className="w-full md:w-[34%] flex flex-col md:flex-row items-center md:justify-start  md:border-0 border-b border-borderColor">
          <div className="w-full md:w-fit flex items-center justify-start md:pr-7 md:pl-5 text-xl font-AeonikProRegular ">
            <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
            <span className="text-checkboxBorder md:text-black flex items-center">
              <span className="md:hidden flex">0</span>
              {index + 1} 
            </span>
            <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
          </div>
          
          <div className="w-full flex items-center my-[15px] md:my-0 ">
            <figure className="w-[80px] h-[80px] md:min-w-[120px] md:min-h-[120px] overflow-hidden md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
              <img
                src={data?.url_logo_photo}
                alt=""
                className="w-full h-full object-contain"
              />
            </figure>
            <div className="w-fit flex flex-col ml-5 md:ml-8">
              <p className="w-fit text-[13px] md:w-full ls:text-[14px] xs:text-xl xs:font-AeonikProMedium font-AeonikProRegular  mb-3">
                {data?.name || null}
              </p>
              <div className="w-full flex items-center">
                <div className="w-fit flex items-center ">
                  <div className="w-fit flex items-center mr-[6px]">
                    <StarRatengIcon/>
                  </div>
                  <div className="not-italic font-AeonikProRegular  text-[10px] ls:text-xs leading-4 text-right text-gray-500 md:ml-1 flex items-center text-sm">
                    <p className="font-AeonikProRegular text-[12px] md:text-[14px] ls:font-AeonikProMedium text-black mr-1">
                      {data?.overall_rating || 0}
                    </p>
                    <p className="text-setTexOpacity font-AeonikProRegular text-[10px] ls:text-[12px] md:text-[14px] ">
                      ({data?.rated_users_count || 0}){" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[29%] flex items-center gap-x-[44px] mt-3 md:mt-0">
          <div className="md:w-[30%] flex items-center gap-x-1 ">
            {(Number(data?.gender?.id) === 3 || Number(data?.gender?.id) == 1) && <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
              <img src={manGenderIcon} alt="" />
            </div>}
            {(Number(data?.gender?.id) === 3 || Number(data?.gender?.id) == 2) && <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
              <img src={womanGenderIcon} alt="" />
            </div>}
          </div>
          <div className="md:min-w-[260px] md:w-[260px] h-[36px] ll:h-12 flex items-center justify-center px-1 ls:px-[10px] ll:px-5 md:px-0 active:opacity-70 border border-borderColor rounded-lg  gap-x-1 ll:gap-x-3 ">
            <img src={deliveryIcon} alt="" />
            <span className="font-AeonikProMedium">{data?.delivery?.name_ru}</span>
          </div>
        </div>
        <div className="w-full md:w-[36%] flex items-center justify-end gap-x-4 sm:gap-x-10 mt-4 ll:mt-6 md:mt-0">
          <NavLink
            to={`locations/${data?.id}`}
            className="w-[50%] md:w-fit flex items-center justify-center md:text-textBlueColor md:text-base text-[13px] md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0 px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-locationBg text-locationText"
          >
            Локации
          </NavLink>
          <NavLink
            to={`shop/${data?.id}`}
            className="w-[50%] md:w-fit flex items-center justify-center md:text-textBlueColor md:text-base text-[13px] md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0 px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-Editbg"
          >
            Подробнее
          </NavLink>

           {showProducts !== "updated" ? (
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
                  setId(data?.id);
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

          {showProducts === "updated" ? (
            <button
              onClick={() => approveFunc()}
              className={`w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
            >
              Одобрить
            </button>
          ) : null}
        </div>
      </div>

    </div>
  );
}
