import { Link, useNavigate, useParams } from "react-router-dom";
import { BackIcon, SearchIcon } from "../../assets/icon";
import CancelModal from "./modalCancel";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SellersContext } from "../../context/sellersContext";
import { SellersDataContext } from "../../context/sellersDataContext";
import { ToastContainer, toast } from "react-toastify";
import { ReFreshTokenContext } from "../../context/reFreshToken";
import WiFiLoader from "../../assets/loader/wifi_loader.gif";

export const MoreAbout = () => {
  const url = "https://api.dressme.uz";
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [, , reFetch] = useContext(SellersDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const [loader, setLoader] = useState(true);

  const dataTypeIsPersonal = data?.seller_type?.type_ru === "Физическое лицо";

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/sellers/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((d) => {
          setData(d?.data?.seller);
        })
        .finally(() => setLoader(false));
    }
  }, []);

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-seller-status/${params?.id}`,
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
          reFetch();
          navigate("/sellers");
          toast.success(d?.data?.message);
        }
      })
      .catch((v) => {
        if (v?.response?.status === 401 || v?.response?.status === 403) {
          reFreshTokenFunc();
          approveFunc();
        }
      });
  };

  // Sellers Context

  const [showSellers] = useContext(SellersContext);

  return (
    <div>
      <div className="md:border-b py-[18px] flex items-center mb-[7px] md:mb-[0]">
        <div className="flex w-full items-center font-AeonikProMedium text-[20px] md:text-[24px]">
          <Link
            to="/sellers"
            className="rounded-md border border-[#D5D5D5] mr-[30px]"
          >
            <BackIcon />
          </Link>

          {showSellers === "pending" ? (
            <div className="font-AeonikProMedium text-[18px] md:text-[24px] text-black">
              Ожидающие продавцы
            </div>
          ) : null}
          {showSellers === "approved" ? (
            <div className="font-AeonikProMedium text-[18px] md:text-[24px] text-black">
              Одобренные продавцы
            </div>
          ) : null}
          {showSellers === "declined" ? (
            <div className="font-AeonikProMedium text-[18px] md:text-[24px] text-black">
              Отказанные продавцы
            </div>
          ) : null}
          {showSellers === "updated" ? (
            <div className="font-AeonikProMedium text-[18px] md:text-[24px] text-black">
              Обновленные продавцы
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-full hidden md:flex items-center my-9">
        {showSellers === "pending" ? (
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
        {showSellers === "approved" ? (
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
        {showSellers === "declined" ? (
          <div className="flex items-center ml-auto">
            <button
              onClick={() => approveFunc()}
              type="button"
              className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
            >
              Одобрить
            </button>
          </div>
        ) : null}
        {showSellers === "updated" ? (
          <div className="flex items-center ml-auto">
            <button
              onClick={() => approveFunc()}
              type="button"
              className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
            >
              Одобрить
            </button>
          </div>
        ) : null}
      </div>

      <div className="mb-[10px] flex items-center text-tableTextTitle">
        <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 py-[10px] md:flex items-center w-full">
          <div
            className={`${
              dataTypeIsPersonal ? "w-[6%]" : "w-[6%]"
            } text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Имя
          </div>
          <div
            className={`${
              dataTypeIsPersonal ? "w-[9%]" : "w-[9%]"
            } px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Фамилия
          </div>
          {dataTypeIsPersonal ? null : (
            <div
              className={`w-[14%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
            >
              Имя организации
            </div>
          )}
          <div
            className={`${
              dataTypeIsPersonal ? "w-[14%]" : "w-[12%]"
            }  px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Номер
          </div>
          <div
            className={`${
              dataTypeIsPersonal ? "w-[17%]" : "w-[15%]"
            }  px-2  text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Email
          </div>
          <div
            className={`${
              dataTypeIsPersonal ? "w-[17%]" : "w-[15%]"
            }  px-2  text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Регион
          </div>
          <div
            className={`${
              dataTypeIsPersonal ? "w-[13%]" : "w-[11%]"
            }  px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Тип
          </div>
          <div
            className={`${
              dataTypeIsPersonal ? "w-[12%]" : "w-[11%]"
            }  px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Раздел
          </div>
          <div
            className={`${
              dataTypeIsPersonal ? "w-[12%]" : "w-[8%]"
            }  px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Дата
          </div>
          <div
            className={`${
              dataTypeIsPersonal ? "w-[16%]" : "w-[15%]"
            }  text-[#3F6175] text-lg not-italic font-AeonikProMedium`}
          >
            Номер карты
          </div>
        </div>
      </div>

      {loader ? (
        <div className="w-full flex justify-center items-center h-[600px]">
          <div
            style={{
              backgroundImage: `url('${WiFiLoader}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
            className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
          ></div>
        </div>
      ) : (
        <div className="w-full">
          <div className="mb-[10px] flex items-center text-tableTextTitle">
            <div className="hidden border-lightBorderColor border rounded-[12px] bg-white px-5 py-[15px] md:flex items-center w-full">
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[6%]" : "w-[6%]"
                }   text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                {data?.name}
              </div>
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[9%]" : "w-[9%]"
                }  px-2 text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                {data?.surname}
              </div>
              {dataTypeIsPersonal ? null : (
                <div
                  className={`w-[14%] px-2 text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
                >
                  {data?.company ? data?.company?.name : "-"}
                </div>
              )}
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[14%]" : "w-[12%]"
                }  px-2 text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                <a href={`${"tel:" + data?.phone}`}>{data?.phone}</a>
              </div>
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[17%]" : "w-[15%]"
                }  break-all px-2  text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                {data?.email}
              </div>
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[17%]" : "w-[15%]"
                }  break-all px-2  text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                {data?.region?.name_ru}, {data?.sub_region?.name_ru}
              </div>
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[13%]" : "w-[11%]"
                }  px-2 text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                {data?.seller_type?.type_ru}
              </div>
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[12%]" : "w-[11%]"
                }  px-2 text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                {data?.seller_type?.name_ru}
              </div>
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[12%]" : "w-[8%]"
                }  px-2 text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                {data?.created_at}
              </div>
              <div
                className={`${
                  dataTypeIsPersonal ? "w-[16%]" : "w-[15%]"
                } w-[15%] text-[#2C2C2C] text-[13px] md:text-base not-italic font-AeonikProMedium`}
              >
                {data?.card_number}
              </div>
            </div>
          </div>

          {/* Mobile */}

          <div className="block md:hidden border rounded-[8px] border-[#F2F2F2] p-[10px] w-full mb-[12px]">
            <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
              <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                Имя и Фамилия
              </div>
              <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                Тип
              </div>
            </div>

            <div className="py-[5px] px-[15px] flex mb-[10px]">
              <div className="w-[50%] text-[13px] pr-3 font-AeonikProMedium text-[#2C2C2C]">
                {data?.name} {data?.surname}
              </div>
              <div className="w-[50%] text-[13px] pr-3 font-AeonikProMedium text-[#2C2C2C]">
                {data?.seller_type?.type_ru}
              </div>
            </div>

            <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
              <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                Номер
              </div>
              <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                Email
              </div>
            </div>

            <div className="py-[5px] px-[15px] flex mb-[12px]">
              <div className="w-[50%] text-[13px] pr-3 font-AeonikProMedium text-[#2C2C2C]">
                <a href={`${"tel:" + data?.phone}`}>{data?.phone}</a>
              </div>
              <div className="w-[50%] break-all text-[13px] font-AeonikProMedium text-[#2C2C2C]">
                {data?.email}
              </div>
            </div>

            <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
              <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                Раздел
              </div>
              {dataTypeIsPersonal ? (
                <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                  Номер карты
                </div>
              ) : (
                <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                  Имя организации
                </div>
              )}
            </div>

            <div className="py-[5px] px-[15px] flex mb-[12px]">
              <div className="w-[50%] text-[13px] font-AeonikProMedium text-[#2C2C2C] pr-[15px]">
                {data?.seller_type?.type_ru}
              </div>
              {dataTypeIsPersonal ? (
                <div className="w-[50%] text-[13px] font-AeonikProMedium text-[#2C2C2C] pr-[15px]">
                  {data?.card_number}
                </div>
              ) : (
                <div className="w-[50%] text-[13px] font-AeonikProMedium text-[#2C2C2C]">
                  {data?.company ? data?.company?.name : "-"}
                </div>
              )}
            </div>

            {dataTypeIsPersonal ? null : (
              <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                  Номер карты
                </div>
                <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                  Регион
                </div>
              </div>
            )}

            {dataTypeIsPersonal ? null : (
              <div className="py-[5px] px-[15px] flex mb-[8px]">
                <div className="w-[50%] text-[13px] break-all font-AeonikProMedium text-[#2C2C2C] pr-[15px]">
                  {data?.card_number}
                </div>
                <div className="w-[50%] break-all text-[13px] font-AeonikProMedium text-[#2C2C2C]">
                  {data?.region?.name_ru}, {data?.sub_region?.name_ru}
                </div>
              </div>
            )}

            {dataTypeIsPersonal ? (
              <div className="w-full">
                <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                  <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                    Регион
                  </div>
                  <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                    Дата
                  </div>
                </div>

                <div className="py-[5px] px-[15px] flex mb-[12px]">
                  <div className="w-[50%] break-all pr-[12px] text-[13px] font-AeonikProMedium text-[#2C2C2C]">
                    {data?.region?.name_ru}, {data?.sub_region?.name_ru}
                  </div>
                  <div className="w-[50%] text-[13px] font-AeonikProMedium text-[#2C2C2C]">
                    {data?.created_at}
                  </div>
                </div>
              </div>
            ) : null}

            {dataTypeIsPersonal ? null : (
              <div className="w-full">
                <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                  <div className="text-[#3F6175] text-[13px] font-AeonikProMedium w-[50%]">
                    Дата
                  </div>
                </div>
                <div className="py-[5px] px-[15px] flex mb-[12px]">
                  <div className="w-[50%] text-[13px] font-AeonikProMedium text-[#2C2C2C]">
                    {data?.created_at}
                  </div>
                </div>
              </div>
            )}

            <div className="w-full flex gap-[30px]">
              <button
                onClick={() => {
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
          </div>
        </div>
      )}

      <ToastContainer autoClose={2000} />

      <CancelModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        id={params?.id}
      />
    </div>
  );
};
