import { useContext, useEffect, useState } from "react";
import { BackIcon, StarIcon } from "../../../assets/icon";
import CancelModal from "./modalCancel";
import { ColorModal } from "./modalColor";
import Carousel from "./carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClothesDataContext } from "../../../context/clothesDataContext";
import { SellersContext } from "../../../context/sellersContext";
import { ReFreshTokenContext } from "../../../context/reFreshToken";
import { IdsContext } from "../../../context/idContext";

export const ClothMoreAbout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  // const [allPhotosModalOpen, setAllPhotosModalOpen] = useState(false);

  const url = "https://api.dressme.uz";
  const [data, setData] = useState([]);

  const seasons = data?.seasons;
  const colors = data?.colors;
  const sections = data?.sections ? data?.sections : [];
  const subSections = data?.sub_sections ? data?.sub_sections : [];

  const [, setId] = useContext(IdsContext);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios(`${url}/api/admin/products/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then((d) => {
        setData(d?.data?.product);
      });
    }
  }, []);

  // Products Context
  const [showSellers] = useContext(SellersContext);
  const [, , reFetch] = useContext(ClothesDataContext);
  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-product-status/${params?.id}`,
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
          navigate("/clothes");
        }
      })
      .catch((v) => {
        if (v?.response?.status === 401 || v?.response?.status === 403) {
          reFreshTokenFunc();
          approveFunc();
        }
      });
  };

  // DISABLE BACKGROUND SCROLL WHEN MODAI IS OPENED
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else if (colorModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen, colorModalOpen]);

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

  return (
    <div className="flex flex-col w-full">
      <div className="md:border-b py-[18px] flex items-center mb-[6px]">
        <button
          onClick={() => {
            navigate(`/clothes`);
          }}
          className="w-8 h-8 flex mr-auto md:mr-[30px] items-center cursor-pointer justify-center border border-borderColor rounded-lg"
        >
          <BackIcon />
        </button>
        {showSellers === "pending" ? (
          <div className="font-AeonikProMedium mr-auto md:mr-0 text-[18px] md:text-[24px] text-black">
            Ожидающие товары
          </div>
        ) : null}
        {showSellers === "approved" ? (
          <div className="font-AeonikProMedium mr-auto md:mr-0 text-[18px] md:text-[24px] text-black">
            Одобренные товары
          </div>
        ) : null}
        {showSellers === "declined" ? (
          <div className="font-AeonikProMedium mr-auto md:mr-0 text-[18px] md:text-[24px] text-black">
            Отказанные товары
          </div>
        ) : null}
        {showSellers === "updated" ? (
          <div className="font-AeonikProMedium mr-auto md:mr-0 text-[18px] md:text-[24px] text-black">
            Обновленные товары
          </div>
        ) : null}
      </div>

      <div className="w-full flex items-center justify-between md:my-5">
        <div className="hidden md:flex items-center ml-auto">
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
      </div>

      <div className="flex flex-wrap md:flex-nowrap w-full md:gap-[30px]">
        <div className="w-full md:w-[20%] md:max-w-[350px] md:h-[400px]">
          <Carousel data={data} height={"h-[377px]"} />
        </div>

        <div className="md:pr-[30px] pt-[20px] md:pt-0 md:border-r border-[#E5E5E5] flex flex-wrap md:flex-nowrap gap-[25px] w-full md:w-[54%]">
          {/* 1 */}
          <div className="font-AeonikProRegular text-[16px] w-full md:w-[50%]">
            <div className="flex flex-wrap gap-[11px] md:gap-[0]">
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Раздел одежды</span> <StarIcon />
                </div>
                <div className="border whitespace-nowrap overflow-x-auto text-[16px] text-black min-h-[42px] h-fit border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  {sections?.length > 1
                    ? sections?.map((item) => {
                        return item?.name_ru + ", ";
                      })
                    : sections[0]?.name_ru}
                </div>
              </div>
              <div className="w-full md:hidden">
                <div className="whitespace-nowrap overflow-x-auto h-fit md:hidden flex items-center mb-[5px]">
                  <span className={`mr-[5px]`}>Подраздел одежды</span>
                  {subSections?.length ? <StarIcon /> : null}
                </div>
                <div
                  className={`
                  } md:hidden flex items-center whitespace-nowrap overflow-x-auto h-fit text-[16px] text-black border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]`}
                >
                  {subSections?.length > 1
                    ? subSections?.map((item) => {
                        return item?.name_ru + ", ";
                      })
                    : subSections[0]?.name_ru
                    ? subSections[0]?.name_ru
                    : "-"}
                </div>
              </div>
            </div>

            <div className="flex gap-[11px] md:gap-[0]">
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Сезон одежды</span> <StarIcon />
                </div>
                <div className="flex items-center border h-[40px] border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]">
                  {seasons?.length
                    ? seasons?.map((item) => {
                        return (
                          <span key={item?.id}>{item?.name_ru + " "}</span>
                        );
                      })
                    : "-"}
                </div>
              </div>
              <div className="w-full md:hidden">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Цвет</span> <StarIcon />
                </div>
                <div className="p-[8px] w-fit h-[40px] flex items-center justify-center border border-[#E5E5E5] rounded-[8px] mb-[25px]">
                  {colors?.length
                    ? colors?.map((item) => {
                        return (
                          <div
                            key={item?.id}
                            style={{ backgroundColor: item?.hex }}
                            className={`mr-[8px] border last:mr-0 w-[22px] h-[22px] rounded-[50%]`}
                          ></div>
                        );
                      })
                    : "-"}
                </div>
              </div>
            </div>

            <div className="flex mb-[25px] gap-[11px] md:gap-[0]">
              <div className="w-[45%] md:w-fit md:mr-[15px]">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Пол</span> <StarIcon />
                </div>
                <div className="h-[40px] flex items-center border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3">
                  {data?.gender?.name_ru}
                </div>
              </div>
              <div className="w-full md:w-fit">
                <div className="mr-[5px] mb-[5px]">Возрастная категория</div>
                <div className="flex items-center  text-[16px] text-black">
                  <div className="flex items-center h-[40px] border border-[#E5E5E5] rounded-[8px] py-3 px-5">
                    {data?.min_age_category}
                  </div>
                  <span className="border-t border-[#E5E5E5] w-[15px] mx-[5px]"></span>
                  <div className="flex items-center h-[40px] border border-[#E5E5E5] rounded-[8px] py-3 px-5">
                    {data?.max_age_category}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Категория одежды</span> <StarIcon />
            </div>
            <div className="flex w-full mb:block gap-[11px] md:gap-[0]">
              <div className="flex w-full flex-wrap xxxl:flex-nowrap justify-between mb-[25px] gap-[10px]">
                <div className="h-[40px] w-full  whitespace-nowrap font-AeonikProRegular text-[16px] xxxl:w-full rounded-lg border border-[#E5E5E5]  py-[12px] px-[15px] text-black">
                  {data?.category?.name_ru}
                </div>
                <button
                  onClick={() => setColorModalOpen(true)}
                  className="whitespace-nowrap font-AeonikProMedium text-[16px] w-full xxxl:max-w-[160px] border-[1.5px] border-[#007DCA] rounded-lg text-[#007DCA] py-[12px] px-[15px] bg-white"
                >
                  Все размеры
                </button>
              </div>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Качество на русском</span> <StarIcon />
            </div>
            <div className="h-[40px] border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]">
              {data?.quality_ru}
            </div>

            <div className="flex md:hidden items-center mb-[5px]">
              <span className="mr-[5px]">Качество на узбекском</span>{" "}
              <StarIcon />
            </div>
            <div className="h-[40px] flex md:hidden items-center border border-[#E5E5E5] text-black rounded-[8px] p-3 mb-[25px]">
              {data?.quality_uz}
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Состав на русском</span>
            </div>
            <div className="h-[40px] border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.composition_ru ? (
                <span className="font-AeonikProRegular text-[16px] text-black">
                  {data?.composition_ru}
                </span>
              ) : (
                "-"
              )}
            </div>

            <div className="flex md:hidden items-center mb-[5px]">
              <span className="mr-[5px]">Состав на узбекском</span>
            </div>
            <div className="h-[40px] flex md:hidden items-center border border-[#E5E5E5] rounded-[8px] p-3">
              {data?.composition_uz ? (
                <span className="flex items-center font-AeonikProRegular text-[16px] text-black">
                  {data?.composition_uz}
                </span>
              ) : (
                "-"
              )}
            </div>

            <div className="w-full hidden md:block">
              <div className="flex items-center mb-[5px]">
                <span className="mr-[5px]">Магазин</span> <StarIcon />
              </div>
              <div className="border whitespace-nowrap overflow-x-auto text-[16px] text-black min-h-[42px] h-fit border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                {data?.shop?.name ? data?.shop?.name : "-"}
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="w-full md:w-[50%]">
            <div className="hidden md:flex items-center mb-[5px]">
              <span className={`mr-[5px]`}>Подраздел одежды</span>{" "}
              {subSections?.length ? <StarIcon /> : null}
            </div>
            <div
              className={`hidden md:block border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]`}
            >
              {subSections?.length > 1
                ? subSections?.map((item) => {
                    return item?.name_ru + ", ";
                  })
                : subSections[0]?.name_ru
                ? subSections[0]?.name_ru
                : "-"}
            </div>
            <div className="hidden md:flex items-center mb-[5px]">
              <span className="mr-[5px]">Цвет</span> <StarIcon />
            </div>
            <div className="w-fit h-[42px] px-[10px] hidden md:flex items-center justify-center border border-[#E5E5E5] rounded-[8px] mb-[25px] min-w-[43px]">
              {colors?.length
                ? colors?.map((item) => {
                    return (
                      <div
                        key={item?.id}
                        style={{ backgroundColor: item?.hex }}
                        className={`mr-[8px] border last:mr-0 w-[22px] h-[22px] rounded-[50%]`}
                      ></div>
                    );
                  })
                : "-"}
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Артикул</span>
            </div>
            <div className="h-[40px] flex items-center border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]">
              {data?.sku}
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px] whitespace-nowrap">
                    Производитель
                  </span>
                  <StarIcon />
                </div>
                <div className="h-[40px] w-full flex items-center text-[16px] text-black border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  {data?.producer?.name_ru}
                </div>
              </div>
            </div>
            <div>
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Тип</span>
                  <StarIcon />
                </div>
                <div className="h-[40px] w-full flex items-center text-[16px] text-black border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  {data?.type?.name_ru}
                </div>
              </div>
            </div>

            <div className="md:flex hidden items-center mb-[5px]">
              <span className="mr-[5px]">Состав на узбекском</span>
            </div>
            <div className="h-[40px] md:flex hidden items-center border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.composition_uz ? (
                <span className="flex items-center font-AeonikProRegular text-[16px] text-black">
                  {data?.composition_uz}
                </span>
              ) : (
                "-"
              )}
            </div>

            <div className="w-full flex flex-col">
              <div className="hidden md:flex items-center mb-[5px]">
                <span className={`mr-[5px]`}>Локация</span> <StarIcon />
              </div>
              <div
                className={`hidden md:block h-fit border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]`}
              >
                {data?.locations
                  ? data?.locations?.map((item) => {
                      return (
                        <div
                          className="border border-[#E5E5E5] p-[6px] rounded-lg mb-[2px]"
                          key={item?.id}
                        >
                          {item?.address}
                        </div>
                      );
                    })
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[26%]">
          <div className="md:flex hidden items-center mb-[5px]">
            <span className="mr-[5px]">Качество на узбекском</span> <StarIcon />
          </div>
          <div className="h-[40px] md:flex hidden items-center border border-[#E5E5E5] text-black rounded-[8px] p-3 mb-[25px]">
            {data?.quality_uz}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Название на русском</span> <StarIcon />
          </div>
          <div className="h-[40px] break-all flex items-center border border-[#E5E5E5] text-black rounded-[8px] p-3 mb-[25px]">
            {data?.name_ru}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Название на узбекском</span> <StarIcon />
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] text-black rounded-[8px] p-3 mb-[25px]">
            {data?.name_uz}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Описание на русском</span>
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] rounded-[8px] text-black p-3 mb-[25px]">
            {data?.description_ru ? data?.description_ru : "-"}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Описание на узбекском</span>
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] rounded-[8px] text-black p-3 mb-[25px]">
            {data?.description_uz ? data?.description_uz : "-"}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Бренд</span>
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
            {data?.brand?.name ? data?.brand?.name : "-"}
          </div>
          <div className="w-full block md:hidden">
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Магазин</span> <StarIcon />
            </div>
            <div className="border whitespace-nowrap overflow-x-auto text-[16px] text-black min-h-[42px] h-fit border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.shop?.name ? data?.shop?.name : "-"}
            </div>
          </div>
          <div className="w-full flex md:hidden flex-col">
            <div className="flex items-center mb-[5px]">
              <span className={`mr-[5px]`}>Локация</span> <StarIcon />
            </div>
            <div
              className={`block h-fit border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]`}
            >
              {data?.locations
                ? data?.locations?.map((item) => {
                    return (
                      <div
                        className="border border-[#E5E5E5] p-[6px] rounded-lg mb-[2px]"
                        key={item?.id}
                      >
                        {item?.address}
                      </div>
                    );
                  })
                : "-"}
            </div>
          </div>
        </div>

        <div className="flex md:hidden w-full gap-[12px] mb-[20px]">
          <button
            onClick={() => {
              setId({ type: "single", id: params?.id });
              setModalOpen(true);
            }}
            className={`${
              data?.status === "pending" || data?.status === "approved"
                ? ""
                : "hidden"
            } w-full text-[16px] font-AeonikProMedium text-white p-[12px] rounded-lg bg-[#E85151]`}
          >
            Отказать
          </button>
          <button
            onClick={() => approveFunc()}
            className={`${
              data?.status === "pending" || data?.status === "declined"
                ? ""
                : "hidden"
            } w-full text-[16px] font-AeonikProMedium text-white p-[12px] rounded-lg bg-[#1BD22D]`}
          >
            Одобрить
          </button>
          {showSellers === "updated" ? (
            <button
              onClick={() => approveFunc()}
              className={`w-full text-[16px] font-AeonikProMedium text-white p-[12px] rounded-lg bg-[#1BD22D]`}
            >
              Одобрить
            </button>
          ) : null}
        </div>
      </div>

      <button
        id="upBtn"
        className="fixed bg-bgColor opacity-70 bottom-5 right-5 hidden items-center justify-center w-[48px] h-[48px] border border-[#c1c1c1] rounded-full shadow-[0_9px_25px_0_#8480b147] active:scale-90"
      >
        <div className="rotate-90">
          <BackIcon width={24} height={24} />
        </div>
      </button>

      <CancelModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        id={data?.id}
      />
      <ColorModal
        setColorModalOpen={setColorModalOpen}
        colorModalOpen={colorModalOpen}
        category={data?.category_id}
        data={data}
      />
    </div>
  );
};
