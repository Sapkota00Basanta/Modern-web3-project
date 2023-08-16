// Import Third-party modules
import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

// Import User-defined modules
import {
  IServicesCardTypes,
  IServicesTypes,
} from "../types/components/Services.types";
import { servicesIconSize } from "../constants";

export const ServicesCard: React.FC<IServicesCardTypes> = ({
  color,
  icon,
  subtitle,
  title,
}) => (
  <div className="flex flex-row justify-evenly items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="flex flex-col flex-1 ml-5 text-justify">
      <h3 className="text-white text-lg">{title}</h3>
      <p className="tracking-tight text-white text-sm md:w-11/12 sm:text-xs">
        {subtitle}
      </p>
    </div>
  </div>
);

/**
 * Service component for our application.
 * @returns Service styled page.
 */
export const Services: React.FC<IServicesTypes> = () => {
  return (
    <div className="w-full flex-col flex justify-center items-center gradient-bg-services md:flex-row">
      <div className="flex flex-col gap-y-6 items-center justify-between py-12 px-4 mf:flex-row md:p-20">
        <div className="flex-1 flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl text-gradient">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-start">
          <ServicesCard
            color="bg-[#2952E3]"
            title="Security Guranted."
            subtitle="Security is guranted because we take cyber security with atmost priority for optimal user experience."
            icon={
              <BsShieldFillCheck
                fontSize={servicesIconSize}
                className="text-white"
              />
            }
          />
          <ServicesCard
            color="bg-[#8945F8]"
            title="Best Exchange Rates"
            subtitle="Security is guranted because we take cyber security with atmost priority for optimal user experience."
            icon={
              <BiSearchAlt fontSize={servicesIconSize} className="text-white" />
            }
          />
          <ServicesCard
            color="bg-[#F84550]"
            title="Fastest Transactions"
            subtitle="Security is guranted because we take cyber security with atmost priority for optimal user experience."
            icon={
              <RiHeart2Fill
                fontSize={servicesIconSize}
                className="text-white"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
