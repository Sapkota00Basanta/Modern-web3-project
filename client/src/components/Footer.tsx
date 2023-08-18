// Import Third-party modules
import React from "react";

// Import User-defined Moudles
import { IFooterTypes } from "../types/components/Footer.types";
import logo from "../../images/logo.png";

/**
 * Footer component of our application.
 * @returns Footer styled page.
 */
export const Footer: React.FC<IFooterTypes> = () => {
  return (
    <div className="w-full flex flex-col md:justify-center justify-between items-center gradient-bg-footer p-4">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="w-full flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5">
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Market
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Exchange
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Tutorials
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Wallets
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-4">
        <p className="text-white text-sm text-center">Come Join Us!</p>
        <p className="text-white tex-sm text-center">
          sapkota.basanta46@gmail.com
        </p>
      </div>
      <div className="w-full h-[1px] bg-gray-400 mt-4 sm:w-[90%]" />
      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-sm">@BasantaSapkota2023</p>
        <p className="text-white text-right text-sm">All rights reserved.</p>
      </div>
    </div>
  );
};
