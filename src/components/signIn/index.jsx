import { useState } from "react";
import { CircleNextIcon, UserMailIcon } from "../../assets/icon";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const SignInComponent = () => {
  const [state, setState] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    eyesShowOld: true,
    eyesShowNew: true,
    eyesShowConfirm: true,
  });

  return (
    <div className="flex items-center justify-center h-[100vh] px-[35px]">
      <div className="w-full max-w-[460px]">
        <h1 className="text-center text-textBlackColor text-[20px] md:text-[30px] font-AeonikProMedium mb-[70px]">
          Вход для Администраторов
        </h1>

        <div className="border py-[25px] px-[15px] md:p-[30px] rounded-xl w-full">
          <label className="w-full h-fit mb-[20px] block">
            <div className=" flex items-center justify-between w-full">
              <div className="not-italic font-AeonikProRegular text-sm md:text-lg text-black  tracking-[0,16px] ">
                Электронная почта{" "}
              </div>
            </div>
            <div className="mt-[10px] px-[13px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="text-[13px] md:text-base outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
                type="email"
                placeholder="Emailingizni kiriting"
                required
              />
              <span>
                <UserMailIcon />
              </span>
            </div>
          </label>

          <div className="w-full  h-fit mb-[50px]">
            <span className="not-italic font-AeonikProRegular text-sm md:text-lg leading-4 text-black  tracking-[0,16px] ">
              Парол
            </span>
            <label className="mt-[6px]  overflow-hidden px-[13px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="text-[13px] md:text-base outline-none w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-leading-4 placeholder-text-black"
                type={state?.eyesShowOld ? "password" : "text"}
                placeholder="Parolingizni kiriting"
                required
              />
              <span className="cursor-pointer">
                {state?.eyesShowOld ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setState({ ...state, eyesShowOld: false })}
                    size={20}
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setState({ ...state, eyesShowOld: true })}
                    size={20}
                  />
                )}
              </span>
            </label>
          </div>

          <button className="w-full active:scale-95  active:opacity-70 h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor">
            <span className="text-center text-base md:text-lg text-white not-italic font-AeonikProMedium">
              Войти в систему
            </span>
            <span>
              <CircleNextIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
