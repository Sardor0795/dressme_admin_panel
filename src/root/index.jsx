import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/signIn";
import { ClothesComponent } from "../components/clothes";
import { Sidebar } from "../components/sidebar";
import { SellersPage } from "../pages/sellers";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/sellers" element={< SellersPage/>} />
          <Route path="/clothes" element={<ClothesComponent />} />
        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Navigate to="/sellers" />} />
      </Routes>
    </>
  );
};
