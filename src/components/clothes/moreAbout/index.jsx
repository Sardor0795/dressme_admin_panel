import { useEffect, useState } from "react";
import { BackIcon, StarIcon } from "../../../assets/icon";
import CancelModal from "./modalCancel";
import ColorModal from "./modalColor";
import Carousel from "./carousel";
import ModalAllPhotos from "./modalAllPhotos";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const ClothMoreAbout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [allPhotosModalOpen, setAllPhotosModalOpen] = useState(false);

  const url = "https://api.dressme.uz";
  const [data, setData] = useState([]);

  const seasons = data?.seasons;
  const colors = data?.colors;
  const sections = data?.sections ? data?.sections : [];
  const subSections = data?.sub_sections ? data?.sub_sections : [];

  const params = useParams();
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios(`${url}/api/admin/products/${params?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.product);
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="md:border-b py-[18px] flex items-center mb-[6px]">
        <Link
          to="/clothes"
          className="rounded-md border border-[#D5D5D5] mr-auto"
        >
          <BackIcon />
        </Link>
      </div>

      <div className="flex items-center md:hidden">
        <div className="mr-[10px] tex-[30px] text-[#B5B5B5] font-AeonikProRegular">
          01
        </div>
        <div className="border-b border-[#D5D5D5] w-full"></div>
      </div>

      <div className="w-full flex items-center justify-between my-[12px] md:my-9">
        <div className="bg-[#E5F2FA] py-[5px] px-[10px] rounded-[4px] font-AeonikProMedium text-[13px] md:text-[18px]">
          <span className="text-[#007DCA]">Обновлено: </span>
          Фото/цвет, Информация
        </div>

        <div className="hidden md:flex items-center ml-auto">
          <button
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
      </div>

      <div className="flex flex-wrap md:flex-nowrap w-full md:gap-[30px]">
        <div className="w-full md:w-[25%] md:max-w-[350px] md:h-[400px]">
          <div className="flex items-center mb-[5px]">
            <div className="font-AeonikProRegular text-[16px] mr-[5px] ml-[10px]">
              Фото
            </div>
            <StarIcon />
          </div>
          <Carousel height={"h-[377px]"} />
          <div className="mt-[10px] flex justify-end">
            <button
              onClick={() => setAllPhotosModalOpen(true)}
              className="text-[#007DCA] font-AeonikProRegular text-[16px] border-b border-[#007DCA]"
            >
              Все фото
            </button>
          </div>
        </div>

        <div className="md:pr-[30px] pt-[20px] md:pt-0 md:border-r border-[#E5E5E5] flex flex-wrap md:flex-nowrap gap-[30px] w-full md:w-[50%]">
          {/* 1 */}
          <div className="font-AeonikProRegular text-[16px] w-full md:w-[50%]">
            <div className="flex gap-[11px] md:gap-[0]">
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Раздел одежды</span> <StarIcon />
                </div>
                <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  {sections?.length > 1
                    ? sections?.map((item) => {
                        return item?.name_ru + ", ";
                      })
                    : sections[0]?.name_ru}
                </div>
              </div>
              <div className="w-full md:hidden">
                <div className="md:hidden flex items-center mb-[5px]">
                  <span
                    className={`${
                      subSections?.length ? "" : "text-[#b5b5b5]"
                    } mr-[5px]`}
                  >
                    Подраздел одежды
                  </span>

                  <StarIcon />
                </div>
                <div
                  className={`${
                    subSections?.length ? "" : "bg-[#EAEAEA] text-[#b5b5b5]"
                  } md:hidden block border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]`}
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
                <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
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
                <div className="p-[8px] w-fit h-[42px] flex items-center justify-center border border-[#E5E5E5] rounded-[8px] mb-[25px]">
                  {colors?.length ? (
                    <div className="flex items-center">
                      <div
                        style={{ backgroundColor: colors[0]?.hex }}
                        className={`last:mr-0 w-[22px] h-[22px] rounded-[50%]`}
                      ></div>
                      <div className={colors.length > 1 ? "ml-[10px]" : null}>
                        {colors.length > 1 ? colors.length - 1 + "+" : null}
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>

            <div className="flex mb-[25px] gap-[11px] md:gap-[0]">
              <div className="w-full md:w-fit md:mr-[15px]">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Пол</span> <StarIcon />
                </div>
                <div className="border border-[#E5E5E5] rounded-[8px] p-3">
                  {data?.gender?.name_ru}
                </div>
              </div>
              <div className="w-full md:w-fit">
                <div className="mr-[5px] mb-[5px]">Возрастная категория</div>
                <div className="flex items-center">
                  <div className="border border-[#E5E5E5] rounded-[8px] py-3 px-5">
                    {data?.min_age_category}
                  </div>
                  <span className="border-t border-[#E5E5E5] w-[15px] mx-[5px]"></span>
                  <div className="border border-[#E5E5E5] rounded-[8px] py-3 px-5">
                    {data?.max_age_category}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Категория одежды</span> <StarIcon />
            </div>
            <div className="flex w-full mb:block gap-[11px] md:gap-[0]">
              <div className="flex w-full md:flex-wrap xxxl:flex-nowrap justify-between mb-[25px] gap-[10px]">
                <button className="whitespace-nowrap font-AeonikProMedium text-[16px] w-full xxxl:max-w-[160px] rounded-lg bg-[#007DCA] py-[12px] px-[15px] text-white">
                  Верхняя одежда
                </button>
                <button
                  onClick={() => setColorModalOpen(true)}
                  className="whitespace-nowrap font-AeonikProMedium text-[16px] w-full xxxl:max-w-[160px] border-[1.5px] border-[#007DCA] rounded-lg text-[#007DCA] py-[12px] px-[15px] bg-white"
                >
                  Все размеры
                </button>
              </div>
            </div>

            <div className="flex items-center md:hidden mb-[12px]">
              <div className="mr-[10px] tex-[30px] text-[#B5B5B5] font-AeonikProRegular">
                02
              </div>
              <div className="border-b border-[#D5D5D5] w-full"></div>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Качество на русском</span> <StarIcon />
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.quality_ru}
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Состав на русском</span>
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.composition_ru ? (
                <span className="font-AeonikProRegular text-[14px]">
                  {data?.composition_ru}
                </span>
              ) : (
                "-"
              )}
            </div>
          </div>

          {/* 2 */}
          <div className="w-full md:w-[50%]">
            <div className="hidden md:flex items-center mb-[5px]">
              <span
                className={`${
                  subSections?.length ? "" : "text-[#b5b5b5]"
                } mr-[5px]`}
              >
                Подраздел одежды
              </span>{" "}
              <StarIcon />
            </div>
            <div
              className={`${
                subSections?.length ? "" : "bg-[#EAEAEA] text-[#b5b5b5]"
              } hidden md:block border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]`}
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
            <div className="w-fit h-[42px] px-[10px] hidden md:flex items-center justify-center border border-[#E5E5E5] rounded-[8px] mb-[25px]">
              {colors?.length
                ? colors?.map((item) => {
                    return (
                      <div
                        key={item?.id}
                        style={{ backgroundColor: item?.hex }}
                        className={`mr-[8px] last:mr-0 w-[22px] h-[22px] rounded-[50%]`}
                      ></div>
                    );
                  })
                : "-"}
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Артикул</span>
            </div>
            <div className="block border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.sku}
            </div>
            <div className="flex justify-between gap-[10px]">
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Тип</span>
                  <StarIcon />
                </div>
                <div className="w-full max-w-[160px] border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  {data?.type?.name_ru}
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px] whitespace-nowrap">
                    Страна размера
                  </span>
                  <StarIcon />
                </div>
                <div className="w-full max-w-[160px] border border-[#E5E5E5] text-[#A1A1A1] rounded-[8px] p-3 mb-[25px]">
                  {data?.producer?.name_ru}
                </div>
              </div>
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Качество на узбекском</span>{" "}
              <StarIcon />
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.quality_uz}
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Состав на узбекском</span>
            </div>
            <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.composition_uz ? (
                <span className="font-AeonikProRegular text-[14px]">
                  {data?.composition_uz}
                </span>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[25%]">
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Название на русском</span> <StarIcon />
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
            {data?.name_ru}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Название на узбекском</span> <StarIcon />
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
            {data?.name_uz}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Описание на русском</span> <StarIcon />
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] text-[14px] text-[#666] p-3 mb-[25px]">
            {data?.description_ru}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Описание на узбекском</span> <StarIcon />
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] text-[14px] text-[#666] p-3 mb-[25px]">
            {data?.description_uz}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Бренд</span>
          </div>
          <div className="border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
            {data?.brand?.name ? data?.brand?.name : "-"}
          </div>
        </div>

        <div className="flex md:hidden w-full gap-[12px] mb-[20px]">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full text-[16px] font-AeonikProMedium text-white p-[12px] rounded-lg bg-[#E85151]"
          >
            Отказать
          </button>
          <button className="w-full text-[16px] font-AeonikProMedium text-white p-[12px] rounded-lg bg-[#1BD22D]">
            Одобрить
          </button>
        </div>
      </div>

      <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <ColorModal
        setColorModalOpen={setColorModalOpen}
        colorModalOpen={colorModalOpen}
      />
      <ModalAllPhotos
        setAllPhotosModalOpen={setAllPhotosModalOpen}
        allPhotosModalOpen={allPhotosModalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};
