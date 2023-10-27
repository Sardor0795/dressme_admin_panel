import { Link, NavLink, Outlet } from "react-router-dom";
import { UserIcon } from "../../assets/icon";
import { sidebarData } from "../../utils/sidebarData";

export const Sidebar = () => {
  return (
    <div className="flex h-[100vh]">
      <div className="w-full min-w-[300px] max-w-[300px] border-r bg-[#FCFCFC] px-2 py-5">
        <Link
          className="ml-3 mb-8 flex items-center w-fit font-AeonikProRegular text-xl"
          to="/signin"
        >
          <span className="w-[56px] h-[56px] mr-4 bg-white border rounded-full flex items-center justify-center">
            <UserIcon />
          </span>
          Самандар
        </Link>

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
      </div>
      <div className="w-full">
        {/* <div className="h-[80px] bg-[#FCFCFC] border-b px-10 py-3"></div> */}
        <Outlet />
      </div>
    </div>
  );
};
