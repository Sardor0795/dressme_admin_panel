import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { BackIcon } from "../../../../../assets/icon";
import axios from "axios";

import WiFiLoader from "../../../../../assets/loader/wifi_loader.gif";

export default function ShopLocations() {
  const [shopLocationsData, setShopLoationsData] = useState();

  const [loader, setLoader] = useState(true);

  const url = "https://api.dressme.uz";

  const params = useParams();

  useEffect(() => {
    axios(`${url}/api/admin/shop/${params?.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setShopLoationsData(res?.data?.locations);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full md:px-0 ">
      <div className="md:hidden pt-6 pb-3 border-b border-[#F2F2F2] mb-3 flex items-center justify-between">
        <button
          onClick={() => {
            navigate(`/shops/shop/${params?.id}`);
          }}
          className="w-8 h-8 md:hidden flex mr-5 items-center cursor-pointer justify-center border border-borderColor rounded-lg"
        >
          <BackIcon />
        </button>
        <p className="text-black text-2xl not-italic font-AeonikProMedium text-center">
          Локации
        </p>
        <div className="w-[30px]"></div>
      </div>

      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor hidden md:block">
        <div className="flex justify-end items-center md:justify-between">
          <section className="hidden md:flex items-center">
            <button
              onClick={() => {
                navigate(`/shops/shop/${params?.id}`);
              }}
              className="md:w-8 md:h-8 w-6 h-6 hidden md:flex mr-5 items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <BackIcon />
            </button>
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Локации
            </p>
          </section>
        </div>
      </div>

      {/* Table */}
      {shopLocationsData?.length > 0 ? (
        <div className="w-full h-full">
          <div className="w-full mb-[10px] hidden md:block">
            <ul className="w-full h-full flex items-center justify-between bg-lightBgColor border md:rounded-xl">
              <li className="w-[70px] pl-4">
                <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle2">
                  No:
                </span>
              </li>
              <li className="w-[200px] pl-4 mr-[60px]">
                <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle2">
                  Фото
                </span>
              </li>
              <div className="w-[calc(100%-230px)]  flex items-center">
                <li className="w-[24%] ">
                  <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                    Регион{" "}
                  </span>
                </li>
                <li className="w-[26%]">
                  <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                    Адрес
                  </span>
                </li>
                <li className="w-[50%]">
                  <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                    Рабочее время
                  </span>
                </li>
              </div>
            </ul>
          </div>

          <div className="w-full h-full flex flex-col  md:rounded-xl overflow-auto rounded-xl ">
            {shopLocationsData?.map((data, index) => {
              // console.log(data,'data');
              return (
                <div key={index} className="mb-2">
                  <ul
                    key={data?.id}
                    className="w-full rounded-xl md:px-0 md:py-3 md:bg-lightBgColor overflow-hidden hidden md:flex items-center justify-between mb-[6px] md:mb-0 gap-x-5 md:gap-x-0 border  bg-lightBgColor"
                  >
                    <li className="w-[70px]  pl-4 flex items-center text-tableTextTitle2 text-lg not-italic font-AeonikProRegular">
                      {index + 1}
                    </li>
                    <li className="w-[200px] h-[100px] flex items-center mr-[60px] rounded-lg overflow-hidden border">
                      <img
                        className="w-[100%] h-[100%] object-contain rounded-lg object-top"
                        src={data?.url_image_path_one}
                        alt=""
                      />
                    </li>
                    <div className="w-[calc(100%-230px)] flex items-center justify-between">
                      <li className="md:w-[26%] h-full">
                        <span className="text-textLightColor md:text-tableTextTitle2 text-[13px] md:text-[13px] not-italic font-AeonikProMedium">
                          {data?.region?.name_ru || "city"},{" "}
                          {data?.sub_region?.name_ru || "sub_region"}
                        </span>
                      </li>
                      <li className="md:w-[28%] h-full md:pr-6">
                        <span className="text-textLightColor md:text-tableTextTitle2 text-[13px] md:text-[13px] not-italic font-AeonikProMedium ">
                          {data?.address || "address"}
                        </span>{" "}
                      </li>
                      <li className="md:w-[28%] h-full">
                        <span className="text-textLightColor md:text-tableTextTitle2 text-[13px] md:text-[13px] not-italic font-AeonikProMedium ">
                          {data?.work_time_from || "startTime"} -{" "}
                          {data?.work_time_to || "endTime"}
                        </span>
                      </li>
                      <li className="md:w-[25%] h-full flex items-center justify-center text-center">
                        <NavLink
                          to={`/shops/locations/location/${data?.id}`}
                          className="text-textBlueColor text-center hover:underline text-[13px] md:text-[13px] not-italic font-AeonikProMedium"
                        >
                          Подробнее
                        </NavLink>
                      </li>
                    </div>
                  </ul>

                  {/* Mobile */}
                  <div className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full">
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
                        <div className="w-[24%] text-[#3F6175] text-[13px] not-italic font-AeonikProMedium pr-[10px]">
                          Регион
                        </div>
                        <div className="w-[46%] text-[#3F6175] text-[13px] not-italic font-AeonikProMedium pr-[10px]">
                          Адрес
                        </div>
                        <div className="w-[30%] text-[#3F6175] text-[13px] text-center not-italic font-AeonikProMedium">
                          Рабочее время
                        </div>
                      </div>

                      <div className="px-1 ll:px-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[13px]">
                        <div className="pr-[5px] ll:pr-[10px] w-[24%] break-words  text-gray-700 text-[13px] not-italic font-AeonikProMedium">
                          {data?.region?.name_ru}
                        </div>
                        <div className="relative pr-[5px] ll:pr-[10px] h-fit overflow-hidden  w-[46%]	text-[13px] not-italic font-AeonikProMedium">
                          <div className="absolute ToogleOff left-0 w-full h-full z-[10] top-0"></div>
                          {data?.address}
                        </div>
                        <div className="w-[30%] flex  justify-center text-[13px] not-italic font-AeonikProMedium">
                          {data?.work_time_from || "startTime"} -{" "}
                          {data?.work_time_to || "endTime"}
                        </div>
                      </div>
                    </div>
                    {/* {data?.region?.name_ru || "city"}, {data?.sub_region?.name_ru || "sub_region"} */}

                    <div className="flex items-center justify-between gap-x-[15px]">
                      <Link
                        to={`/shops/locations/location/${data?.id}`}
                        className="text-[#007DCA] bg-[#E8F5FD] text-center w-[100%] h-[31px] py-2 rounded-lg text-[13px] md:text-[13px] not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                      >
                        Подробнее
                        <span className="ml-[10px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_1350_8461)">
                              <path
                                d="M5.80625 4.7502H1.25C1.0375 4.7502 0.859253 4.6782 0.715253 4.5342C0.571253 4.3902 0.499503 4.2122 0.500003 4.0002C0.500003 3.7877 0.572003 3.60945 0.716003 3.46545C0.860003 3.32145 1.038 3.2497 1.25 3.2502H5.80625L4.0625 1.4877C3.925 1.3502 3.853 1.1782 3.8465 0.971695C3.84 0.765195 3.912 0.587195 4.0625 0.437695C4.2 0.300195 4.375 0.231445 4.5875 0.231445C4.8 0.231445 4.975 0.300195 5.1125 0.437695L8.15 3.4752C8.3 3.6252 8.375 3.8002 8.375 4.0002C8.375 4.2002 8.3 4.3752 8.15 4.5252L5.1125 7.5627C4.975 7.70019 4.803 7.7722 4.5965 7.7787C4.39 7.78519 4.212 7.71319 4.0625 7.5627C3.925 7.4252 3.85625 7.25019 3.85625 7.03769C3.85625 6.82519 3.925 6.6502 4.0625 6.5127L5.80625 4.7502ZM9.5 7.7502C9.2875 7.7502 9.1095 7.67819 8.966 7.53419C8.8225 7.39019 8.7505 7.21219 8.75 7.0002C8.75 6.78769 8.822 6.60945 8.966 6.46545C9.11 6.32145 9.288 6.24969 9.5 6.2502H14.75C14.9625 6.2502 15.1408 6.3222 15.2848 6.4662C15.4288 6.6102 15.5005 6.7882 15.5 7.0002C15.5 7.2127 15.428 7.39094 15.284 7.53494C15.14 7.67894 14.962 7.7507 14.75 7.7502H9.5ZM9.5 1.7502C9.2875 1.7502 9.1095 1.6782 8.966 1.5342C8.8225 1.3902 8.7505 1.2122 8.75 1.0002C8.75 0.787695 8.822 0.609446 8.966 0.465446C9.11 0.321446 9.288 0.249695 9.5 0.250195H14.75C14.9625 0.250195 15.1408 0.322195 15.2848 0.466195C15.4288 0.610195 15.5005 0.788195 15.5 1.0002C15.5 1.2127 15.428 1.39095 15.284 1.53495C15.14 1.67895 14.962 1.7507 14.75 1.7502H9.5ZM11.75 4.7502C11.5375 4.7502 11.3593 4.6782 11.2153 4.5342C11.0713 4.3902 10.9995 4.2122 11 4.0002C11 3.7877 11.072 3.60945 11.216 3.46545C11.36 3.32145 11.538 3.2497 11.75 3.2502H14.75C14.9625 3.2502 15.1408 3.3222 15.2848 3.4662C15.4288 3.6102 15.5005 3.7882 15.5 4.0002C15.5 4.2127 15.428 4.39095 15.284 4.53495C15.14 4.67895 14.962 4.7507 14.75 4.7502H11.75Z"
                                fill="#007DCA"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1350_8461">
                                <rect
                                  width="15"
                                  height="7.54765"
                                  fill="white"
                                  transform="translate(0.5 0.231445)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-lightBgColor rounded-lg h-[calc(100vh-280px)]">
          {loader ? (
            <div
              style={{
                backgroundImage: `url('${WiFiLoader}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
              className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
            ></div>
          ) : (
            <div className="w-full mt-11 md:mt-20 h-[80vh] flex items-center justify-center font-AeonikProMedium text-2xl">
              Нет локаций
            </div>
          )}
        </div>
      )}
    </div>
  );
}
