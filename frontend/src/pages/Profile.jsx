import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../features/User/userApi";
import { ImCross } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

const Profile = () => {
  const { user, token } = useSelector((state) => state.AuthUser);
  const [editable, setEditable] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [alert, setAlert] = useState(false);

  const [alertMsg, setalertMsg] = useState(null);
  const [updateUser, { isLoading, error, data }] = useUpdateUserMutation();
  const handleEdit = () => {
    setEditable(true);
    setfirstName(user.data.first_name);
    setlastName(user.data.last_name);
    setphone(user.data.phone);
  };

  useEffect(() => {
    if (error?.data) {
      setalertMsg(error.data.message);
    }
    if (data?.message) {
      setalertMsg(data.message);
    }
  }, [error, data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser({
      token,
      data: { firstName, lastName, phone, id: user.data._id },
    });
    setAlert(true);
    setfirstName("");
    setlastName("");
    setphone("");
    setEditable(false);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <PageTitle title={"Profile"} />
        {alert && (
          <div className="p-2 mt-2 bg-white flex gap-1 items-center text-center ">
            {error?.data ? (
              <ImCross className="text-red-500" size={25} />
            ) : (
              <AiOutlineCheckCircle className="text-green-400" size={25} />
            )}
            <p className="font-bold">{alertMsg}</p>
            <button onClick={() => setAlert(false)}>
              <RxCrossCircled
                className="text-gray-700 hover:text-red-700"
                size={20}
              />
            </button>
          </div>
        )}
        <button
          className="bg-blue-500 text-white text-center px-4 rounded-md p-2 font-bold text-lg hover:bg-blue-700 ease-out duration-300"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {user?.data && !isLoading ? (
          <div className="lg:w-3/6 w-full mx-auto  mt-10 text-lg font-bold border border-gray-400 flex flex-col ">
            <div className="flex justify-between p-4 md:px-8 flex-wrap md:flex-nowrap">
              <h1>First Name:</h1>
              {editable === false ? (
                <h1>{user?.data?.first_name}</h1>
              ) : (
                <input
                  className="bg-transparent border border-black rounded-md px-2 w-7/12 md:w-auto "
                  placeholder={firstName}
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              )}
            </div>
            <div className="flex justify-between p-4 md:px-8 ">
              <h1>Last Name:</h1>
              {editable === false ? (
                <h1>{user?.data?.last_name}</h1>
              ) : (
                <input
                  className="bg-transparent border border-black rounded-md px-2 w-7/12 md:w-auto"
                  type="text"
                  value={lastName}
                  placeholder={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              )}
            </div>
            <div className="flex justify-between p-4 md:px-8 ">
              <h1>Email:</h1>
              <h1>{user?.data?.email}</h1>
            </div>
            <div className="flex justify-between p-4 md:px-8 ">
              <h1>Phone:</h1>
              {editable === false ? (
                <h1>{user?.data?.phone}</h1>
              ) : (
                <input
                  className="bg-transparent border border-black rounded-md px-2 w-7/12 md:w-auto"
                  type="text"
                  placeholder={phone}
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              )}
            </div>
            {editable === true ? (
              <div className="flex justify-end p-4 md:px-8 text-right gap-3">
                <button
                  onClick={() => setEditable(false)}
                  type="button"
                  className="bg-red-500 text-white text-center px-4 rounded-md p-2 font-bold text-lg hover:bg-red-700 ease-out duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white text-center px-4 rounded-md p-2 font-bold text-lg hover:bg-green-700 ease-out duration-300"
                >
                  Submit
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className=" w-full h-full flex justify-center items-center fixed ">
            <img src="spinner.svg" alt="" className="w-32 h-32 mb-16 " />
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
