// Import Third-party Modules
import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

// Import User-defined modules
import {
  INavbarTypes,
  INavbarItemTypes,
} from "../types/components/Navbar.types";
import { NavbarIconSize } from "../constants";
import logo from "../../images/logo.png";

/**
 * Individual navigation item component of our application.
 * @param {INavbarItemTypes} param0
 * @returns Styled Navbar Item page.
 */
const NavbarItem: React.FC<INavbarItemTypes> = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

/**
 * Array of menu items string.
 */
const navbarItemsArray: Array<string> = [
  "Market",
  "Exchange",
  "Tutorials",
  "Wallets",
];

/**
 * Navbar component of our application.
 * @returns Navigation bar styled page.
 */
export const Navbar: React.FC<INavbarTypes> = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <nav className="w-full flex justify-between items-center p-4 md:justify-center">
      <div className="flex-initial justify-center items-center md:flex-[0.5]">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white hidden list-none flex-row justify-between items-center flex-initial md:flex">
        {navbarItemsArray.map((item, index) => (
          <NavbarItem key={`${item}-${index}-key`} title={item} />
        ))}
        <li className="bg-login_primary py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-login_secondary">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={NavbarIconSize}
            className="text-white cursor-pointer md:hidden"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={NavbarIconSize}
            className="text-white cursor-pointer md:hidden"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="
            z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl list-none flex 
            flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in md:hidden
          "
          >
            <li className="w-full text-xl my-2 cursor-pointer">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {navbarItemsArray.map((item, index) => (
              <NavbarItem
                key={`${item}-${index}-key`}
                title={item}
                classProps="my-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};
