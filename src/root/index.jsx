import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/signIn";
import { Sidebar } from "../components/sidebar";
import { SellersPage } from "../pages/sellers";
import { MoreAbout } from "../components/moreAbout";
import SellersList from "../components/Sellers/SellersList/SellersList";
import { ClothesPage } from "../pages/clothes";
// import ClothesList from "../components/clothes/clothesList/clothesList";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/sellers" element={<SellersPage />}>
            <Route index element={<SellersList />} />
            <Route path="/sellers/seller/:id" element={<MoreAbout />} />
            <Route path="/sellers/sellerList" element={<SellersList />} />
          </Route>
          <Route path="/clothes" element={<ClothesPage />}>
            <Route index element={<SellersList />} />
            {/* <Route index element={<ClothesList />} /> */}
          </Route>
        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Navigate to="/sellers" />} />
      </Routes>
    </>
  );
};
