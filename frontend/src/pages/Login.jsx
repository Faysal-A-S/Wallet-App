import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../features/User/userApi";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [login, { isLoading, data, error }] = useLoginMutation();
  const [alert, setAlert] = useState(false);
  const [alertmsg, setalertmsg] = useState(null);
  const [type, setType] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ Email, password });
    setAlert(true);
    setpassword("");
    setEmail("");
    setTimeout(() => {
      setAlert(false);
      setType(false);
    }, 500);
  };
  useEffect(() => {
    if (error?.data) {
      setalertmsg(error.data.message);
    }
    if (data?.token) {
      if (data?.user) {
        setalertmsg(data.message);
        setType(false);
        localStorage.setItem("verify", JSON.stringify({ user: data.user }));
      } else if (data?.user === false) {
        setType(true);
        setalertmsg("User is not active");
      }

      localStorage.setItem("user", JSON.stringify({ token: data.token }));

      window.location.href = "";
    }
  }, [error, data]);
  return (
    <div className="h-screen w-screen flex items-center flex-col">
      {alert && (
        <div className="p-2 mt-2 bg-white flex gap-1 items-center ">
          {error?.data || type ? (
            <ImCross className="text-red-500" size={25} />
          ) : (
            <AiOutlineCheckCircle className="text-green-400" size={25} />
          )}
          <p className="font-bold">{alertmsg}</p>
          <button onClick={() => setAlert(false)}>
            <RxCrossCircled
              className="text-gray-700 hover:text-red-700"
              size={20}
            />
          </button>
        </div>
      )}
      <div className="flex  flex-col bg-white h-auto w-[60%] lg:w-[20%]  m-auto rounded-xl">
        <h1 className="border-b-2 p-5 text-2xl md:text-3xl lg:text-5xl xl:text-7xl mt-5 font-bold text-center">
          Login
        </h1>

        <form
          className="grid grid-rows-1 gap-3 m-2 p-2 md:m-5 md:p-5 justify-center items-center text-2xl"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
            required
          />
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
            required
          />
          <button
            type="submit"
            className="bg-gray-800 text-white text-center w-auto rounded-lg p-2 font-bold text-2xl "
            disabled={isLoading}
          >
            Login
          </button>

          <p className="text-base text-center">
            Doesn't have an account yet?{" "}
            <Link to="/register" className="underline text-green-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
