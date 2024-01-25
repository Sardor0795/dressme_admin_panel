import { useContext, useEffect, useState } from "react";
import { AllowedIcon, BackIcon, CheckIcon, EditedIcon, NotAllowedIcon, SearchIcon, StarIcon, WaitingForAllowIcon } from "../../../assets/icon";
import { PhoneNavbar } from "../../phoneNavbar";
import { ProductsContext } from "../../../context/productsContext";
import { ClothesDataContext } from "../../../context/clothesDataContext";
import ClothesItem from "../../clothes/clothesList/clothesItem/clothestem";
import { ToastContainer, toast } from "react-toastify";

import WiFiLoader from "../../../assets/loader/wifi_loader.gif";
import CancelModal from "../../clothes/clothesList/ModalCancel";

export default function ShopsList() {

  const [modalOpen, setModalOpen] = useState(false);

  const [allChecked, setAllChecked] = useState(false);

 // Products Context
  const [showProducts, setShowProducts] = useContext(ProductsContext);

  const [data, setData, , loader] = useContext(ClothesDataContext);

   let newData = data;

  const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
    setFilteredData(newData);
  }, [newData]);

  const filterFunc = (e) => {
    const filtered = data?.map((seller) => {
      const filteredShops = seller?.shops?.map((shop) => {
        const filteredProducts = shop?.products.filter((product) => {
          return product?.name_ru
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });

        return { ...shop, products: filteredProducts };
      });

      return { ...seller, shops: filteredShops };
    });

    setFilteredData(filtered);
  };

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;
  let updatedCount = 0;

  let allCount = waitingCount + allowedCount + notAllowedCount + updatedCount;

  let dataCount = 0;
  if (showProducts === "pending") {
    dataCount = waitingCount;
  } else if (showProducts === "approved") {
    dataCount = allowedCount;
  } else if (showProducts === "declined") {
    dataCount = notAllowedCount;
  } else if (showProducts === "updated") {
    dataCount = updatedCount;
  }

  function approveFunc () {  }

  let checkIndicator = allChecked ? "allNotCheck" : "allCheck";

   const onCheck = (id) => {
    if (id === "allCheck") {
      let newArr = data?.map((item) => {
        return { ...item, isCheck: true };
      });
      setData(newArr);
    } else if (id === "allNotCheck") {
      let newArr = data?.map((item) => {
        return { ...item, isCheck: false };
      });
      setData(newArr);
    } else {
      let newArr = data?.map((item) => {
        return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
      });
      setData(newArr);
    }
  };

  const [deliverList, setDeliverList] = useState();



