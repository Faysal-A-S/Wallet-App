import React from "react";
import { useTransactionByUserQuery } from "../features/Transaction/transactionApi";

const TransactionTable = ({ token, user }) => {
  const columns = [
    { title: "Date" },
    { title: "Transaction ID" },
    { title: "Amount" },
    { title: "Type" },
    { title: "Reference" },
    { title: "Reference ID" },
  ];

  const { data, isLoading } = useTransactionByUserQuery(token);

  return (
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
          {data?.data?.length > 0 && user?.data ? (
            <tbody className="divide-y ">
              {data?.data?.map((transaction, i) => {
                return (
                  <tr
                    key={transaction._id}
                    className={`${i % 2 === 0 ? "bg-zinc-200" : "bg-zinc-100"}`}
                  >
                    <td className=" py-2 text-md ">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                    <td className=" py-2 text-md ">{transaction._id}</td>
                    <td className=" py-2 text-md ">{transaction.amount}</td>
                    <td className=" py-2 text-md whitespace-nowrap">
                      {transaction.sender === transaction.receiver
                        ? "Deposit"
                        : transaction.sender === user.data._id
                        ? "Debit"
                        : "Credit"}
                    </td>
                    <td className=" py-2 text-md whitespace-nowrap">
                      {transaction.reference ? transaction.reference : ""}
                    </td>
                    <td className=" py-2 text-md whitespace-nowrap">
                      {transaction.sender === user.data._id
                        ? transaction.receiver
                        : transaction.sender}
                    </td>
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
  );
};

export default TransactionTable;
