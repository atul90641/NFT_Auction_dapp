import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";
require('dotenv').config();


const RECOVERY_PHRASE =  process.env.RECOVERY_PHRASE;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.7.0",

  networks: {
    fuji: {
      url: "https://avalanche-fuji-c-chain.publicnode.com",

      accounts: {
        mnemonic: RECOVERY_PHRASE,
      },
    },
  },
};

export default config;
