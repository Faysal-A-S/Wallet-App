import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { useSelector } from "react-redux";
import {
  useAllUsersQuery,
  useUpdateUserMutation,
  useUpdateUserStatusMutation,
} from "../features/User/userApi";
import { ImCross } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

const Users = () => {
  const { user, token } = useSelector((state) => state.AuthUser);
  const { data, error, isLoading } = useAllUsersQuery(token);
  const [updateUser, { error: updateError, data: updateData }] =
    useUpdateUserMutation();
  const [
    updateUserStatus,
    { error: updateStatusError, data: updateStatusData },
  ] = useUpdateUserStatusMutation();
  const [alert, setAlert] = useState(false);
  const [alertmsg, setalertmsg] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [id, setId] = useState("");

  const [phone, setPhone] = useState("");
  const [editable, setEditable] = useState({
    id: 0,
    status: false,
  });
  console.log(updateData, updateError);
  const columns = [
    { title: "ID" },
    { title: "First Name" },
    { title: "Last Name" },
    { title: "Email" },
    { title: "Phone" },
    { title: "Active" },
    { title: "Balance($)" },
    { title: "Action" },
    { title: "" },
  ];

  useEffect(() => {
    if (error?.data) {
      setalertmsg(error.data.message);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
    if (updateError?.data) {
      setalertmsg(updateError?.data?.message);
    }
    if (updateData?.message) {
      setalertmsg(updateData.message);
    }
    if (updateStatusError?.data) {
      setalertmsg(updateStatusError?.data?.message);
    }
    if (updateStatusData?.message) {
      setalertmsg(updateStatusData.message);
    }
  }, [error, updateError, updateData, updateStatusError, updateStatusData]);
  const handleUpdateUserStatus = async ({ data, action }) => {
    await updateUserStatus({ data, action, token });
  };
  const handleEdit = ({ id, firstName, lastName, phone, userID }) => {
    setEditable({ id, status: true });
    setfirstName(firstName);
    setlastName(lastName);
    setPhone(phone);
    setId(userID);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser({ token, data: { firstName, lastName, phone, id } });
    setfirstName("");
    setlastName("");
    setPhone("");
    setAlert(true);
    setEditable({ id: 0, status: false });
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title={"Users"} />

        {alert && (
          <div className="p-2 mt-2 bg-white flex gap-1 items-center text-center ">
            {error?.data || updateError?.data || updateStatusError?.data ? (
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
        <div></div>
      </div>
      <div className=" mt-5  overflow-auto ">
        {!isLoading ? (
          <form onSubmit={handleSubmit}>
            <table className=" md:w-full border-2 border-black text-center table-auto ">
              <thead className="bg-slate-800 text-slate-200 ">
                <tr className="table-row">
                  {columns.map((data) => {
                    return (
                      <th
                        className=" px-10 py-2 text-lg whitespace-nowrap"
                        key={data.title}
                      >
                        {data.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              {data?.message?.length > 0 && user?.data ? (
                <tbody className="divide-y ">
                  {data.message.map((users, i) => {
                    return (
                      <tr
                        key={users._id}
                        className={`${
                          i % 2 === 0 ? "bg-zinc-200" : "bg-zinc-100"
                        }`}
                      >
                        <td className=" py-2 text-md px-5 md:px-0">
                          {users._id}
                        </td>
                        <td className=" py-2 text-md px-5 md:px-0">
                          {editable.status === true && editable.id === i ? (
                            <input
                              value={firstName}
                              onChange={(e) => setfirstName(e.target.value)}
                              className="bg-transparent border border-black rounded-md px-2  w-7/12 md:w-auto mx-2"
                            />
                          ) : (
                            users.first_name
                          )}
                        </td>
                        <td className=" py-2 text-md px-5 md:px-0">
                          {editable.status === true && editable.id === i ? (
                            <input
                              value={lastName}
                              onChange={(e) => setlastName(e.target.value)}
                              className="bg-transparent border border-black rounded-md px-2  w-7/12 md:w-auto mx-2"
                            />
                          ) : (
                            users.last_name
                          )}
                        </td>
                        <td className=" py-2 text-md px-5">{users.email}</td>
                        <td className=" py-2 text-md whitespace-nowrap ">
                          {editable.status === true && editable.id === i ? (
                            <input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="bg-transparent border border-black rounded-md  px-2 w-7/12 md:w-auto mx-2"
                            />
                          ) : (
                            users.phone
                          )}
                        </td>
                        <td className=" py-2 text-md whitespace-nowrap ">
                          {users.isVerified.toString()}
                        </td>
                        <td className=" py-2 text-md whitespace-nowrap ">
                          {users.balance}
                        </td>
                        <td className=" py-2 text-md px-5">
                          <div>
                            {users.isVerified ? (
                              <button
                                onClick={() =>
                                  handleUpdateUserStatus({
                                    data: users._id,
                                    action: "Suspend",
                                  })
                                }
                                type="button"
                                className="bg-red-500 text-white text-center px-4 rounded-md p-2 font-bold text-lg hover:bg-red-700 ease-out duration-300"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleUpdateUserStatus({
                                    data: users._id,
                                    action: "Activate",
                                  })
                                }
                                type="button"
                                className="bg-blue-500 text-white text-center px-4 rounded-md p-2 font-bold text-lg hover:bg-blue-700 ease-out duration-300"
                              >
                                Activate
                              </button>
                            )}
                          </div>
                        </td>
                        <td className=" py-2 text-md whitespace-nowrap ">
                          <div>
                            {(editable.status === false ||
                              editable.id !== i) && (
                              <button
                                onClick={() =>
                                  handleEdit({
                                    id: i,
                                    firstName: users.first_name,
                                    lastName: users.last_name,
                                    email: users.email,
                                    phone: users.phone,
                                    userID: users._id,
                                  })
                                }
                                type="button"
                                className="bg-green-500 text-white text-center px-4 rounded-md p-2 font-bold text-lg hover:bg-green-700 ease-out duration-300"
                              >
                                Edit
                              </button>
                            )}
                            {editable.status === true && editable.id === i && (
                              <div className="flex gap-2 px-1 flex-col">
                                <button
                                  type="submit"
                                  className="text-center  text-green-500 font-bold text-lg hover:text-green-700 ease-out duration-300"
                                >
                                  Submit
                                </button>
                                <button
                                  onClick={() =>
                                    setEditable({ id: 0, status: false })
                                  }
                                  className="text-center  text-red-500 font-bold text-lg hover:text-red-700 ease-out duration-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody className="h-32">
                  <tr>
                    <th colSpan={7} rowSpan={2}>
                      No Data Found!
                    </th>
                  </tr>
                </tbody>
              )}
            </table>
          </form>
        ) : (
          <div className=" w-full h-full flex justify-center items-center fixed ">
            <img src="spinner.svg" alt="" className="w-32 h-32 mb-16 " />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
