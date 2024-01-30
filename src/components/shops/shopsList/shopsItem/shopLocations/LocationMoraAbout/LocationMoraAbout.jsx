import { useNavigate, useParams } from "react-router-dom";
import { BackIcon, MapLocationIcon, SearchIcon, StarIcon } from "../../../../../../assets/icon";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Map, YMaps } from "react-yandex-maps";

export default function LocationMoreAbout() {

  const [, setMapConstructor] = useState(null);
    const mapRef = useRef(null);
    const searchRef = useRef(null);
    // const [isSendedLocation, setIsSendedLocation] = useState(true);

    const [forMaps, setForMaps] = useState({
        title: "",
        center: [],
        zoom: 12,
    });

    // const mapOptions = {
    //     modules: ["geocode", "SuggestView"],
    //     defaultOptions: { suppressMapOpenBlock: true },
    // };

    // reset state & search
    const handleReset = () => {
        setForMaps({ ...forMaps, title: "" });
        searchRef.current.value = "";
    };

  // change title
  const handleBoundsChange = () => {};

  const [shopLocationsData, setShopLoationData] = useState()

  console.log(shopLocationsData,'shopLocationsData');

  const url = "https://api.dressme.uz";

  const params = useParams();
  let token = sessionStorage.getItem("token");
  
  useEffect(() => {
    axios(`${url}/api/admin/locations/${params?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res?.data?.location,'res');
      setShopLoationData(res?.data?.location)
      setForMaps({
        ...forMaps,
        title: res?.data?.location?.address,
        center: [parseFloat(res?.data?.location?.latitude?.slice(0, 9)), parseFloat(res?.data?.location?.longitude?.slice(0, 9))]
        })
    });
  }, []);

  const navigate = useNavigate();
  
  return (
    <div className="w-full md:px-10 ">
      <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12 mb-[30px]">
        <div className="my-4">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="  md:hidden absolute left-2 flex items-center cursor-pointer justify-center "
            >
              <BackIcon />
            </button>
            <div className="text-center text-xl md:text-[35px] font-AeonikProMedium md:px-0">
              Редактировать местоположения
            </div>
          </div>
          <div className="w-full flex items-center justify-end md:justify-between px-4 md:px-0 mb-2 md:mb-3 md:pb-0 pb-[8px] md:border-none border-b border-borderColor">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <BackIcon />
            </button>
          </div>
          {/* Location of Maps */}
          <div className="h-[400px]">
            <div className={`w-full `}>
              <div className={"relative h-[400px] bg-white z-[9999]"}>
                  <YMaps
                  // query={{
                  //   apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21",
                  //   lang: "uz",
                  // }}
                >
                  <Map
                    className={` overflow-hidden w-full h-full`}
                    // {...mapOptions}
                    state={{
                      center: forMaps?.center,
                      zoom: forMaps?.zoom,
                      title: forMaps?.title
                    }}
                    defaultState={forMaps}
                    onLoad={setMapConstructor}
                    onBoundsChange={handleBoundsChange}
                    instanceRef={mapRef}
                  >
                    <div className="h-fit p-1 md:p-[10px] absolute top-2 z-40 gap-x-5 mx-1 md:mx-2 backdrop-blur-sm bg-yandexNavbar left-0 right-0 flex items-center justify-between border px-1 md:px-3 rounded-lg">
                      <label
                        htmlFor="ForSearch"
                        className="w-[100%] h-full flex items-center justify-between bg-white  border border-textLightColor px-1 md:px-3 rounded-lg"
                      >
                        <input
                          ref={searchRef}
                          placeholder="Введите адрес"
                          name=""
                          value={forMaps?.title}
                          id="ForSearch"
                          disabled
                          className={`w-full outline-none text-sm font-AeonikProMedium mr-3 h-10 rounded-lg`}
                        />
                        {forMaps?.title?.length ? (
                          <button
                            onClick={handleReset}
                            disabled
                            className="cursor-pointer flex items-center h-10 justify-center "
                          >
                            {/* <GrClose className="pointer-events-none" /> */}
                          </button>
                        ) : (
                          <button
                          disabled
                            type="submit"
                            className="cursor-pointer flex items-center h-10 justify-center "
                          >
                            <SearchIcon />
                          </button>
                        )}
                      </label>
                      
                    </div>

                    <span className={"placemark"}>
                      <MapLocationIcon color="primary" />
                    </span>
                    {/* <ZoomControl
                      options={{
                        float: "right",
                        position: { bottom: 200, right: 10, size: "small" },
                        size: "small",
                      }}
                    />{" "} */}
                    {/* <GeolocationControl
                      options={{
                        float: "right",
                        position: { bottom: 60, right: 10 },
                        size: "small",
                      }}
                    /> */}
                  </Map>
                </YMaps>
              </div>
            </div>
          </div>
          <div className=" px-4 md:px-0 flex mt-[10px] justify-between items-centers gap-x-[5px] ls:gap-x-[10px] md:gap-[25px] mb-[25px] ">
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <div className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center ">
                    {shopLocationsData?.url_image_path_one ? (
                        <img src={shopLocationsData?.url_image_path_one} alt="backImg" className="w-full h-full object-contain rounded-lg" /> 
                    ) : (
                    <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        Фото локации
                    </span>
                    )} 
              </div>
            </div>
            <div className=" w-full md:w-[31%] h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <div className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center ">
                    {shopLocationsData?.url_image_path_two ? (
                        <img src={shopLocationsData?.url_image_path_two} alt="backImg" className="w-full h-full object-contain rounded-lg" /> 
                    ) : (
                    <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        Фото локации
                    </span>
                    )} 
              </div>
            </div>
            <div className=" w-full md:w-[31%] h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <div className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center ">
                {shopLocationsData?.url_image_path_three ? (
                    <img src={shopLocationsData?.url_image_path_three} alt="backImg" className="w-full h-full object-contain rounded-lg" /> 
                ) : (
                  <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                    Фото локации
                  </span>
                )} 
              </div>
            </div>
          </div>
          <div className="w-full  px-4 md:px-0  ">
            <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 ">
              <div className="w-full md:w-[31%] xs:w-[48%]   ">
                <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                  Имя администратора{" "}
                  <span className="ml-[5px]">
                    <StarIcon />
                  </span>
                </div>
                <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[287px] text-base font-AeonikProMedium">
                  <input
                    type="text"
                    name="fname"
                    disabled
                    value={shopLocationsData?.assistant_name || ''}
                    placeholder=" Имя администратора"
                    className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2"
                  />
                </div>
              </div>
              <div className="w-full md:w-[31%] xs:w-[48%]  ">
                <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                  Имя второго администратора{" "}
                </div>
                <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[287px] text-base font-AeonikProMedium">
                  <input
                    type="text"
                    name="fsecond_name"
                    disabled
                    value={shopLocationsData?.second_assistant_name || ''}
                    placeholder=" Имя администратора"
                    className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2"
                  />
                </div>
              </div>
              <div className="w-full md:w-[31%] xs:w-[48%]">
                <div className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                  Рабочее время
                  <span className="ml-[5px]">
                    <StarIcon />
                  </span>
                </div>
                <div className="w-full flex  items-center">
                  <span className="w-fit text-[12px] md:text-base flex items-center">
                    от
                  </span>
                  <div className="without_ampm mr-5 ml-[5px] outline-none w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-8 md:h-11 rounded md:rounded-lg md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular " >
                    {shopLocationsData?.work_time_from}
                  </div>
                  <span className="w-fit text-[12px] md:text-base flex items-center ">
                    до
                  </span>
                  <div className="without_ampm mr-5 ml-[5px]  outline-none w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-8 md:h-11 rounded-lg md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular " >
                      {shopLocationsData?.work_time_to}
                  </div>
                </div>
              </div>
              <label className="w-full md:w-[31%] xs:w-[48%]">
                <div className="text-xs md:text-base flex items-center mb-[10px]">
                  Номер администратора
                  <span className="ml-[5px]"><StarIcon /></span>
                </div>
                <div className="mt-[6px] h-8 md:h-11 flex items-center justify-center overflow-hidden border border-searchBgColor rounded md:rounded-lg">
                  <div className="ss:w-[35%] md:w-[30%] h-8 md:h-11 flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                    <div
                      className="w-[40px] flex items-center outline-none h-full select-none mx-2 not-italic font-AeonikProRegular text-xs md:text-base leading-4 text-black"
                    > 
                    {/* {state?.idAssistantPhoneCode ? "+" + state?.idAssistantPhoneCode : "+998"} */} +998
                    </div>
                  </div>
                  <div className="w-[65%] md:w-[70%] h-[42px] overflow-hidden">
                    <input
                      mask="(99) 999-99-99"
                      disabled
                      name="phone"
                      value={shopLocationsData?.assistant_phone || ''}
                      className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic 
                      ${shopLocationsData?.assistant_phone ? "font-AeonikProMedium" : null } 
                        text-xs md:text-base leading-4 text-black`}
                      placeholder={"(99) 999-99-99"}
                    />
                  </div>
                </div>

              </label>
              <label className="w-full md:w-[31%] xs:w-[48%]">
                <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                  Номер второго администратора{" "}
                </div>

                <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded md:rounded-lg h-8 md:h-11">
                  <div className="w-[35%] md:w-[30%] flex items-center justify-center cursor-pointer border-r border-searchBgColor overflow-hidden">
                    <div className="w-[40px] flex items-center outline-none h-full select-none mx-2 not-italic font-AeonikProRegular leading-4 text-black text-xs md:text-base" > 
                    {/* {state?.idSecondAssistantPhoneCode ? "+" + state?.idSecondAssistantPhoneCode : "+998"} */} +998
                    </div>
                  </div>
                  <div className="w-[65%] md:w-[70%] h-8 md:h-11 overflow-hidden">
                    <input
                      mask="(99) 999-99-99"
                      name="phone"
                      disabled
                      value={shopLocationsData?.second_assistant_phone || ''}
                      className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${shopLocationsData?.second_assistant_phone ? "font-AeonikProMedium" : null
                        } text-xs md:text-base leading-4 text-black`}
                      placeholder={"(99) 999-99-99"}
                    />
                  </div>
                </div>
              </label>
              <div className="w-full md:w-[31%] xs:w-[48%]">
                <div className="w-full h-fit flex justify-center ">
                  {/* Region Input  */}
                  <div className={"w-full"}>
                    <div htmlFor="" >
                      <div className="flex items-center text-[#303030] text-xs md:text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
                        Выберите регион
                      </div>
                      <div className="w-full h-8 md:h-11 mt-[6px] md:mt-[10px] px-[15px] flex items-center justify-between font-AeonikProRegular rounded md:rounded-lg border border-searchBgColor">
                        <div className="flex items-center text-[#000] text-xs md:text-base">
                            <span className="ml-1">{shopLocationsData?.region?.name_ru}, {shopLocationsData?.sub_region?.name_ru}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* <div className="flex justify-center mt-[50px]  px-4 md:px-0 ">
            <button
            //   onClick={() => handleEditLocation()}
              className="w-full md:w-fit h-[42px] flex items-center justify-center md:px-[100px]  bg-textBlueColor text-white rounded md:rounded-lg active:scale-95"
            >
              Cохранит
            </button>
          </div> */}
        </div>

      </div >
    </div >
  );
}
