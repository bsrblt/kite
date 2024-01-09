import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import Modal from "../Layout/Modal";
import UserLogin from "../userauth/UserLogin";
import Header from "../Layout/Header";
import AuthContext from "../store/AuthContext";

const RootLayout = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      {!authCtx.isLoggedIn ? (
        <Modal>
          <UserLogin />
        </Modal>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
};

export default RootLayout;
