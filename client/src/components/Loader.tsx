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
    <div className=" flex justify-center items-center py-2">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700" />
    </div>
  );
};
