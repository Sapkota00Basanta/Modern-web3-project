// Import Third-party Modules
import { ethers } from "ethers";
import { PropsWithChildren, createContext, useEffect } from "react";

// Import User-Defined Modules
import { contractABI, contractAddress } from "../constants";
import { IExampleContextInterface } from "../types/context/TransactionContext.types";

// Creating a context variable
export const TransactionContext = createContext<IExampleContextInterface>({
  example: null,
  setExample: () => null,
  getExample: async () => {},
});

// Fetching ethereum object info from window
const { ethereum } = window;

// Interact with our deployed smart contract using contract abi
const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
};

export const TransactionProvider: React.FC<any> = ({
  children,
}: PropsWithChildren<{}>) => {
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please connect with metamask");

    const accounts = await ethereum.request({ method: "eth_accounts" });

    console.log(accounts);
  };

  // Call the function only at the time of start
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ example: { age: 12, name: "samir" } }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
