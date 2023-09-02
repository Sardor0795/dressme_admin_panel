import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/signIn";
import { SalesPage } from "../pages/sales";
import { Sidebar } from "../components/sidebar";
import { ClothesComponent } from "../components/clothes";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/clothes" element={<ClothesComponent />} />
        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
};
