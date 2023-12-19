import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Modal from "../components/Modal";
import { useLazyVerifyUserQuery } from "../features/User/userApi";
import { useSelector } from "react-redux";
import {
  useDepositFundMutation,
  useTransferFundMutation,
} from "../features/Transaction/transactionApi";
import { ImCross } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import TransactionTable from "../components/TransactionTable";
import StripeCheckout from "react-stripe-checkout";
const Transaction = () => {
  const [open, setopen] = useState(false);
  const [title, setTitle] = useState(null);

  const [amount, setAmount] = useState(0);
  const [accNumber, setAccNumber] = useState("");
  const { token, user } = useSelector((state) => state.AuthUser);
  const [reference, setReference] = useState("");
  const [alert, setAlert] = useState(false);
  const [varUsermsg, setVarUserMsg] = useState(null);
  const [balCheck, setBalCheck] = useState(false);
  const [alertmsg, setalertmsg] = useState(null);
  const [stripeModal, setStripeModal] = useState(false);
  const [trigger, result, { isLoading }] = useLazyVerifyUserQuery();
  const [stripeAmount, setStripeAmount] = useState(0);
  const [transferFund, { data: transferResponse, error }] =
    useTransferFundMutation();
  const [depositFund, { data: depositResponse }] = useDepositFundMutation();

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
    if (user?.data?.balance > parseInt(amount) && title === "Transfer") {
      setBalCheck(true);
    } else {
      setBalCheck(false);
    }
    if (error?.data) {
      setalertmsg(error.data.message);
    }
    if (transferResponse?.message) {
      setalertmsg(transferResponse?.message);
    }
    if (depositResponse?.message) {
      setStripeModal(false);
      setStripeAmount(0);
    }
  }, [result, user, amount, title, error, transferResponse, depositResponse]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await transferFund({
      data: { amount, accNumber, reference, type: title },
      token,
    });
    setAlert(true);
    setopen(false);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };
  const handleStripeSubmit = async (e) => {
    e.preventDefault();
  };
  const onToken = async (data) => {
    await depositFund({ data, token, amount: stripeAmount });
  };
  return (
    <div className="w-full h-full">
      <div className="flex md:justify-between w-full flex-wrap justify-center">
        <PageTitle title={"Transaction"} className="basis-full md:basis-auto" />
        {alert && (
          <div className="p-2 mt-2 bg-white flex gap-1 items-center text-center ">
            {error.data ? (
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
        <div className="flex mr-4 gap-3 ">
          <button
            className="bg-green-500 text-white text-center px-4 rounded-md p-2 font-bold text-lg hover:bg-green-700 ease-out duration-300"
            onClick={() => {
              setStripeModal(true);
              setTitle("Deposit");
            }}
          >
            Deposit
          </button>

          <button
            className="bg-red-500 text-white text-center px-4 rounded-md p-2 font-bold text-lg hover:bg-red-700 ease-out duration-300"
            onClick={() => {
              setopen(true);
              setTitle("Transfer");
            }}
          >
            Transfer
          </button>
        </div>
      </div>
      <Modal
        open={stripeModal}
        onClose={() => setStripeModal(false)}
        title={title}
      >
        <div className="text-center ">
          <form
            className="grid grid-rows-1 gap-3 m-2 p-2 md:m-5 md:p-5 justify-center items-center md:text-2xl text-md "
            onSubmit={handleStripeSubmit}
          >
            <div className="flex gap-3">
              <input
                type="number"
                onChange={(e) => setStripeAmount(e.target.value)}
                value={stripeAmount}
                placeholder="Amount"
                className="w-full border-slate-300 border-2 rounded-lg px-2 py-1"
                required
              />
            </div>

            <div className="flex  w-full justify-end gap-3">
              <button
                onClick={() => setStripeModal(false)}
                type="button"
                className="bg-red-700 hover:bg-red-900 text-white text-center w-auto rounded-lg p-2 font-bold md:text-lg"
              >
                Cancel
              </button>
              <StripeCheckout
                shippingAddress
                billingAddress
                currency="USD"
                amount={parseInt(stripeAmount) * 100}
                stripeKey="pk_test_51OG5bkHIHwz3i9g3Je2TIbNmzHFR5gcPspAiRsAmkj5vSN8CEsSAsCyIdkqgbh960dU77RmYj3PVL4Qtc7iATzVD00qys4DAWa"
                token={onToken}
              >
                <button
                  className="text-center w-auto rounded-lg p-2 font-bold md:text-lg bg-blue-900 text-white"
                  type="submit"
                >
                  Deposit
                </button>
              </StripeCheckout>
            </div>
          </form>
        </div>
      </Modal>
      {isLoading ? (
        <div className=" w-full h-full flex justify-center items-center fixed ">
          <img src="spinner.svg" alt="" className="w-32 h-32 mb-16 " />
        </div>
      ) : (
        <Modal open={open} onClose={() => setopen(false)} title={title}>
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
                <div>Balance: ${user?.data?.balance}</div>
              </div>
              {!balCheck && amount > 0 && (
                <p className="text-left text-sm leading-3 text-red-600">
                  Insufficient Balance
                </p>
              )}

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
                    balCheck && varUsermsg?.status === "success"
                      ? "bg-blue-700 hover:bg-blue-900 text-white"
                      : "bg-blue-400 cursor-default"
                  }  text-center w-auto rounded-lg p-2 font-bold md:text-lg text-white`}
                  disabled={
                    balCheck && varUsermsg?.status === "success" ? false : true
                  }
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <TransactionTable token={token} user={user} />
    </div>
  );
};

export default Transaction;
