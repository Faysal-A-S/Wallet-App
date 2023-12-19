import React, { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";

import { Link, useNavigate } from "react-router-dom";

import { RiHome2Line, RiLogoutCircleLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineRequestQuote } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/User/userSlice";
const Navbar = () => {
  const { user } = useSelector((state) => state.AuthUser);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLinks = [
    { text: "Home", Icon: <RiHome2Line size={20} />, link: "/" },
    {
      text: "Transactions",
      Icon: <GrTransaction size={20} />,
      link: "/transactions",
    },
    {
      text: "Requests",
      Icon: <MdOutlineRequestQuote size={20} />,
      link: "/requests",
    },
    { text: "Profile", Icon: <FaUser size={20} />, link: "/profile" },
  ];
  const adminLinks = [
    { text: "Home", Icon: <RiHome2Line size={20} />, link: "/" },
    {
      text: "Transactions",
      Icon: <GrTransaction size={20} />,
      link: "/transactions",
    },
    {
      text: "Requests",
      Icon: <MdOutlineRequestQuote size={20} />,
      link: "/requests",
    },
    { text: "Profile", Icon: <FaUser size={20} />, link: "/profile" },
    { text: "Users", Icon: <FaUsers size={20} />, link: "/users" },
  ];
  let menuData = user?.data?.isAdmin ? adminLinks : userLinks;
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="relative">
      <div className=" bg-zinc-950 h-fit ml-2 flex items-center justify-between text-white px-4">
        <CgMenuRightAlt
          size={30}
          className={`cursor-pointer  md:hidden`}
          onClick={() => {
            setOpen(!open);
          }}
        />
        <h1 className="text-xl md:text-4xl my-4 col-span-2 font-bold">
          Wallet-App
        </h1>
        <Link
          className="text-sm md:text-md underline hover:text-red-600 "
          to={"/profile"}
        >
          {user?.data?.first_name}
          <span> </span>
          {user?.data?.last_name}
        </Link>
      </div>
      {open && (
        <div className="ml-2 absolute bg-zinc-950 h-screen text-white px-4">
          <ul className=" text-teal-50 flex flex-col gap-6 md:text-lg lg:text-xl ml-2 my-auto pb-6">
            {menuData.map((data) => {
              return (
                <Link
                  onClick={() => setOpen(false)}
                  className={`flex gap-2 items-center  ${
                    data.link === window.location.pathname
                      ? "text-red-600 p-2"
                      : "p-2"
                  } hover:bg-zinc-600 duration-500 transition-all`}
                  to={data.link}
                  key={data.text}
                >
                  {data.Icon} <span>{data.text}</span>
                </Link>
              );
            })}
            <li>
              <Link
                className="flex gap-2 items-center p-2 hover:bg-zinc-600 duration-500 transition-all hover:text-red-400"
                onClick={handleLogout}
              >
                <RiLogoutCircleLine size={20} />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
