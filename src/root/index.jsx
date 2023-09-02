import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/signIn";
// import Sidebar from "../components/sideBar";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        {/* <Route path="/" element={<Sidebar />} /> */}
      </Routes>
    </>
  );
};
