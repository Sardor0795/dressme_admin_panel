import { useLocation } from "react-router-dom";
import comingSoonImg from "../../assets/img/coming_soon.jpg";

export const ClothesComponent = () => {
  const location = useLocation();

  return (
    <div className="w-full text-center">
      <h1 className="mt-5">ClothesComponent</h1>
      <div className="flex justify-center mt-4">
        <img src={comingSoonImg} alt="soonImg" />
      </div>
      <h2 className="mt-4">Path: {location.pathname}</h2>
    </div>
  );
};
