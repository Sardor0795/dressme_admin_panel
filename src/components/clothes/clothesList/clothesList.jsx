import { useContext, useEffect, useState } from "react";
import CancelModal from "./ModalCancel";
import ClothesItem from "./clothesItem/clothestem";
import { ProductsContext } from "../../../context/productsContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AllowedIcon,
  BackIcon,
  CheckIcon,
  EditedIcon,
  NotAllowedIcon,
  SearchIcon,
  WaitingForAllowIcon,
} from "../../../assets/icon";
import { PhoneNavbar } from "../../phoneNavbar";
import { ClothesDataContext } from "../../../context/clothesDataContext";

export default function ClothesList() {
  const url = "https://api.dressme.uz";
  let token = localStorage.getItem("token");

  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useContext(ClothesDataContext);
  // -----------------------------
  const [getCheckList, setGetCheckList] = useState({});
  function onHandleGetCheckList(childData) {
    setGetCheckList({ childData });
  }

  // -----------------------------

  console.log(getCheckList, "getCheckList");

  let newData = data;

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(newData);
  }, [newData]);

  const filterFunc = (e) => {
    const filteredData = data.filter((v) =>
      v?.name_ru.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  // // Count items -----------

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;
  let updatedCount = 0;

  filteredData.forEach((v) => {
    if (v?.status === "pending") {
      ++waitingCount;
    } else if (v?.status === "approved") {
      ++allowedCount;
    } else {
      ++notAllowedCount;
    }
  });

  filteredData.forEach((v) => {
    if (v?.status_update === "1") {
      ++updatedCount;
    }
  });

  // // -----------------

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  let checkIndicator = allChecked ? "allNotCheck" : "allCheck";

  const onCheck = (id) => {
    if (id === "allCheck") {
      let newArr = data.map((item) => {
        return { ...item, isCheck: true };
      });
      setData(newArr);
    } else if (id === "allNotCheck") {
      let newArr = data.map((item) => {
        return { ...item, isCheck: false };
      });
      setData(newArr);
    } else {
      let newArr = data.map((item) => {
        return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
      });
      setData(newArr);
    }
  };

  useEffect(() => {
    let newData = data.filter((item) => item.isCheck === true);
    if (newData.length) {
      setSomeChecked(true);
    } else {
      setSomeChecked(false);
    }
  }, [data]);

  // Products Context
  const [showProducts, setShowProducts] = useContext(ProductsContext);

  let dataCount = 0;
  if (showProducts === "pending") {
    dataCount = waitingCount;
  } else if (showProducts === "approved") {
    dataCount = allowedCount;
  } else {
    dataCount = notAllowedCount;
  }

  let index = 0;

  // up btn

  useEffect(() => {
    let upBtn = document.querySelector("#upBtn");

    upBtn.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });

    window.addEventListener("scroll", () => {
      let scrollTop = window.scrollY;

      if (scrollTop > 80) {
        upBtn.style.display = "flex";
      } else {
        upBtn.style.display = "none";
      }
    });
  }, []);
  const handleSendAllDeclined = () => {
    let form = new FormData();
    form.append("status", "declined");
    form.append("status_reason", "Qanaqadir sababga kora");
    getCheckList?.childData?.map((e, index) => {
      form.append("ids[]", getCheckList?.childData[index]);
    });
    return fetch(`${url}/api/admin/massive-decline-products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "Success - ThisIsSeveralSelected");
      })
      .catch((err) => console.log(err, "Error ThisIsSeveralSelected"));
  };
  const handleSendAllApprove = () => {
    let form = new FormData();
    form.append("status", "approved");
    getCheckList?.childData?.map((e, index) => {
      form.append("ids[]", getCheckList?.childData[index]);
    });
    return fetch(`${url}/api/admin/massive-approve-products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "Success - handleSendAllApprove");
      })
      .catch((err) => console.log(err, "Error ThisIsSeveralSelected"));
  };
