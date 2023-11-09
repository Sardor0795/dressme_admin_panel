import { Link, NavLink, Outlet } from "react-router-dom";
import { ExitIcon, UserIcon } from "../../assets/icon";
import { sidebarData } from "../../utils/sidebarData";
import { useState } from "react";
import ExitModal from "./exitModal";

export const Sidebar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-[100vh]">
      <div className="fixed z-30 h-[100vh] hidden md:flex flex-col w-full min-w-[253px] max-w-[253px] border-r bg-[#FCFCFC] px-2 py-5">
        <div className="ml-3 mb-8 flex items-center w-fit font-AeonikProRegular text-xl">
          <span className="w-[56px] h-[56px] mr-4 bg-white border rounded-full flex items-center justify-center">
            <UserIcon />
          </span>
          Самандар
        </div>

        {sidebarData.map((item) => {
          return (
            <NavLink
              className="flex px-6 py-4 hover:bg-[#F2F2F2] rounded-md text-lg font-AeonikProMedium"
              key={item?.id}
              to={item.path}
              style={({ isActive }) => ({
                color: isActive ? "#007DCA" : "#2C2C2C",
              })}
            >
              <span className="mr-4 flex w-[24px]">{item.icon}</span>
              {item.title}
            </NavLink>
          );
        })}

        <button
          onClick={() => setModalOpen(true)}
          className="mt-auto w-full text-[#ff2d55] rounded-md text-lg font-AeonikProMedium flex px-6 py-4 hover:bg-[#F2F2F2]"
        >
          <div className="mr-4 flex w-[24px]">
            <ExitIcon color={"red"} />
          </div>
          Выйти
        </button>
        <ExitModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      </div>
      <div className="w-full md:pl-[253px]">
        <Outlet />
      </div>
    </div>
  );
};
