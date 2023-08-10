import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/_44Nw1D11eK9ggK5uZaJVj8fMNJSX5E4",
      accounts: [
        "4ab78f69b7293a6c45e4e8a635a027909809d005a8e651bee5fefd0e3da01730",
      ],
    },
  },
};

export default config;
