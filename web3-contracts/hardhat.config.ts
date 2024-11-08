require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();
const { PRIVATE_KEY, BSC_API_KEY } = process.env;
const config = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: ' http://127.0.0.1:8545/',
    },
    hardhat: {},
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [PRIVATE_KEY],
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: [PRIVATE_KEY],
    },
    opBnb: {
      url: 'https://opbnb-testnet-rpc.bnbchain.org',
      accounts: [PRIVATE_KEY],
    },
    ubitTestnet: {
      url: 'https://testnet-rpc.ubitscan.io/',
      accounts: [PRIVATE_KEY],
    },
    ubitMainnet: {
      url: 'https://rpc.ubitscan.io/',
      accounts: [PRIVATE_KEY],
    },
    arbitrum: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      accounts: [PRIVATE_KEY],
    },

  },
  etherscan: {
    apiKey: {
      opBnb: BSC_API_KEY,
    },
    customChains: [
      {
        network: 'opBnb',
        chainId: 5611,
        urls: {
          apiURL: 'https://api-opbnb-testnet.bscscan.com/api',
          browserURL: 'https://opbnb-testnet.bscscan.com/',
        },
      },
      {
        network: 'ubitTestnet',
        chainId: 44433,
        urls: {
          apiURL: 'https://api-opbnb-testnet.bscscan.com/api',
          browserURL: 'https://opbnb-testnet.bscscan.com/',
        },
      },
      {
        network: 'ubitMainnet',
        chainId: 90002,
        urls: {
          apiURL: 'https://api-opbnb-testnet.bscscan.com/api',
          browserURL: 'https://opbnb-testnet.bscscan.com/',
        },
      },
    ],
  },
  gasReporter: { enabled: true },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
      },
      {
        version: '0.8.16',
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'berlin',
    },
  },
  docgen: {
    output: 'docs',
    pages: () => 'api.md',
  },
  sourcify: {
    enabled: false,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};

module.exports = config;