return(
<div>
    <div className="md:mb-[15px] md:border-b py-[18px] flex items-center justify-between">
        <div className="block md:hidden w-full">
            <PhoneNavbar />
        </div>

        {showProducts === "pending" ? (
        <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Все магазины
        </div>
        ) : null}
        {showProducts === "approved" ? (
        <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Все магазины
        </div>
        ) : null}
        {showProducts === "declined" ? (
        <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Все магазины
        </div>
        ) : null}
        {showProducts === "updated" ? (
        <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Все магазины
        </div>
        ) : null}

        <label
            className="overflow-hidden px-[13px] relative w-full max-w-[400px] hidden md:flex items-center border border-searchBgColor rounded-lg ">
            <input
                className="text-[13px] md:text-base outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
                type="email" placeholder="Поиск" required inputMode="search" onChange={(e)=> filterFunc(e)}
            />
            <button
                className="bg-[#F7F7F7] h-full w-[50px] rounded-r-lg flex items-center justify-center absolute top-0 right-0 active:scale-90">
                <SearchIcon />
            </button>
        </label>
    </div>

    <div className="w-full mt-4 pb-2">
      <div className="flex items-center justify-between gap-x-1 mb-[25px] md:mb-[0]">
        <div className="flex gap-x-1">
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
                Общее количество:
            </span>
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
                {allCount}
            </span>
        </div>

        {/* Выбранные */}
        <div className="hidden w-full md:w-fit md:flex items-center gap-x-[30px] border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
        <span className=" font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
            Выбранные:
        </span>
        <div className="flex items-center">
            {showProducts === "pending" ? (
            <div className="flex items-center ml-auto">
                <button
                onClick={() => approveFunc()}
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
            ) : null}
            {showProducts === "approved" ? (
            <div className="flex items-center ml-auto">
                <button
                onClick={() => setModalOpen(true)}
                type="button"
                className="text-[#E51515] text-lg not-italic font-AeonikProMedium"
                >
                Отказать
                </button>
            </div>
            ) : null}
            {showProducts === "declined" ? (
            <div className="flex items-center ml-auto">
                <button
                // onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
                >
                Одобрить
                </button>
            </div>
            ) : null}
            {showProducts === "status_update" ? (
            <div className="flex items-center ml-auto">
                <button
                // onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
                >
                Одобрить
                </button>
            </div>
            ) : null}
        </div>
        </div>
      </div>

      <div className="flex mb-[24px] md:hidden">
        <div
          onClick={() => setShowProducts("pending")}
          className={`${
            showProducts === "pending"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3px]">Ожидающие товары</div>{" "}
          <div>({waitingCount})</div>
        </div>
        <div
          onClick={() => setShowProducts("approved")}
          className={`${
            showProducts === "approved"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3px]">Одобренные товары</div>{" "}
          <div>({allowedCount})</div>
        </div>
        <div
          onClick={() => setShowProducts("declined")}
          className={`${
            showProducts === "declined"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3px]">Отказанные товары</div>{" "}
          <div>({notAllowedCount})</div>
        </div>
        <div
          onClick={() => setShowProducts("status_update")}
          className={`${
            showProducts === "status_update"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3px]">Обновленные товары</div>{" "}
          <div>({updatedCount})</div>
        </div>
      </div>

      <div className="flex md:hidden mb-[18px] items-center justify-between gap-x-1">
        <div
          onClick={() => {
            onCheck(checkIndicator);
            setAllChecked(!allChecked);
          }}
          className="select-none cursor-pointer flex md:hidden items-center text-[14px] font-AeonikProMedium text-[#303030]"
        >
          Выбрать все
          <div
            className={`ml-[8px] cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
              allChecked
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } flex items-center justify-center rounded`}
          >
            <span
              className={`${
                allChecked ? "flex items-center justify-center" : "hidden"
              }`}
            >
              <CheckIcon size={"small"} />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile selected */}
      <div className="w-full md:hidden flex items-center justify-between pb-[24px]">
        <div className=" font-AeonikProMedium text-base ll:text-sm md:text-lg text-mobileTextColor">
          Выбранные:
        </div>
        <div className="flex items-center">
          {showProducts === "pending" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-base not-italic font-AeonikProMedium"
              >
                Одобрить
              </button>
              <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
              <button
                onClick={() => setModalOpen(true)}
                type="button"
                className="text-[#E51515] text-base not-italic font-AeonikProMedium"
              >
                Отказать
              </button>
            </div>
          ) : null}
          {showProducts === "approved" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => setModalOpen(true)}
                type="button"
                className="text-[#E51515] text-base not-italic font-AeonikProMedium"
              >
                Отказать
              </button>
            </div>
          ) : null}
          {showProducts === "declined" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-base not-italic font-AeonikProMedium"
              >
                Одобрить
              </button>
            </div>
          ) : null}
          {showProducts === "updated" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-base not-italic font-AeonikProMedium"
              >
                Одобрить
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 hidden md:flex justify-end items-center md:justify-between mx-auto pb-6">
        <section className="flex items-center w-fit bg-LocationSelectBg rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setShowProducts("pending")}
            className={`${
              showProducts === "pending"
                ? "text-weatherWinterColor border-[1.5px]"
                : "text[#303030]"
            }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
          >
            <span className="mr-[5px]">
              <WaitingForAllowIcon />
            </span>
            <span>Ожидающие товары ({waitingCount})</span>
          </button>
          <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
          <button
            type="button"
            onClick={() => setShowProducts("approved")}
            className={`${
              showProducts === "approved"
                ? "text-weatherWinterColor border-[1.5px]"
                : "text[#303030]"
            }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
          >
            <span className="mr-[5px]">
              <AllowedIcon />
            </span>
            <span>Одобренные товары ({allowedCount})</span>
          </button>
          <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
          <button
            type="button"
            onClick={() => setShowProducts("declined")}
            className={`${
              showProducts === "declined"
                ? "text-weatherWinterColor border-[1.5px]"
                : "text[#303030]"
            }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
          >
            <span className="mr-[5px]">
              <NotAllowedIcon />
            </span>
            <span>Отказанные товары ({notAllowedCount})</span>
          </button>
          <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
          <button
            type="button"
            onClick={() => setShowProducts("updated")}
            className={`${
              showProducts === "updated"
                ? "text-weatherWinterColor border-[1.5px]"
                : "text[#303030]"
            }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
          >
            <span className="mr-[5px]">
              <EditedIcon />
            </span>
            <span>Обновленные товары ({updatedCount})</span>
          </button>
        </section>

        <div
          onClick={() => {
            onCheck(checkIndicator);
            setAllChecked(!allChecked);
          }}
          className="hidden md:flex items-center cursor-pointer select-none font-AeonikProMedium"
        >
          Выбрать все
          <div
            className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
              allChecked
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } hidden md:flex items-center justify-center rounded ml-[10px]`}
          >
            <span
              className={`${
                allChecked ? "flex items-center justify-center" : "hidden"
              }`}
            >
              <CheckIcon />
            </span>
          </div>
        </div>
      </div>

       <div className="w-full h-fit md:h-[100px] border border-borderColor md:pr-10  p-[10px] md:p-0 rounded-lg flex md:flex-row flex-col justify-between items-center" >
          <div className="w-full md:w-fit flex flex-col md:flex-row items-center md:justify-start  md:border-0 border-b border-borderColor">
            <div className="w-full md:w-fit flex items-center justify-between  md:pr-7 md:pl-5 text-xl font-AeonikProRegular ">
              <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
              <span className="text-checkboxBorder md:text-black flex items-center">
                <span className="md:hidden flex">0</span>
                {/* {index + 1} */} 01
              </span>
              <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
            </div>
            <div className="w-full md:w-fit flex items-center my-[15px] md:my-0 ">
              <figure className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] overflow-hidden md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
                <img
                  // src={data?.url_logo_photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="w-fit flex flex-col ml-5 md:ml-8">
                <p className="w-fit text-[13px] md:w-[350px] ls:text-[14px] xs:text-xl xs:font-AeonikProMedium font-AeonikProRegular  mb-3">
                  {/* {data?.name || null} */}
                </p>
                <div className="w-full flex items-center">
                  <div className="w-fit flex items-center">
                    <div className="not-italic font-AeonikProRegular  text-[10px] ls:text-xs leading-4 text-right text-gray-500 md:ml-1 flex items-center text-sm">
                      <p className="font-AeonikProRegular text-[12px] md:text-[14px] ls:font-AeonikProMedium text-black mr-1">
                        5.0
                      </p>
                      <p className="text-setTexOpacity font-AeonikProRegular text-[10px] ls:text-[12px] md:text-[14px] ">
                        (859 votes){" "}
                        <span className="ml-[5px] ll:ml-[10px]">|</span>{" "}
                      </p>
                      <p className="font-AeonikProRegular ml-[5px] ll:ml-[10px]  text-[10px] ls:text-[12px] md:text-[14px]  text-setTexOpacity">
                        4937 orders
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-fit flex items-center justify-between sm:gap-x-[130px] mt-3 md:mt-0">
            <div className="flex items-center gap-x-1 ">
              {/* {(Number(data?.gender_id) === 3 || Number(data?.gender_id) == 1) && <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                <img src={man} alt="" />
              </div>}
              {(Number(data?.gender_id) === 3 || Number(data?.gender_id) == 2) && <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                <img src={woman} alt="" />
              </div>} */}
            </div>
            <div className="h-[36px] ll:h-12 px-1 ls:px-[10px] md:w-[260px] ll:px-5 active:opacity-70 border border-borderColor rounded-lg flex items-center justify-center gap-x-1 ll:gap-x-3 ">
              {/* {deliverList
                ?.filter((e) => e.id == data?.delivery_id)
                ?.map((item) => {
                  return (
                    <span
                      key={item?.id}
                      className="text-tableTextTitle2 text-[11px] ls:text-[12px] ll:text-[14px] xs:text-base not-italic font-AeonikProRegular ll:font-AeonikProMedium"
                    >
                      {item?.name_ru}
                    </span>
                  );
                })} */}
            </div>
          </div>
          <div className="w-full md:w-fit flex items-center justify-between gap-x-4 sm:gap-x-[50px]  mt-4 ll:mt-6 md:mt-0">
            <button
              type="button"
              // onClick={() => navigate(`/store/locations/shop/:${data?.id}`)}
              className="md:text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0 px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-locationBg text-locationText"
            >
              Локации
            </button>
            <button
              type="button"
              // onClick={() => goDetail(data?.id)}
              className="text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0  px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-Editbg"
            >
              Подробнее
            </button>
          </div>
        </div>


    </div>

    <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />

    <button
        id="upBtn"
        className="fixed bg-bgColor opacity-70 bottom-5 right-5 hidden items-center justify-center w-[48px] h-[48px] border border-[#c1c1c1] rounded-full shadow-[0_9px_25px_0_#8480b147] active:scale-90"
      >
        <div className="rotate-90">
          <BackIcon width={24} height={24} />
        </div>
      </button>

      <ToastContainer />

</div>
)
}