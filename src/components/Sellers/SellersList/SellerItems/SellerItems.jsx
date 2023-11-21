import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "../../../../assets/icon";
import axios from "axios";
import { IdsContext } from "../../../../context/idContext";
import { SellersDataContext } from "../../../../context/sellersDataContext";
import { Checkbox, List } from "antd";
import { SellersContext } from "../../../../context/sellersContext";

function SellerItems({
  data,
  click,
  setModalOpen,
  index,
  toast,
  handleGetCheckList,
}) {
  const [, , reFetch] = useContext(SellersDataContext);

  console.log(data);

  const url = "https://api.dressme.uz";
  let token = localStorage.getItem("token");

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-seller-status/${data?.id}`,
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

  const [, setId] = useContext(IdsContext);
  const [checked, setChecked] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (data?.length) {
      setIndeterminate(checked.length && checked.length !== data?.length);
      setCheckAll(checked.length === data?.length);
      handleGetCheckList(checked);
    }
  }, [checked]);
  // handleGetCheckAll
  const onCheckAllChange = (e) => {
    setChecked(e.target.checked ? data?.map((item) => item.id) : []);
    setCheckAll(e.target.checked);
  };

  // seller context---
  const [showSellers, setShowSellers] = useContext(SellersContext);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <div className="md:mb-[10px] w-full gap-2 flex items-center text-tableTextTitle">
          <Checkbox
            defaultChecked={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
            style={{ width: "26px", height: "26px" }}
            className={`idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center !min-w-[24px] !min-h-[24px] `}
          ></Checkbox>
          <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
            <div className="w-[3%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
              No:
            </div>
            <div className="w-[10%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
              Имя
            </div>
            <div className="w-[15%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
              Номер
            </div>
            <div className="w-[15%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
              Тип
            </div>
            <div className="w-[11%] px-2  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
              Дата
            </div>
            <div className="w-[20%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
              Регион
            </div>
            <div className="w-[18%] px-2 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
              Действие
            </div>
          </div>
        </div>
      </div>
      <Checkbox.Group
        style={{ width: "100%" }}
        value={checked}
        onChange={(checkedValues) => {
          setChecked(checkedValues);
        }}
      >
        <List itemLayout="horizontal" dataSource={data} className="w-full">
          {/* Status NotAllowed */}
          {showSellers === "declined"
            ? data.map((data, i) => {
                if (data?.status === "declined") {
                  return (
                    <List.Item className="w-full ">
                      <div className="w-full flex gap-2">
                        <Checkbox value={data?.id} />
                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-white px-5 h-[58px] md:flex items-center w-full">
                          <div className="w-[3%]   text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {i + 1}
                          </div>
                          <div className="w-[10%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.name}
                          </div>
                          <div className="w-[15%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.phone}
                          </div>
                          <div className="w-[15%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.seller_type?.type_ru}
                          </div>
                          <div className="w-[11%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.created_at}
                          </div>
                          <div className="w-[20%] px-2 pr-3 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.region?.name_ru}, {data?.sub_region?.name_ru}
                          </div>
                          <div className="w-[18%] px-2 flex items-center gap-x-2 text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            <button
                              onClick={() => {
                                approveFunc();
                              }}
                              className={`${
                                showSellers === "pending" ||
                                showSellers === "declined"
                                  ? ""
                                  : "hidden"
                              } w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
                            >
                              Одобрить
                            </button>
                            <button
                              onClick={() => {
                                setModalOpen(true);
                                setId(data?.id);
                              }}
                              className={`${
                                showSellers === "pending" ||
                                showSellers === "approved"
                                  ? ""
                                  : "hidden"
                              } w-fit px-2 py-1 rounded-[20px] border border-[#E85353] text-[#E85353]`}
                            >
                              Отказать
                            </button>
                          </div>
                          <div className="w-[8%]">
                            <Link
                              to={`seller/${data?.id}`}
                              className="cursor-pointer flex items-center justify-center text-center hover:underline text-weatherWinterColor text-[16px] not-italic font-AeonikProMedium"
                            >
                              Подробнее
                            </Link>
                          </div>
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
                              to={`seller/${data?.id}`}
                              className="text-[#007DCA] text-[12px] font-AeonikProMedium cursor-pointer"
                            >
                              Подробнее
                            </Link>
                          </div>

                          <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[25%]">
                              Имя
                            </div>
                            <div className="text-[#3F6175] text-[12px] px-3 font-AeonikProMedium w-[40%]">
                              Номер
                            </div>
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[35%]">
                              Тип
                            </div>
                          </div>

                          <div className="py-[5px] px-[15px] flex mb-[10px]">
                            <div className="w-[25%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.name}
                            </div>
                            <div className="w-[40%] px-3 text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.phone}
                            </div>
                            <div className="w-[35%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.seller_type?.type_ru}
                            </div>
                          </div>

                          <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[25%]">
                              Дата
                            </div>
                            <div className="text-[#3F6175] px-3 text-[12px] font-AeonikProMedium w-[40%]">
                              Регион
                            </div>
                          </div>

                          <div className="py-[5px] px-[15px] flex mb-[24px]">
                            <div className="w-[25%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.created_at}
                            </div>
                            <div className="w-[40%] px-3 text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.region?.name_ru},{" "}
                              {data?.sub_region?.name_ru}
                            </div>
                          </div>

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
                        </div>
                      </div>
                    </List.Item>
                  );
                }
              })
            : null}
          {/* Status Allowed */}
          {showSellers === "approved"
            ? data.map((data, i) => {
                if (data?.status === "approved") {
                  return (
                    <List.Item className="w-full ">
                      <div className="w-full flex gap-2">
                        <Checkbox value={data?.id} />
                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-white px-5 h-[58px] md:flex items-center w-full">
                          <div className="w-[3%]   text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {i + 1}
                          </div>
                          <div className="w-[10%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.name}
                          </div>
                          <div className="w-[15%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.phone}
                          </div>
                          <div className="w-[15%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.seller_type?.type_ru}
                          </div>
                          <div className="w-[11%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.created_at}
                          </div>
                          <div className="w-[20%] px-2 pr-3 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.region?.name_ru}, {data?.sub_region?.name_ru}
                          </div>
                          <div className="w-[18%] px-2 flex items-center gap-x-2 text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            <button
                              onClick={() => {
                                approveFunc();
                              }}
                              className={`${
                                showSellers === "pending" ||
                                showSellers === "declined"
                                  ? ""
                                  : "hidden"
                              } w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
                            >
                              Одобрить
                            </button>
                            <button
                              onClick={() => {
                                setModalOpen(true);
                                setId(data?.id);
                              }}
                              className={`${
                                showSellers === "pending" ||
                                showSellers === "approved"
                                  ? ""
                                  : "hidden"
                              } w-fit px-2 py-1 rounded-[20px] border border-[#E85353] text-[#E85353]`}
                            >
                              Отказать
                            </button>
                          </div>
                          <div className="w-[8%]">
                            <Link
                              to={`seller/${data?.id}`}
                              className="cursor-pointer flex items-center justify-center text-center hover:underline text-weatherWinterColor text-[16px] not-italic font-AeonikProMedium"
                            >
                              Подробнее
                            </Link>
                          </div>
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
                              to={`seller/${data?.id}`}
                              className="text-[#007DCA] text-[12px] font-AeonikProMedium cursor-pointer"
                            >
                              Подробнее
                            </Link>
                          </div>

                          <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[25%]">
                              Имя
                            </div>
                            <div className="text-[#3F6175] text-[12px] px-3 font-AeonikProMedium w-[40%]">
                              Номер
                            </div>
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[35%]">
                              Тип
                            </div>
                          </div>

                          <div className="py-[5px] px-[15px] flex mb-[10px]">
                            <div className="w-[25%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.name}
                            </div>
                            <div className="w-[40%] px-3 text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.phone}
                            </div>
                            <div className="w-[35%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.seller_type?.type_ru}
                            </div>
                          </div>

                          <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[25%]">
                              Дата
                            </div>
                            <div className="text-[#3F6175] px-3 text-[12px] font-AeonikProMedium w-[40%]">
                              Регион
                            </div>
                          </div>

                          <div className="py-[5px] px-[15px] flex mb-[24px]">
                            <div className="w-[25%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.created_at}
                            </div>
                            <div className="w-[40%] px-3 text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.region?.name_ru},{" "}
                              {data?.sub_region?.name_ru}
                            </div>
                          </div>

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
                        </div>
                      </div>
                    </List.Item>
                  );
                }
              })
            : null}
          {/* Status NotAllowed */}
          {showSellers === "pending"
            ? data.map((data, i) => {
                if (data?.status === "pending") {
                  return (
                    <List.Item className="w-full ">
                      <div className="w-full flex gap-2">
                        <Checkbox value={data?.id} />
                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-white px-5 h-[58px] md:flex items-center w-full">
                          <div className="w-[3%]   text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {i + 1}
                          </div>
                          <div className="w-[10%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.name}
                          </div>
                          <div className="w-[15%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.phone}
                          </div>
                          <div className="w-[15%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.seller_type?.type_ru}
                          </div>
                          <div className="w-[11%] px-2 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.created_at}
                          </div>
                          <div className="w-[20%] px-2 pr-3 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {data?.region?.name_ru}, {data?.sub_region?.name_ru}
                          </div>
                          <div className="w-[18%] px-2 flex items-center gap-x-2 text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            <button
                              onClick={() => {
                                approveFunc();
                              }}
                              className={`${
                                showSellers === "pending" ||
                                showSellers === "declined"
                                  ? ""
                                  : "hidden"
                              } w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
                            >
                              Одобрить
                            </button>
                            <button
                              onClick={() => {
                                setModalOpen(true);
                                setId(data?.id);
                              }}
                              className={`${
                                showSellers === "pending" ||
                                showSellers === "approved"
                                  ? ""
                                  : "hidden"
                              } w-fit px-2 py-1 rounded-[20px] border border-[#E85353] text-[#E85353]`}
                            >
                              Отказать
                            </button>
                          </div>
                          <div className="w-[8%]">
                            <Link
                              to={`seller/${data?.id}`}
                              className="cursor-pointer flex items-center justify-center text-center hover:underline text-weatherWinterColor text-[16px] not-italic font-AeonikProMedium"
                            >
                              Подробнее
                            </Link>
                          </div>
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
                              to={`seller/${data?.id}`}
                              className="text-[#007DCA] text-[12px] font-AeonikProMedium cursor-pointer"
                            >
                              Подробнее
                            </Link>
                          </div>

                          <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[25%]">
                              Имя
                            </div>
                            <div className="text-[#3F6175] text-[12px] px-3 font-AeonikProMedium w-[40%]">
                              Номер
                            </div>
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[35%]">
                              Тип
                            </div>
                          </div>

                          <div className="py-[5px] px-[15px] flex mb-[10px]">
                            <div className="w-[25%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.name}
                            </div>
                            <div className="w-[40%] px-3 text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.phone}
                            </div>
                            <div className="w-[35%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.seller_type?.type_ru}
                            </div>
                          </div>

                          <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
                            <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[25%]">
                              Дата
                            </div>
                            <div className="text-[#3F6175] px-3 text-[12px] font-AeonikProMedium w-[40%]">
                              Регион
                            </div>
                          </div>

                          <div className="py-[5px] px-[15px] flex mb-[24px]">
                            <div className="w-[25%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.created_at}
                            </div>
                            <div className="w-[40%] px-3 text-[11px] font-AeonikProMedium text-[#2C2C2C]">
                              {data?.region?.name_ru},{" "}
                              {data?.sub_region?.name_ru}
                            </div>
                          </div>

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
                        </div>
                      </div>
                    </List.Item>
                  );
                }
              })
            : null}
        </List>
      </Checkbox.Group>
    </div>
  );
}
export default React.memo(SellerItems);
