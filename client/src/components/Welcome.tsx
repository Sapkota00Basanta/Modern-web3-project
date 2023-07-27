// Import Third-party Modules
import React from "react";

// Import user-defined Modules
import { IWelcomeTypes } from "../types/components/Welcome.types";

/**
 * Welcome component for our application.
 * @returns Welcome styled page
 */
export const Welcome: React.FC<IWelcomeTypes> = () => {
  return (
    <>
      <h1> Hello from Welcome component</h1>
    </>
  );
};
