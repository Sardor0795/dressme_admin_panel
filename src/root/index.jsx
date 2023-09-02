import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/signIn";
import { SalesPage } from "../pages/sales";
import { Sidebar } from "../components/sideBar";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/sales" element={<SalesPage />} />
        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
};
