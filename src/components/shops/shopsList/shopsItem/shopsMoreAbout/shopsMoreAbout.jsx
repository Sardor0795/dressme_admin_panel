import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { StarIcon, BackIcon, LocationIcon } from "../../../../../assets/icon";
import axios from "axios";
import { SellersContext } from "../../../../../context/sellersContext";
import CancelShopsModal from "../../ModalCancel";
import { ShopsDataContext } from "../../../../../context/shopsDataContext";
import { LocationsDataContext } from "../../../../../context/locationsDataContext";
import { ClothesDataContext } from "../../../../../context/clothesDataContext";
import { ReFreshTokenContext } from "../../../../../context/reFreshToken";
import { toast } from "react-toastify";
import { IdsContext } from "../../../../../context/idContext";

const ShopsMoreAbout = () => {
  const [shopData, setShopData] = useState([]);

  const [, setId] = useContext(IdsContext);

  const [, , reFetch] = useContext(ShopsDataContext);
  const [, , locationsReFetch] = useContext(LocationsDataContext);
  const [, , clothesReFetch] = useContext(ClothesDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  // Products Context
  const [showSellers] = useContext(SellersContext);

  const url = "https://api.dressme.uz";

  const params = useParams();

  useEffect(() => {
    axios(`${url}/api/admin/shops/${params?.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((res) => {
      setShopData(res?.data?.shop);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-shop-status/${params?.id}`,
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
          navigate("/shops");
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

  return (
    <div className="w-full h-full ">
      <div className="w-full h-full mx-auto md:max-w-[1120px] md:mt-12">
        <div className="text-center mb-6 text-5 md:text-[35px] font-AeonikProMedium">
          <div className="mt-6 flex items-center justify-center  ">
            <button
              onClick={() => {
                navigate(`/shops`);
              }}
              className="w-8 h-8 md:hidden flex mr-auto items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <BackIcon />
            </button>
            <div className="w-fit mr-auto md:mr-0">
              <span className="md:hidden block text-tableTextTitle2 text-xl not-italic font-AeonikProMedium">
                Магазин
              </span>
              <span className="md:block hidden">Магазины</span>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-end md:justify-between mb-2 md:mb-3 md:pb-0 pb-2 md:border-0 border-borderColor">
          <button
            onClick={() => {
              navigate("/shops");
            }}
            className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
          >
            <BackIcon />
          </button>
        </div>
        <div className="relative w-full md:h-[360px] h-[200px] flex items-center  border border-[#f2f2f2]  justify-center rounded-lg ">
          <div className="h-full w-full  rounded-lg overflow-hidden flex items-center justify-center ">
            {!shopData?.url_background_photo ? (
              <div className="w-fit h-fit flex items-center">
                <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                  Фоновое фото
                </span>
              </div>
            ) : (
              <img
                src={shopData?.url_background_photo}
                alt="backImg"
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
          <div className="absolute bottom-[-30px] ll:-bottom-11 overflow-hidden border border-searchBgColor md:bottom-[-60px] z-[20] bg-white left-[15px] ll:left-[30px] md:left-10 w-[60px] h-[60px] ll:w-[80px] ll:h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center text-center rounded-full ">
            <button
              type="button"
              className="h-full w-full rounded-full flex items-center justifydiv-center "
            >
              <div className="flex items-center md:w-full md:h-full text-sm font-AeonikProMedium cursor-pointer  text-textBlueColor">
                <img src={shopData?.url_logo_photo} alt="" />
              </div>
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-end mb-[24px] md:mb-20 mt-4">
          <div className="flex items-center">
            <NavLink
              to={`/shops/locations/${params?.id}`}
              className="flex items-end gap-x-2"
            >
              <span>
                <LocationIcon colors="#007dca" />
              </span>
              <span className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] ll:text-sm not-italic font-AeonikProMedium">
                Все локации
              </span>
            </NavLink>
          </div>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col items-center justify-between  ">
          <div className="w-full flex flex-col md:flex-row items-center justify-center mb-10 md:mb-[60px] gap-x-10 ">
            <div className="w-full md:w-3/5 mb-[24px] md:mb-0 md:mt-7 ">
              {/* INPUT SHOP NAME */}
              <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-[30px] mb-5">
                <div
                  htmlFor="shopName"
                  className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular"
                >
                  Название магазина
                  <span className="ml-[5px] hidden md:block">
                    <StarIcon />{" "}
                  </span>
                </div>
                <div className="w-[65%] md:w-[70%] h-[32px] md:h-[42px] flex items-center border border-borderColor2 outline-none px-3 rounded-lg text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular">
                  {shopData?.name}
                </div>
              </div>
              {/* GENDER BUTTONS */}
              <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-[30px] mb-5">
                <div
                  htmlFor="shopName"
                  className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor mr-[5px] font-AeonikProRegular"
                >
                  Пол
                  <span className="ml-[5px] hidden md:block">
                    <StarIcon />{" "}
                  </span>
                </div>
                <div className="w-[69%] md:w-[72%] radio-toolbar md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                  <div
                    className={`${
                      shopData?.gender?.id === 1
                        ? "bg-[#e6f2f9] text-weatherWinterColor"
                        : ""
                    } w-1/3 h-[32px] md:h-[42px] md:w-full flex items-center justify-center border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                  >
                    <span>Мужской</span>
                  </div>
                  <div
                    className={`${
                      shopData?.gender?.id === 2
                        ? "bg-[#e6f2f9] text-weatherWinterColor"
                        : ""
                    } w-1/3 h-[32px] md:h-[42px] md:w-full flex items-center justify-center border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                  >
                    <span>Женский</span>
                  </div>
                  <div
                    className={`${
                      shopData?.gender?.id === 3
                        ? "bg-[#e6f2f9] text-weatherWinterColor"
                        : ""
                    } w-1/3 h-[32px] md:h-[42px] md:w-full flex items-center justify-center border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                  >
                    <span>Унисекс</span>
                  </div>
                </div>
              </div>
              {/* DELIVERY BUTTONS */}
              <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-[30px] ">
                <div
                  htmlFor="shopName"
                  className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular"
                >
                  Метод доставки
                  <span className="ml-[5px] hidden md:block">
                    <StarIcon />
                  </span>
                </div>
                <div className="w-[65%] md:w-[70%] radio-toolbar  flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                  <div
                    className={`${
                      shopData?.delivery?.id === 1
                        ? "bg-[#e6f2f9] text-weatherWinterColor"
                        : ""
                    } w-1/2 h-[32px] md:h-[42px] flex items-center justify-center text-center cursor-pointer md:px-3 border border-searchBgColor text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                  >
                    <span className="leading-normal">Магазин</span>
                  </div>
                  <div
                    className={`${
                      shopData?.delivery?.id === 2
                        ? "bg-[#e6f2f9] text-weatherWinterColor"
                        : ""
                    } w-1/2 h-[32px] md:h-[42px] flex items-center justify-center text-center cursor-pointer md:px-3 border border-searchBgColor text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                  >
                    <span className="leading-normal">Такси</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center mb-10 md:pb-10">
          <div className="flex items-center ">
            {showSellers === "pending" ? (
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() => approveFunc()}
                  type="button"
                  className="w-fit px-4 py-3 rounded-[20px] font-AeonikProMedium border border-[#5EB267] text-[#5EB267]"
                >
                  Одобрить
                </button>
                <button
                  onClick={() => {
                    setId({ type: "single", id: params?.id });
                    setModalOpen(true);
                  }}
                  type="button"
                  className="w-fit px-4 py-3 rounded-[20px] font-AeonikProMedium border border-[#E85353] text-[#E85353]"
                >
                  Отказать
                </button>
              </div>
            ) : null}
            {showSellers === "approved" ? (
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setId({ type: "single", id: params?.id });
                    setModalOpen(true);
                  }}
                  type="button"
                  className="w-fit px-4 py-3 rounded-[20px] font-AeonikProMedium border border-[#E85353] text-[#E85353]"
                >
                  Отказать
                </button>
              </div>
            ) : null}
            {showSellers === "declined" ? (
              <div className="flex items-cente">
                <button
                  onClick={() => approveFunc()}
                  type="button"
                  className="w-fit px-4 py-3 rounded-[20px] font-AeonikProMedium border border-[#5EB267] text-[#5EB267]"
                >
                  Одобрить
                </button>
              </div>
            ) : null}
            {showSellers === "updated" ? (
              <div className="flex items-center">
                <button
                  onClick={() => approveFunc()}
                  type="button"
                  className="w-fit px-4 py-3 rounded-[20px] font-AeonikProMedium border border-[#5EB267] text-[#5EB267]"
                >
                  Одобрить
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <CancelShopsModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  );
};
export default ShopsMoreAbout;