// Одобрить
  return (
    <div>
      <div className="md:mb-[15px] md:border-b py-[18px] flex items-center justify-between">
        <div className="block md:hidden w-full">
          <PhoneNavbar filterFuncCloThes={filterFunc} />
        </div>

        {showProducts === "pending" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Ожидающие товары
          </div>
        ) : null}
        {showProducts === "approved" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Одобренные товары
          </div>
        ) : null}
        {showProducts === "declined" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Отказанные товары
          </div>
        ) : null}
        {showProducts === "status_update" ? (
          <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Обновленные товары
          </div>
        ) : null}

        <label className="overflow-hidden px-[13px] relative w-full max-w-[400px] hidden md:flex items-center border border-searchBgColor rounded-lg ">
          <input
            className="text-[13px] md:text-base outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
            type="email"
            placeholder="Поиск"
            required
            inputMode="search"
            onChange={(e) => filterFunc(e)}
          />
          <button className="bg-[#F7F7F7] h-full w-[50px] rounded-r-lg flex items-center justify-center absolute top-0 right-0 active:scale-90">
            <SearchIcon />
          </button>
        </label>
      </div>

      <div className="w-full mt-4">
        <div className="flex items-center justify-between gap-x-1 mb-[25px] md:mb-[0]">
          <div className="flex gap-x-1">
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
              Общее количество:
            </span>
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
              {data?.length}
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
                    onClick={handleSendAllApprove}
                    type="button"
                    className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
                  >
                    Одобрить
                  </button>
                  <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
                  <button
                    onClick={handleSendAllDeclined}
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
                    onClick={handleSendAllDeclined}
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
                    onClick={handleSendAllApprove}
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
                    onClick={handleSendAllApprove}
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
                  onClick={handleSendAllApprove}
                  type="button"
                  className="text-[#12C724] text-base not-italic font-AeonikProMedium"
                >
                  Одобрить
                </button>
                <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
                <button
                  onClick={handleSendAllDeclined}
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
                  onClick={handleSendAllDeclined}
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
            {showProducts === "status_update" ? (
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
              onClick={() => setShowProducts("status_update")}
              className={`${
                showProducts === "status_update"
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
        </div>

        <div className="flex items-center justify-between mb-4 md:mb-7 font-AeonikProMedium text-[16px]">
          <div className="text-[20px] md:text-[24px] font-AeonikProMedium flex items-center">
            <div
              onClick={() => {
                onCheck(checkIndicator);
                setAllChecked(!allChecked);
              }}
              className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                allChecked
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
              } flex items-center justify-center rounded mr-[8px]`}
            >
              <span
                className={`${
                  allChecked
                    ? "hidden md:flex items-center justify-center"
                    : "hidden"
                }`}
              >
                <CheckIcon />
              </span>
              <span
                className={`${
                  allChecked
                    ? "flex md:hidden items-center justify-center"
                    : "hidden"
                }`}
              >
                <CheckIcon size={"small"} />
              </span>
            </div>
            <button
              onClick={() => {
                onCheck(checkIndicator);
                setAllChecked(!allChecked);
              }}
              className="text-[#007DCA] border-b-[3px] border-[#007DCA] mr-[7px]"
            >
              Umar
            </button>
            - Nike Store (6)
          </div>

          <div
            onClick={() => {
              onCheck(checkIndicator);
              setAllChecked(!allChecked);
            }}
            className="hidden md:flex items-center cursor-pointer select-none"
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

        <div className="mx-auto font-AeonikProRegular text-[16px]">
          {dataCount > 0 ? (
            <div className="mb-[10px] flex items-center text-tableTextTitle">
              <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>

              <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                <div className="w-[4%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  No:
                </div>
                <div className="w-[8%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Фото
                </div>
                <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Название
                </div>
                <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Артикул
                </div>
                <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Тип
                </div>
                <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Дата
                </div>
                <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Цена
                </div>
                <div className="w-[20%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                  Действие
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-lightBgColor rounded-lg h-[calc(100vh-280px)]">
              <div className="font-AeonikProMedium text-xl">Нет продавцов</div>
            </div>
          )}

          <div className="w-full flex flex-col gap-y-[10px]">
            {/* Status Waiting */}

            {/* {showProducts === "pending"
              ? filteredData.map((data) => {
                  if (data?.status === "pending") {
                    ++index;
                    return (
                      <ClothesItem
                        data={data}
                        index={index}
                        key={data?.id}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                        toast={toast}
                      />
                    );
                  }
                })
              : null} */}

            {/* Status Allowed */}

            {/* {data.map((data) => {
              ++index;
              return ( */}
            {data?.map((item, index) => {
              return (
                <div className="w-full">
                  {item?.shops?.length !== 0 && (
                    <div className="w-full">
                      <div className="w-full border">
                        <div className="w-full flex items-center justify-center mt-10">
                          <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                            {item?.name}
                          </p>
                        </div>
                      </div>
                      {item?.shops?.map((resData) => {
                        return (
                          <div className="w-full">
                            <div>
                              <ClothesItem
                                data={resData}
                                // data={data}
                                // key={data?.id}
                                // index={index}
                                onHandleGetCheckList={onHandleGetCheckList}
                                click={onCheck}
                                setModalOpen={setModalOpen}
                                toast={toast}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {/* <div className="w-full flex flex-col border border-red-500">
              <div className="w-full  border-red-500">
                <p>{data?.name_ru}</p>
              </div>
              <ClothesItem
                data={data}
                // key={data?.id}
                // index={index}
                click={onCheck}
                setModalOpen={setModalOpen}
                toast={toast}
              />
            </div> */}
            {/* );
            })} */}

            {/* {showProducts === "approved"
              ? filteredData.map((data) => {
                  if (data?.status === "approved") {
                    ++index;
                    return (
                      <ClothesItem
                        data={data}
                        key={data?.id}
                        index={index}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                        toast={toast}
                      />
                    );
                  }
                })
              : null} */}

            {/* Status NotAllowed */}

            {/* {showProducts === "declined"
              ? filteredData.map((data) => {
                  if (data?.status === "declined") {
                    ++index;
                    return (
                      <ClothesItem
                        data={data}
                        key={data?.id}
                        index={index}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                        toast={toast}
                      />
                    );
                  }
                })
              : null} */}

            {/* Status Updated */}

            {/* {showProducts === "status_update"
              ? filteredData.map((data) => {
                  if (data?.status_update === "1") {
                    ++index;
                    return (
                      <ClothesItem
                        data={data}
                        key={data?.id}
                        index={index}
                        click={onCheck}
                        setModalOpen={setModalOpen}
                        toast={toast}
                        showProducts={showProducts}
                      />
                    );
                  }
                })
              : null} */}
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
  );
}
