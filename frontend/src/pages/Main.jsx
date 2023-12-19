import React from "react";
import PageTitle from "../components/PageTitle";
import { useSelector } from "react-redux";

const Main = () => {
  const { user } = useSelector((state) => state.AuthUser);
  console.log(user.data);
  return (
    <div>
      <div className="flex text-2xl font-bold">
        <h1>Welcome &nbsp;</h1>
        <PageTitle
          title={`${user?.data?.first_name} ${user?.data?.last_name}`}
        />
      </div>
      <div className="md:w-3/6 w-full mx-auto  mt-10 text-lg font-bold">
        <div className="flex justify-between p-4 md:px-8 items-end">
          <h1>Account Number:</h1>
          <h1 className="text-red-700">{user?.data?._id}</h1>
        </div>
        <div className="flex justify-between p-4 md:px-8 ">
          <h1>Balance:</h1>
          <h1 className="text-green-700">$ {user?.data?.balance}</h1>
        </div>
      </div>
      <div className="md:w-3/6 w-full mx-auto  mt-10 text-lg font-bold border border-gray-400">
        <div className="flex justify-between p-4 md:px-8 ">
          <h1>First Name:</h1>
          <h1>{user?.data?.first_name}</h1>
        </div>
        <div className="flex justify-between p-4 md:px-8 ">
          <h1>Last Name:</h1>
          <h1>{user?.data?.last_name}</h1>
        </div>
        <div className="flex justify-between p-4 md:px-8 ">
          <h1>Email:</h1>
          <h1>{user?.data?.email}</h1>
        </div>
        <div className="flex justify-between p-4 md:px-8 ">
          <h1>Phone:</h1>
          <h1>{user?.data?.phone}</h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
