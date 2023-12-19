import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/User/userApi";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";
const Register = () => {
  const [register, { data, isLoading, error }] = useRegisterMutation();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phone, setphone] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertmsg, setalertmsg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data) {
      setalertmsg(error?.data);
    }
    if (data?.message) {
      setalertmsg(data?.message);
    }
  }, [error, data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setalertmsg("password and confirm password doesn't match");
      setAlert(true);
    } else {
      await register({ firstName, lastName, Email, password, phone });
      setTimeout(() => {
        navigate("/login");
        setAlert(false);
      }, 2000);
      setEmail("");
      setfirstName("");
      setlastName("");
      setconfirmPassword("");
      setpassword("");
      setphone("");
      setAlert(false);
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center  ">
      {alert && (
        <div className="p-2 mt-2 bg-white flex gap-1 items-center transition-all ease-out">
          {error.data ? (
            <ImCross className="text-red-500" size={25} />
          ) : (
            <AiOutlineCheckCircle className="text-green-400" size={25} />
          )}
          <p className="font-bold">{alertmsg}</p>
          <button onClick={() => setAlert(false)}>
            <RxCrossCircled className="text-red-700" size={20} />
          </button>
        </div>
      )}
      <div className="flex  flex-col bg-white h-auto w-[60%] lg:w-[20%]  m-auto rounded-xl">
        <h1 className="border-b-2 p-5 text-2xl md:text-3xl lg:text-5xl xl:text-7xl mt-5 font-bold text-center">
          Register
        </h1>

        <form
          className="grid grid-rows-1 gap-3 m-2 p-2 md:m-5 md:p-5 justify-center items-center text-2xl"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            placeholder="First Name"
            className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="Last Name"
            className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
            required
          />
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            placeholder="Phone"
            className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
            required
          />
          <button
            type="submit"
            className="bg-gray-800 text-white text-center w-auto rounded-lg p-2 font-bold text-2xl "
            disabled={isLoading}
          >
            Register
          </button>

          <p className="text-base text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline text-green-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
