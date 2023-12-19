import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateRequestMutation } from "../features/Request/RequestApi";
import { notificationType } from "../features/Request/RequestSlice";

const ReceiveTab = ({ isLoading, receivedList }) => {
  const { user, token } = useSelector((state) => state.AuthUser);
  const [updateRequest] = useUpdateRequestMutation();
  const dispatch = useDispatch();
  const columns = [
    { title: "ID" },
    { title: "Date" },
    { title: "From" },
    { title: "Amount" },
    { title: "Status" },
    { title: "From(Email)" },

    { title: "Action" },
  ];
  useEffect(() => {
    const notification = receivedList.some(
      (request) => request.status === "pending"
    );
    dispatch(notificationType(notification));
  }, [receivedList, dispatch]);
  const handleAction = async ({ data, status }) => {
    await updateRequest({ token, status, data });
  };
  return (
    <div>
      <div className=" mt-5  overflow-auto ">
        {!isLoading ? (
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
            {receivedList?.length > 0 && user?.data ? (
              <tbody className="divide-y ">
                {receivedList.map((requests, i) => {
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
                        {requests.sender._id}
                      </td>
                      <td className=" py-2 text-md px-5">{requests.amount}</td>
                      <td className=" py-2 text-md whitespace-nowrap ">
                        {requests.status}
                      </td>
                      <td className=" py-2 text-md whitespace-nowrap ">
                        {requests.sender.email}
                      </td>
                      <td className=" py-2 text-md px-5">
                        {requests.status === "pending" ? (
                          <div className="flex gap-3 text-center ml-10">
                            <button
                              className="text-red-600 underline font-bold"
                              onClick={() =>
                                handleAction({
                                  data: requests,
                                  status: "Rejected",
                                })
                              }
                            >
                              Reject
                            </button>{" "}
                            {parseInt(user.data.balance) <
                            parseInt(requests.amount) ? (
                              <button
                                className="text-green-400 underline font-bold"
                                disabled={true}
                                title="Insufficient Balance!"
                              >
                                Accept
                              </button>
                            ) : (
                              <button
                                className="text-green-600 underline font-bold"
                                onClick={() =>
                                  handleAction({
                                    data: requests,
                                    status: "Accepted",
                                  })
                                }
                              >
                                Accept
                              </button>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
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
        ) : (
          <div className=" w-full h-full flex justify-center items-center fixed ">
            <img src="spinner.svg" alt="" className="w-32 h-32 mb-16 " />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiveTab;
