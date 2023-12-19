import React, { useEffect, useState } from "react";
import PageTitle from "./../components/PageTitle";
import SendTab from "../components/SendTab";
import ReceiveTab from "../components/ReceiveTab";
import Modal from "../components/Modal";
import {
  useGetRequestsByUserQuery,
  useSendRequestMutation,
} from "../features/Request/RequestApi";
import { useLazyVerifyUserQuery } from "../features/User/userApi";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

const Requests = () => {
  const { user, token } = useSelector((state) => state.AuthUser);
  const [varUsermsg, setVarUserMsg] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertmsg, setalertmsg] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const [open, setopen] = useState(false);
  const [sendRequest, { data: sendRequestResponse, error }] =
    useSendRequestMutation();
  const [reference, setReference] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [trigger, result, { isLoading }] = useLazyVerifyUserQuery();
  const {
    data: requestList,
    isLoading: requestIsLoading,
    error: requestError,
  } = useGetRequestsByUserQuery(token);

  let sentList = {};
  let receivedList = null;

  if (!requestIsLoading) {
    sentList = requestList?.message.filter(
      (sent) => sent.sender._id === user.data._id
    );
    receivedList = requestList?.message.filter(
      (sent) => sent.receiver._id === user.data._id
    );
  }

  useEffect(() => {
    if (result?.status === "rejected") {
      setVarUserMsg({ message: result.error.data.message, status: "failure" });
    }
    if (result?.status === "fulfilled") {
      setVarUserMsg({ message: result.data.message, status: "success" });
    }
    if (result?.status === "pending") {
      setVarUserMsg(null);
    }
    if (error?.data) {
      setalertmsg(error.data.message);
    }
    if (sendRequestResponse?.message) {
      setalertmsg(sendRequestResponse?.message);
    }
    if (requestError?.data) {
      setalertmsg(requestError.data.message);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [result, sendRequestResponse, error, requestError]);

  const tabs = [
    {
      name: "Sent",
      Content: <SendTab sentList={sentList} isLoading={requestIsLoading} />,
      id: 1,
    },
    {
      name: "Received",
      Content: (
        <ReceiveTab receivedList={receivedList} isLoading={requestIsLoading} />
      ),
      id: 2,
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest({
      token,
      data: { receiver: accNumber, amount, reference },
    });
    setAlert(true);
    setopen(false);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };
  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <PageTitle
          title={"Requests"}
          className="flex md:justify-between w-full flex-wrap justify-center"
        />
        {alert && (
          <div className="p-2 mt-2 bg-white flex gap-1 items-center text-center ">
            {error?.data ? (
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
        <button
          className="bg-blue-500 text-white text-center px-4 rounded-md p-2 font-bold md:text-lg text-md hover:bg-blue-700 ease-out duration-300"
          onClick={() => setopen(true)}
        >
          Request Money
        </button>
      </div>
      <div className="flex mt-10">
        {tabs.map((content) => {
          return (
            <div key={content.id}>
              <button
                onClick={() => setIsActive(content.id)}
                className={`${
                  content.id === isActive
                    ? "bg-green-600 border-b-4 border-green-800"
                    : "bg-green-400 border-b-4 border-green-400"
                } text-white text-center px-4 p-2 font-bold text-lg  ease-out duration-300`}
              >
                {content.name}
              </button>
            </div>
          );
        })}
      </div>
      {isLoading ? (
        <div className=" w-full h-full flex justify-center items-center fixed ">
          <img src="spinner.svg" alt="" className="w-32 h-32 mb-16 " />
        </div>
      ) : (
        <Modal
          open={open}
          onClose={() => setopen(false)}
          title={"Request Funds"}
        >
          <div className="text-center ">
            <form
              className="grid grid-rows-1 gap-3 m-2 p-2 md:m-5 md:p-5 justify-center items-center md:text-2xl text-md "
              onSubmit={handleSubmit}
            >
              <div className="flex gap-3">
                <input
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  placeholder="Amount"
                  className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
                  required
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  onChange={(e) => {
                    setAccNumber(e.target.value);
                  }}
                  value={accNumber}
                  placeholder="Account Number"
                  className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
                  required
                />
                <button
                  type="button"
                  className="bg-green-700 hover:bg-green-900 text-white text-center w-auto rounded-lg p-2 font-bold md:text-lg "
                  onClick={async () => {
                    if (accNumber !== "") {
                      await trigger({ data: accNumber, token });
                    }
                  }}
                >
                  Verify
                </button>
              </div>
              {varUsermsg && (
                <div
                  className={`text-slate-200 ${
                    varUsermsg.status === "success"
                      ? "bg-green-700"
                      : "bg-red-700"
                  } p-1 rounded-sm`}
                >
                  {varUsermsg.message}
                </div>
              )}
              <textarea
                type="text"
                onChange={(e) => setReference(e.target.value)}
                placeholder="Description"
                required
                value={reference}
                className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
              />
              <div className="flex  w-full justify-end gap-3">
                <button
                  onClick={() => setopen(false)}
                  type="button"
                  className="bg-red-700 hover:bg-red-900 text-white text-center w-auto rounded-lg p-2 font-bold md:text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${
                    varUsermsg?.status === "success"
                      ? "bg-blue-700 hover:bg-blue-900 text-white"
                      : "bg-blue-400 cursor-default"
                  }  text-center w-auto rounded-lg p-2 font-bold md:text-lg text-white`}
                  disabled={varUsermsg?.status === "success" ? false : true}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <div className="mt-5">
        {requestIsLoading ? (
          <div className=" w-full h-full flex justify-center items-center fixed ">
            <img src="spinner.svg" alt="" className="w-32 h-32 mb-16 " />
          </div>
        ) : (
          tabs[isActive - 1].Content
        )}
      </div>
    </div>
  );
};

export default Requests;
