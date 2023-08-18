// Import Third-party modules
import React, { useContext } from "react";

// Import User-defined modules
import {
  ITransactionCardType,
  ITransactionTypes,
} from "../types/components/Transactions.types";
import { TransactionContext } from "../context/TransactionContext";
import dummyTransactionData from "../constants/dummyTransactionData";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

export const TransactionCard: React.FC<ITransactionCardType> = ({
  addressTo,
  addressFrom,
  amount,
  message,
  timestamp,
  url,
  keyword,
}: ITransactionCardType) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="flex flex-1 bg-[#181918] m-4
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      flex-col p-3 rounded-md hover:shadow-2xl
    "
    >
      <div className="flex flex-col w-full items-center mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full rounded-md h-64 shadow-md object-cover 2xl:h-96"
        />
        <div className="w-max bg-black p-3 px-5 rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37C7da] text-base">Timestamp: {timestamp}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Transaction component of our application.
 * @returns Transaction styled page.
 */
export const Transactions: React.FC<ITransactionTypes> = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);
  return (
    <div className="w-full flex justify-center items-center gradient-bg-transactions 2xl:px-20">
      <div className="flex flex-col py-12 px-4 md:p-12">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions.
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions.
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction, index) => (
            <TransactionCard
              key={`${transaction.timestamp}-key-${index}`}
              addressFrom={transaction.addressFrom}
              addressTo={transaction.addressTo}
              url={transaction.url}
              message={transaction.message}
              amount={transaction.amount}
              timestamp={transaction.timestamp}
              keyword={transaction.keyword}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
