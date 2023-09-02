import { Link, Outlet } from "react-router-dom";
import { UserIcon } from "../../assets/icon";

export const Sidebar = () => {
  return (
    <div className="flex h-[100vh]">
      <div className="w-full max-w-[300px] border-r bg-[#FCFCFC] px-2 py-5">
        <Link className="ml-3 mb-8 flex items-center w-fit" to="/signin">
          <span className="w-[56px] h-[56px] mr-4 bg-white border rounded-full flex items-center justify-center">
            <UserIcon />
          </span>
          Самандар
        </Link>
      </div>
      <div className="w-full">
        <div className="h-[80px] bg-[#FCFCFC] border-b px-10 py-3">Top</div>
        <Outlet />
      </div>
    </div>
  );
};
