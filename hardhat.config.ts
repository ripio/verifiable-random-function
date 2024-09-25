import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import accountUtils from "./utils/accountUtils";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const {
  LACHAIN_EXPLORER_API_URL,
  LACHAIN_EXPLORER_URL,
  LACHAIN_RPC_URL,
  LATESTNET_EXPLORER_API_URL,
  LATESTNET_EXPLORER_URL,
  LATESTNET_RPC_URL,
  REPORT_GAS,
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "latestnet",
  networks: {
    lachain: {
      url: LACHAIN_RPC_URL,
      accounts: accountUtils.getAccounts(),
      chainId: 274,
      gasPrice: 1000000007,
    },
    latestnet: {
      url: LATESTNET_RPC_URL,
      accounts: accountUtils.getAccounts(),
      chainId: 418,
      gasPrice: 1000000007,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      lachain: "abc",
      latestnet: "abc",
    },
    customChains: [
      {
        network: "lachain",
        urls: {
          apiURL: LACHAIN_EXPLORER_API_URL!,
          browserURL: LACHAIN_EXPLORER_URL!,
        },
        chainId: 274,
      },
      {
        network: "latestnet",
        urls: {
          apiURL: LATESTNET_EXPLORER_API_URL!,
          browserURL: LATESTNET_EXPLORER_URL!,
        },
        chainId: 418,
      },
    ],
  },
};

export default config;
