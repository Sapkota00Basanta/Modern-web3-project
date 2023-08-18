// Import Third-party Modules
import { ethers, formatUnits, parseUnits } from "ethers";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

// Import User-Defined Modules
import { contractABI, contractAddress } from "../constants";
import {
  IBlockchainTransactionTypes,
  IFormDataHandleChangeProps,
  IFormDataTypes,
  IFormattedTranasctionTypes,
  ITransactionContextTypes,
} from "../types/context/TransactionContext.types";

// Creating a context variable
export const TransactionContext = createContext<ITransactionContextTypes>({
  connectWallet: async () => {},
  currentAccount: "",
  formData: { addressTo: "", amount: "", keyword: "", message: "" },
  sendTransaction: async () => null,
  formDataHandleChange: () => null,
  transactions: [
    {
      addressFrom: "",
      addressTo: "",
      message: "",
      keyword: "",
      timestamp: "",
      amount: "",
      url: "",
    },
  ],
  isLoading: false,
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
  const [transactions, setTransactions] = useState<
    Array<IFormattedTranasctionTypes>
  >([
    {
      addressFrom: "",
      addressTo: "",
      message: "",
      amount: "",
      keyword: "",
      timestamp: "",
      url: "",
    },
  ]);

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

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please connect with metamask.");
      const transactionContract = await getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();

      const formattedTransactions = availableTransactions.map(
        (transaction: IBlockchainTransactionTypes) => ({
          addressFrom: transaction.sender,
          addressTo: transaction.receiver,
          message: transaction.message,
          keyword: transaction.keyword,
          timestamp: new Date(
            parseInt(transaction.timestamp) * 1000
          ).toLocaleString(),
          amount: formatUnits(transaction.amount, "gwei").toString(),
          url: "https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif",
        })
      );
      setTransactions(formattedTransactions);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object found.");
    }
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

        await getAllTransactions();
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object found.");
    }
  };

  const checkIfTransactionExits = async () => {
    try {
      const transactionContract = await getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
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

      // Setting the loading state to true for processing the transaction
      setIsLoading(true);
      // console.log(`Loading - ${transactionHash.hash}`);
      await transactionContract.waitForDeployment();
      setIsLoading(false);
      // console.log(`Success - ${transactionHash.hash}`);

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
    checkIfTransactionExits();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        formDataHandleChange,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
