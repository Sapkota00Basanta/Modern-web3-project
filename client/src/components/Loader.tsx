// Import Third-party modules
import React from "react";

// Import User-defined modules
import { ILoaderTypes } from "../types/components/Loader.types";

/**
 * Loader component of our application.
 * @returns Loader styled page.
 */
export const Loader: React.FC<ILoaderTypes> = () => {
  return (
    <>
      <h1> Hello from Loader component.</h1>
    </>
  );
};
