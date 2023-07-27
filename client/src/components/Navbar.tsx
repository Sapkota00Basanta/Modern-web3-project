// Import Third-party Modules
import React from "react";

// Import User-defined modules
import { INavbarTypes } from "../types/components/Navbar.types";

/**
 * Navbar component of our application.
 * @returns Navigation bar styled page.
 */
export const Navbar: React.FC<INavbarTypes> = () => {
  return (
    <>
      <h1> Hello from Navbar component.</h1>
    </>
  );
};
