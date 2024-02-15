import axios from "axios";
import { useContext } from "react";
import { ExitIcon, XIcon } from "../../../assets/icon";
import { useNavigate } from "react-router-dom";
import { SellersDataContext } from "../../../context/sellersDataContext";

export default function ExitModal({ setModalOpen, modalOpen }) {
  const url = "https://api.dressme.uz";

  const [, setData, , , setLoader] = useContext(SellersDataContext);

  const navigate = useNavigate();

  const logOut = () => {
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("password");
    axios
      .post(
        `${url}/api/admin/logout`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((d) => {
        if (d?.status === 200) {
          sessionStorage.clear();
          navigate("/signin");
          setData(null);
          setLoader(true);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div className={`w-full px-4 md:px-10 hidden md:block`}>
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
        <div className="text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center mb-24">
          Вы уверены?
        </div>

        <div className="flex gap-x-10 items-center">
          <button
            onClick={() => setModalOpen(false)}
            className="w-full active:scale-95  active:opacity-70 h-[20px] xs:h-11 rounded-lg flex items-center gap-x-[10px] justify-center text-weatherWinterColor border border-weatherWinterColor"
          >
            <span className="text-center text-base not-italic font-AeonikProMedium">
              Oтмена
            </span>
          </button>

          <button
            onClick={() => {
              logOut();
              navigate("/signin");
            }}
            className="w-full active:scale-95  active:opacity-70 h-[20px] xs:h-11 rounded-lg flex items-center gap-x-[10px] justify-center text-white bg-[#FF4343] border border-[#FF4343]"
          >
            <div>
              <ExitIcon />
            </div>
            <span className="text-base not-italic font-AeonikProMedium">
              Выйти
            </span>
          </button>
        </div>

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
