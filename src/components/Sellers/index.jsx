import { Outlet } from "react-router-dom";

export const SalesComponent = () => {
  return (
    <div className="w-full pb-[20px] px-[16px] md:px-10">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};
