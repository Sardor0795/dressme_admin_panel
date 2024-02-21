import { useRef, useState } from "react";

import {
  CircleNextIcon,
  ClosedEyeIcon,
  MailIcon,
  OpendEyeIcon,
} from "../../assets/icon";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const url = "https://api.dressme.uz";

export const SignInComponent = () => {
  const [state, setState] = useState({
    eyeShow: true,
  });

  const [errorMsg, setErrorMsg] = useState({
    msg: "",
    visibility: false,
  });

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const signIn = async () => {
    const reqObj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      rememberToken: true,
    };
    try {
      const data = await axios.post(`${url}/api/admin/login`, reqObj);

      if (data.status === 200) {
        sessionStorage.setItem("reFreshToken", data?.data?.refresh_token);
        sessionStorage.setItem("token", data.data.access_token);
        sessionStorage.setItem("email", reqObj.email);
        sessionStorage.setItem("password", reqObj.password);
        navigate("/sellers");
        location.reload();
      }
    } catch (error) {
      setErrorMsg({ visibility: true, msg: error?.response?.data?.message });
      setTimeout(() => {
        setErrorMsg({ ...errorMsg, visibility: false });
      }, 5000);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] px-[35px]">
      <div className="w-full max-w-[460px]">
        <h1 className="text-center text-textBlackColor text-[20px] md:text-[30px] font-AeonikProMedium mb-[70px]">
          Вход для Администраторов
        </h1>

        <form className="border py-[25px] px-[15px] md:p-[30px] rounded-xl w-full">
          <label className="w-full h-fit mb-[20px] block">
            <div className=" flex items-center justify-between w-full">
              <div className="not-italic font-AeonikProRegular text-[13px] md:text-lg text-black  tracking-[0,16px] ">
                Электронная почта
              </div>
            </div>
            <div className="mt-[10px] px-[13px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="text-[13px] md:text-base outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
                type="email"
                placeholder="Emailingizni kiriting"
                required
                name="email"
                inputMode="email"
                autoComplete="username"
                ref={emailRef}
              />
              <span>
                <MailIcon />
              </span>
            </div>
          </label>

          <div className="w-full  h-fit mb-[50px]">
            <span className="not-italic font-AeonikProRegular text-[13px] md:text-lg leading-4 text-black  tracking-[0,16px] ">
              Парол
            </span>
            <label className="mt-[6px]  overflow-hidden px-[13px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="text-[13px] md:text-base outline-none w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-leading-4 placeholder-text-black"
                type={state?.eyeShow ? "password" : "text"}
                placeholder="Parolingizni kiriting"
                required
                name="password"
                value={'secret00'}
                autoComplete="current-password"
                ref={passwordRef}
              />
              <span
                className="cursor-pointer"
                onClick={() => setState({ ...state, eyeShow: !state.eyeShow })}
              >
                {state?.eyeShow ? <OpendEyeIcon /> : <ClosedEyeIcon />}
              </span>
            </label>
          </div>

          {errorMsg.visibility ? (
            <div className="text-center mb-[20px] mt-[-15px] text-red-600 font-AeonikProMedium text-[18px]">
              {errorMsg.msg}
            </div>
          ) : null}

          <div
            onClick={signIn}
            className="w-full active:scale-95 cursor-pointer select-none active:opacity-70 h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor"
          >
            <span className="text-center text-base md:text-lg text-white not-italic font-AeonikProMedium">
              Войти в систему
            </span>
            <span>
              <CircleNextIcon />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
