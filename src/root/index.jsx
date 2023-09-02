import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/signIn";
import { SalesPage } from "../pages/sales";
import { ClothesComponent } from "../components/clothes";
import { SideBar } from "../components/sidebar";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<SideBar />}>
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/clothes" element={<ClothesComponent />} />
        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
};
