import { Outlet } from "react-router-dom";

export const LocationsComponent = () => {
  return (
    <div className="w-full px-[16px] md:px-10">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};
