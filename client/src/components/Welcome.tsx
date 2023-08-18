// Import Third-party Modules
import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

// Import user-defined Modules
import {
  IWelcomeTypes,
  IWelcomeInputTypes,
} from "../types/components/Welcome.types";
import { Loader } from "./";
import { EthereumIconSize, InfoIconSize } from "../constants";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

/**
 * Global/Common Input component for Welcome component.
 */
export const Input: React.FC<IWelcomeInputTypes> = ({
  name,
  handleChange,
  ...props
}) => (
  <input
    name={name}
    step="0.0001"
    onChange={(event) => handleChange({ event, name })}
    className="w-full my-2 rounded-sm p-2 outline-none border-none bg-transparent text-white text-sm white-glassmorphism"
    {...props}
  />
);

/**
 * Global style defination for similar component.
 */
const commonStyles = `min-h-[70px] px-2 flex justify-center items-center 
border-[0.5px] border-gray-400 text-sm font-light text-white sm:px-0 sm:min-w-[120px]`;

/**
 * Welcome component for our application.
 * @returns Welcome styled page
 */
export const Welcome: React.FC<IWelcomeTypes> = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    formDataHandleChange,
    isLoading,
  } = useContext(TransactionContext);

  /**
   * Callback function to handle submit.
   */
  const handleSubmit = (event: React.SyntheticEvent) => {
    const { addressTo, amount, keyword, message } = formData;

    event.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };
  return (
    <div className="flex w-full justify-center items-center">
      <div className=" flex flex-col items-start justify-between py-12 px-4 mf:flex-row md:p-20">
        <div className="flex flex-col flex-1 justify-start mf:mr-10">
          <h1 className="text-3xl text-white text-gradient py-1 sm:text-5xl ">
            Send Crypto <br /> across the world.
          </h1>
          <p className="text-left mt-5 text-white font-light w-11/12 text-base md:w-9/12">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto.
          </p>
          {!currentAccount && (
            <button
              type="button"
              className="flex flex-row justify-center items-center my-5 bg-login_primary p-3 cursor-pointer rounded-full hover:bg-login_secondary"
              onClick={connectWallet}
            >
              <p className=" text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Relability</div>
            <div className={commonStyles}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={commonStyles}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mt-10 mf:mt-0">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 w-full my-5 eth-card white-glassmorphism sm:w-72 ">
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={EthereumIconSize} color="#fff" />
                </div>
                <BsInfoCircle fontSize={InfoIconSize} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {currentAccount ? shortenAddress(currentAccount) : `Address`}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 w-full flex flex-col items-center justify-start blue-glassmorphism sm:w-96">
            <Input
              name="addressTo"
              placeholder="Address To"
              type="text"
              handleChange={formDataHandleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={formDataHandleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={formDataHandleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={formDataHandleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-4" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-send_now_border_color rounded-full cursor-pointer"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
