import { Navigate, Route, Routes } from "react-router-dom";
import { SignUpPage } from "../pages/signUp";

export const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </>
  );
};
