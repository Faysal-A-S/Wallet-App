import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { RiHome2Line, RiLogoutCircleLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineRequestQuote } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/User/userSlice";
import { FaUsers } from "react-icons/fa6";
import { BsAsterisk } from "react-icons/bs";
const SideBar = () => {
  const { user } = useSelector((state) => state.AuthUser);
  const { notification } = useSelector((state) => state.requestType);
  const dispatch = useDispatch();
  const [collapse, setcollapse] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
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
  return (
    <div>
      <nav
        className={`md:flex h-full flex-col  bg-zinc-950 ${
          collapse ? "w-fit" : "w-full"
        }  px-7 pt-5 gap-6 hidden   `}
      >
        <div className=" text-white flex justify-end">
          <CgMenuRightAlt
            size={30}
            className={`cursor-pointer hover:text-red-600`}
            onClick={() => setcollapse(!collapse)}
          />
        </div>

        <ul className=" text-teal-50 flex flex-col gap-6 md:text-lg lg:text-xl ml-2 my-auto pb-6">
          {menuData.map((data) => {
            return (
              <Link
                className={`flex gap-2 items-center  ${
                  data.link === window.location.pathname
                    ? "text-red-600 p-2"
                    : "p-2"
                } hover:bg-zinc-600 duration-500 transition-all`}
                to={data.link}
                key={data.text}
              >
                {data.Icon}{" "}
                {!collapse && data.text === "Requests" && notification ? (
                  <div className="flex gap-1 items-center">
                    <span>{data.text}</span>
                    <BsAsterisk size={10} className="text-red-600" />
                  </div>
                ) : !collapse ? (
                  <span>{data.text}</span>
                ) : collapse && data.text === "Requests" && notification ? (
                  <BsAsterisk size={10} className="text-red-600" />
                ) : (
                  ""
                )}
              </Link>
            );
          })}
          <li>
            <Link
              className="flex gap-2 items-center p-2 hover:bg-zinc-600 duration-500 transition-all hover:text-red-400"
              onClick={handleLogout}
            >
              <RiLogoutCircleLine size={20} />
              {!collapse ? <span>Logout</span> : <span></span>}
            </Link>
          </li>
        </ul>
        <div className="grid grid-rows-2 "></div>
      </nav>
    </div>
  );
};

export default SideBar;
