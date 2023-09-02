import { Link, Outlet } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="flex h-[100vh]">
      <div className="w-full max-w-[300px] border-r bg-[#FCFCFC] px-2 py-5">
        <Link to="/signin"> Sign In</Link>
      </div>
      <div className="w-full">
        <div className="h-[80px] bg-[#FCFCFC] border-b px-10 py-3">Top</div>
        <Outlet />
      </div>
    </div>
  );
};
