import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import React, { useEffect } from "react";
import { useUserInfoQuery } from "../features/User/userApi";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../features/User/userSlice";
const ProtectedRoutes = ({ children }) => {
  const isLoggedIn = useAuth();
  const token = useSelector((state) => state.AuthUser);

  const dispatch = useDispatch();
  const { data, error } = useUserInfoQuery(token.token);

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
  return isLoggedIn ? (
    <div>
      <div className="h-screen md:flex p-4 w-screen overflow-x-auto">
        <SideBar className="" />
        <div className="flex-grow ">
          <Navbar className="p-2" />
          <div className="p-2 h-[90%]">{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default ProtectedRoutes;
