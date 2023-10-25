import { Outlet } from "react-router-dom";

export const ClothesComponent = () => {
  return (
    <div className="w-full px-10">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};
