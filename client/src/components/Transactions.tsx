// Import Third-party modules
import React from "react";

// Import User-defined modules
import { ITransactionTypes } from "../types/components/Transactions.types";

/**
 * Transaction component of our application.
 * @returns Transaction styled page.
 */
export const Transactions: React.FC<ITransactionTypes> = () => {
  return (
    <>
      <h1> Hello from Transaction component.</h1>
    </>
  );
};
