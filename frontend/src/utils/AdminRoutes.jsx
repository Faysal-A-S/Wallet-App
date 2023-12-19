import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useUserInfoQuery } from "../features/User/userApi";
import { logout, userData } from "../features/User/userSlice";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const isLoggedIn = useAuth();
  const token = useSelector((state) => state.AuthUser);
  const { user } = useSelector((state) => state.AuthUser);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useUserInfoQuery(token.token);

  useEffect(() => {
    if (data) {
      dispatch(userData(data));
    }
    if (
      error?.data?.message === "invalid token" ||
      error?.data?.message === "jwt expired"
    ) {
      dispatch(logout());
    }
  }, [data, dispatch, error]);
  return isLoading || Object.entries(user).length === 0 ? (
    <div className=" w-full h-full flex justify-center items-center fixed ">
      <img src="spinner.svg" alt="" className="w-32 h-32 mb-16 " />
    </div>
  ) : isLoggedIn && user?.data?.isAdmin ? (
    <div>
      <div className="h-screen md:flex p-4 w-screen overflow-x-auto">
        <SideBar className="" />
        <div className="flex-grow ">
          <Navbar className="p-2" />
          <div className="p-2 h-[90%]">{children}</div>
        </div>
      </div>
    </div>
  ) : isLoggedIn ? (
    <Navigate to={"/"} replace={true} />
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default AdminRoutes;
