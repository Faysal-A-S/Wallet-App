import React from "react";
import { useSelector } from "react-redux";

const SendTab = ({ sentList, isLoading }) => {
  const { user } = useSelector((state) => state.AuthUser);
  const columns = [
    { title: "ID" },
    { title: "Date" },
    { title: "To" },
    { title: "Amount" },
    { title: "Status" },

    { title: "To(Email)" },
  ];

  return (
    <div>
      {" "}
      <div className=" mt-5  overflow-auto ">
        {!isLoading ? (
          <table className=" md:w-full border-2 border-black text-center table ">
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
            {sentList?.length > 0 && user?.data ? (
              <tbody className="divide-y ">
                {sentList.map((requests, i) => {
                  return (
                    <tr
                      key={requests._id}
                      className={`${
                        i % 2 === 0 ? "bg-zinc-200" : "bg-zinc-100"
                      }`}
                    >
                      <td className=" py-2 text-md px-5 md:px-0">
                        {requests._id}
                      </td>
                      <td className=" py-2 text-md px-5 md:px-0">
                        {new Date(requests.createdAt).toLocaleString()}
                      </td>
                      <td className=" py-2 text-md px-5 md:px-0">
                        {requests.receiver._id}
                      </td>
                      <td className=" py-2 text-md ">{requests.amount}</td>
                      <td className=" py-2 text-md whitespace-nowrap">
                        {" "}
                        {requests.status}
                      </td>
                      <td className=" py-2 text-md whitespace-nowrap">
                        {requests.receiver.email}
                      </td>
                      <td className=" py-2 text-md whitespace-nowrap"></td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="h-32">
                <tr>
                  <th colSpan={6} rowSpan={2}>
                    No Data Found!
                  </th>
                </tr>
              </tbody>
            )}
          </table>
        ) : (
          <div className=" w-full h-full flex justify-center items-center fixed ">
            <img src="spinner.svg" alt="" className="w-32 h-32 mb-16 " />
          </div>
        )}
      </div>
    </div>
  );
};

export default SendTab;
