import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/signIn";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </>
  );
};
