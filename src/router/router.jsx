import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main/main";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import Detail from "../pages/detail";
import Profile from "../pages/profile";
import Posts from "../pages/Posts/Posts";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
