// Import Third-party Modules
import {
  ethers,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from "ethers";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

// Import User-Defined Modules
import { contractABI, contractAddress } from "../constants";
import {
  ITransactionContextTypes,
  IFormDataTypes,
  IFormDataHandleChangeProps,
} from "../types/context/TransactionContext.types";

// Creating a context variable
export const TransactionContext = createContext<ITransactionContextTypes>({
  connectWallet: async () => {},
  currentAccount: "",
  formData: { addressTo: "", amount: "", keyword: "", message: "" },
  sendTransaction: async () => null,
  formDataHandleChange: () => null,
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
  return transactionContract;
};

export const TransactionProvider: React.FC<any> = ({
  children,
}: PropsWithChildren<{}>) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [formData, setFormData] = useState<IFormDataTypes>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionCount, setTransactionCount] = useState<number>(
    parseInt(localStorage.getItem("transactionCount")!)
  );

  // Handle change event handler for keyboard input event
  const formDataHandleChange = ({
    event,
    name,
  }: IFormDataHandleChangeProps) => {
    // Assigning the type of target value of input event
    const target = event.target as typeof event.target & {
      value: IFormDataTypes;
    };

    setFormData((prevState) => ({
      ...prevState,
      [name]: target.value,
    }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect with metamask");

      const accounts = (await ethereum.request({
        method: "eth_accounts",
      })) as string;

      // Assigning the accounts to current account at the start
      if (accounts && accounts?.length > 0) {
        setCurrentAccount(accounts[0]);

        // get all the transactions
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object found.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please connect with metamask");

      // Get all the accounts linked in metamask
      const accounts = (await ethereum.request({
        method: "eth_requestAccounts",
      })) as Array<string>;

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object found.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask.");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = await getEthereumContract();
      const parsedAmount = parseUnits(amount, "gwei").toString(); // Method to convert number to big int of format gwei

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEI
            value: parsedAmount,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      console.log(transactionHash);

      // Setting the loading state to true for processing the transaction
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionContract.waitForDeployment();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(parseInt(transactionCount));
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };
  // Call the function only at the time of start
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        formDataHandleChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
