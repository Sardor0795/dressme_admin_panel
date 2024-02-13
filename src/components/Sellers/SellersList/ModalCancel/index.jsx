/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { XIcon } from "../../../../assets/icon";
import { IdsContext } from "../../../../context/idContext";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SellersDataContext } from "../../../../context/sellersDataContext";
import { ShopsDataContext } from "../../../../context/shopsDataContext";
import { LocationsDataContext } from "../../../../context/locationsDataContext";
import { ClothesDataContext } from "../../../../context/clothesDataContext";
import { ReFreshTokenContext } from "../../../../context/reFreshToken";

export default function CancelModal({ setModalOpen, modalOpen }) {
  const url = "https://api.dressme.uz";

  const [id] = useContext(IdsContext);

  const [reasonText, setReasonText] = useState("");

  const [, , reFetch] = useContext(SellersDataContext);
  const [, , shopsReFetch] = useContext(ShopsDataContext);
  const [, , locationsReFetch] = useContext(LocationsDataContext);
  const [, , clothesReFetch] = useContext(ClothesDataContext);

  const [reFreshTokenFunc] = useContext(ReFreshTokenContext);

  const declineFunc = () => {
    axios
      .post(
        `${url}/api/admin/decline-seller/${id?.id}`,
        {
          status: "declined",
          status_reason: reasonText,
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
          shopsReFetch();
          locationsReFetch();
          clothesReFetch();
          setReasonText("");
        }
      })
      .catch((v) => {
        if (v?.response?.status === 401) {
          reFreshTokenFunc();
          declineFunc();
        }
      });
  };

  const massiveDeclineFunc = () => {
    let formData = new FormData();
    formData.append("status", "declined");
    formData.append("status_reason", reasonText);
    if (id?.id?.length) {
      id?.id?.forEach((id) => {
        formData.append("ids[]", id);
      });
    }

    axios
      .post(`${url}/api/admin/massive-decline-sellers`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((d) => {
        if (d.status === 200) {
          toast.success(d?.data?.message);
          reFetch();
          shopsReFetch();
          locationsReFetch();
          clothesReFetch();
          setReasonText("");
        }
      })
      .catch((v) => {
        if (v?.response?.status === 401) {
          reFreshTokenFunc();
          declineFunc();
        }
      });
  };

  // DISABLE BACKGROUND SCROLL WHEN MODAL IS OPENED
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  return (
    <div className={`w-full px-4 md:px-10`}>
      <div
        className={`fixed cursor-pointer z-[200] inset-0 w-full h-full bg-black opacity-40 ${
          modalOpen ? "" : "hidden"
        }`}
        onClick={() => setModalOpen(false)}
      ></div>
      <section
        className={`max-w-[90%] md:max-w-[550px] z-[201] mx-auto w-full flex-col h-fit bg-white fixed py-[30px] md:py-[35px] px-[20px] md:px-[50px] rounded-t-lg rounded-b-lg md:top-[50%] duration-300 overflow-hidden left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] ${
          modalOpen ? "bottom-0 flex" : "hidden z-[-10]"
        }`}
      >
        <div className="w-full h-fit flex items-center justify-center mb-6">
          <p className="text-tableTextTitle2 text-lg md:text-2xl not-italic font-AeonikProRegular">
            Причина отказа
          </p>
        </div>
        <textarea
          value={reasonText}
          onInput={(e) => {
            setReasonText(e.target.value);
          }}
          className="border text-sm md:text-base p-3 h-32 mb-10 outline-none font-AeonikProRegular resize-none border-borderColor2 rounded-[6px]"
          placeholder="Опишите проблему"
        ></textarea>
        <button
          onClick={() => {
            if (reasonText.length > 1) {
              if (id?.type === "massive") {
                massiveDeclineFunc();
                setModalOpen(false);
              } else {
                declineFunc();
                setModalOpen(false);
              }
            }
          }}
          className={`${
            reasonText.length < 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer active:scale-95  active:opacity-70"
          } w-full  h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor`}
        >
          <span className="text-center text-sm md:text-lg text-white not-italic font-AeonikProMedium">
            Отправить
          </span>
        </button>

        {/* X button */}

        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-4 right-4 ls:top-5 ls:right-5 p-[5px] border border-[F2F2F2] rounded-lg"
        >
          <XIcon />
        </button>
      </section>
    </div>
  );
}
