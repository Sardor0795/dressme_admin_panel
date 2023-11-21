import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckIcon, NoImgIcon } from "../../../../assets/icon";
import SoonImg from "../../../../assets/img/coming_soon.jpg";
import axios from "axios";
import { IdsContext } from "../../../../context/idContext";
import { ClothesDataContext } from "../../../../context/clothesDataContext";
import { Checkbox, List } from "antd";

 function ClothesItem({
  data,
  click,
  setModalOpen,
  onHandleGetCheckList,
  toast,
  showProducts,
}) {
  const url = "https://api.dressme.uz";
  let token = localStorage.getItem("token");

  const [, , reFetch] = useContext(ClothesDataContext);

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-product-status/${data?.id}`,
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
          toast.success(d?.data?.message);
          reFetch();
        }
      })
      .catch((v) => {
        console.log(v);
      });
  };
  const [shopId, setShopId] = useState();
  const [checked, setChecked] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (data?.products?.length) {
      setIndeterminate(
        checked.length && checked.length !== data?.products?.length
      );
      setCheckAll(checked.length === data?.products?.length);
      onHandleGetCheckList(checked);
    }
  }, [checked]);

  const onCheckAllChange = (e) => {
    setChecked(e.target.checked ? data?.products?.map((item) => item.id) : []);
    setCheckAll(e.target.checked);
  };
  // console.log(checked, "checked");

  const [, setId] = useContext(IdsContext);
  console.log(checked, "checked");
  const index = 1;
  return (
    <div className="flex flex-col items-center w-full my-5">
      <div className="w-full border border-red-500">
        <div className="w-full flex items-center gap-x-3">
          {" "}
          <Checkbox
            defaultChecked={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
            style={{ width: "26px", height: "26px" }}
            onClick={() => setShopId(data?.id)}
            className={`idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center !min-w-[24px] !min-h-[24px] `}
          ></Checkbox>
          <div>{data?.name}</div>
        </div>
        <div className="w-full hidden md:flex flex-col">
          <div className="w-full  my-3 hidden md:flex flex-col items-center text-tableTextTitle">
            <div className="w-full  h-[70px] flex items-center">
              <div className="min-w-[24px] min-h-[24px] bg-white mr-[8px]"></div>
              <tr className="w-full h-full flex items-center justify-between border rounded-[8px]  border-lightBorderColor">
                <th className="w-[5%] h-full flex items-center justify-center">
                  No:
                </th>
                <th className="w-[14%] h-full flex items-center justify-center">
                  Фото
                </th>
                <th className="w-[15%] h-full flex items-center justify-center">
                  Наименование товара
                </th>
                <th className="w-[15%] h-full flex items-center justify-center">
                  Артикул
                </th>
                <th className="w-[8%] h-full flex items-center justify-center">
                  Тип
                </th>
                <th className="w-[8%] h-full flex items-center justify-center">
                  Дата
                </th>
                <th className="w-[10%] h-full flex items-center justify-center">
                  Статус
                </th>
                <th className="w-[10%] h-full flex items-center justify-center">
                  Цена товара
                </th>
                <th className="w-[10%] h-full flex items-center justify-center"></th>
                <th className="w-[9%] h-full flex items-center justify-center">
                  Добавить
                </th>
                <th className="w-[9%] h-full flex items-center justify-center">
                  Удалить
                </th>
              </tr>
            </div>
          </div>
        </div>

        <div className="w-full ">
          {data?.products?.length !== 0 ? (
            <Checkbox.Group
              style={{ width: "100%" }}
              value={checked}
              onChange={(checkedValues) => {
                setChecked(checkedValues);
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={data?.products}
                className="w-full"
              >
                {data?.products?.map((data) => {
                  return (
                    <List.Item className="w-full ">
                      <div className="w-full flex items-center border border-black mt-5">
                        <div className="w-fit">
                          {" "}
                          <Checkbox value={data?.id} />
                        </div>
                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-white px-5 py-[10px] md:flex items-center w-full">
                          <div className="w-[4%] text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.id}
                          </div>
                          <div className="w-[8%]">
                            <div className="bg-[#FCFCFC] border border-[#F2F2F2] w-[60px] h-[60px] flex items-center justify-center rounded-[12px]">
                              <NoImgIcon />
                            </div>
                          </div>
                          <div className="w-[16%] px-4 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.name_ru}
                          </div>
                          <div className="w-[12%] px-4 break-all flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.sku}
                          </div>
                          <div className="w-[10%] px-4 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.type?.name_ru}
                          </div>
                          <div className="w-[11%] px-4 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.created_at}
                          </div>
                          <div className="w-[11%] px-4 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.cost?.price
                              ? data?.cost?.price + " сум"
                              : "-"}
                          </div>
                          <div className="w-[20%] px-4  text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {showProducts !== "status_update" ? (
                              <div className="flex items-center gap-x-2">
                                {" "}
                                <button
                                  onClick={() => approveFunc()}
                                  className={`${
                                    data?.status === "pending" ||
                                    data?.status === "declined"
                                      ? ""
                                      : "hidden"
                                  } w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
                                >
                                  Одобрить
                                </button>
                                <button
                                  onClick={() => {
                                    setId(data?.id);
                                    setModalOpen(true);
                                  }}
                                  className={`${
                                    data?.status === "pending" ||
                                    data?.status === "approved"
                                      ? ""
                                      : "hidden"
                                  } w-fit px-2 py-1 rounded-[20px] border border-[#E85353] text-[#E85353]`}
                                >
                                  Отказать
                                </button>
                              </div>
                            ) : null}

                            {showProducts === "status_update" ? (
                              <button
                                onClick={() => approveFunc()}
                                className={` w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
                              >
                                Одобрить
                              </button>
                            ) : null}
                          </div>
                          <Link
                            to={`cloth/${data?.id}`}
                            className="w-[8%] cursor-pointer flex items-center justify-center text-center hover:underline text-weatherWinterColor text-[16px] not-italic font-AeonikProMedium"
                          >
                            Подробнее
                          </Link>
                        </div>

                        {/* Mobile */}

                        <div className="block md:hidden border rounded-[8px] border-[#F2F2F2] p-[10px] w-full mb-[12px] last:mb-[0]">
                          <div className="flex items-center w-full justify-between mb-[8px]">
                            <div
                              onClick={() => {
                                click(data?.id);
                              }}
                              className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
                                data?.isCheck
                                  ? "bg-[#007DCA] border-[#007DCA]"
                                  : "bg-white border-checkboxBorder"
                              } md:hidden flex items-center justify-center rounded mr-[8px]`}
                            >
                              <span
                                className={`${
                                  data?.isCheck
                                    ? "flex items-center justify-center"
                                    : "hidden"
                                }`}
                              >
                                <CheckIcon size={"small"} />
                              </span>
                            </div>

                            <div className="flex items-center">
                              <div className="border-b min-w-[10px]"></div>
                              <div className="mx-[5px] text-[16px] font-AeonikProRegular text-[#D2D2D2]">
                                {index < 10 ? "0" : ""}
                                {index}
                              </div>
                              <div className="border-b min-w-[10px]"></div>
                            </div>

                            <Link
                              to={`cloth/${data?.id}`}
                              className="text-[#007DCA] text-[12px] font-AeonikProMedium cursor-pointer"
                            >
                              Подробнее
                            </Link>
                          </div>
                          <div className="h-[148px] w-full rounded-lg overflow-hidden mb-[12px]">
                            <img
                              src={SoonImg}
                              alt="img"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[45%]">
                              Название
                            </div>
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
                              Артикул
                            </div>
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[15%]">
                              Тип
                            </div>
                          </div>
                          <div className="py-[5px] px-[15px] flex mb-[10px]">
                            <div className="w-[45%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.name_ru}
                            </div>
                            <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.sku}
                            </div>
                            <div className="w-[15%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.type?.name_ru}
                            </div>
                          </div>
                          <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[45%]">
                              Дата
                            </div>
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
                              Цена
                            </div>
                          </div>
                          <div className="py-[5px] px-[15px] flex mb-[24px]">
                            <div className="w-[45%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.created_at}
                            </div>
                            <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.cost?.price
                                ? data?.cost?.price + " сум"
                                : "-"}
                            </div>
                          </div>

                          {showProducts !== "status_update" ? (
                            <div className="w-full flex gap-[30px]">
                              <button
                                onClick={() => {
                                  setId(data?.id);
                                  setModalOpen(true);
                                }}
                                className={`${
                                  data?.status === "pending" ||
                                  data?.status === "approved"
                                    ? ""
                                    : "hidden"
                                } rounded-[8px] py-[8px] w-full bg-[#FFE1E1] text-[12px] font-AeonikProMedium text-[#E51515]`}
                              >
                                Отказать
                              </button>
                              <button
                                onClick={() => approveFunc()}
                                className={`${
                                  data?.status === "pending" ||
                                  data?.status === "declined"
                                    ? ""
                                    : "hidden"
                                } rounded-[8px] py-[8px] w-full bg-[#DEFCE1] text-[12px] font-AeonikProMedium text-[#12C724]`}
                              >
                                Одобрить
                              </button>
                            </div>
                          ) : null}
                          {showProducts === "status_update" ? (
                            <div className="w-full flex gap-[30px]">
                              <button
                                onClick={() => approveFunc()}
                                className={` rounded-[8px] py-[8px] w-full bg-[#DEFCE1] text-[12px] font-AeonikProMedium text-[#12C724]`}
                              >
                                Одобрить
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </List.Item>
                  );
                })}
              </List>
            </Checkbox.Group>
          ) : (
            <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-5">
              <span className="text-[#D2D2D2] font-AeonikProRegular text-xl">
                Tовара нет
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default React.memo(ClothesItem)