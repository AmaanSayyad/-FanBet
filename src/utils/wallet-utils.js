import {
  polygon,
  polygonMumbai,
  arbitrum,
  optimismSepolia,
  mantaSepoliaTestnet,
  opBNBTestnet,
  arbitrumSepolia
} from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
const UbitTestnet = {
  id: 44433,
  testnet: true,
  name: 'UBIT Testnet',
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.ubitscan.io/'],
    },
    public: {
      http: ['https://testnet-rpc.ubitscan.io/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ubit Testnet Explorer',
      url: 'https://testnet.ubitscan.io',
    },
  },
  nativeCurrency: {
    decimals: 18,
    name: 'USC',
    symbol: 'USC',
  },
};
const UbitMainnet = {
  id: 90002,
  testnet: true,
  name: 'UBIT Mainnet',
  rpcUrls: {
    default: {
      http: ['https://rpc.ubitscan.io/'],
    },
    public: {
      http: ['https://rpc.ubitscan.io/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ubit Mainnet Explorer',
      url: 'https://ubitscan.io',
    },
  },
  nativeCurrency: {
    decimals: 18,
    name: 'USC',
    symbol: 'USC',
  },
};

const { chains, publicClient } = configureChains(
  [polygon, arbitrum, UbitTestnet, UbitMainnet,arbitrumSepolia],
  [
    jsonRpcProvider({
      rpc: (chainId) => {
        if (chainId.id == 137) {
          return {
            http: 'https://polygon-mainnet.g.alchemy.com/v2/ZLSEk8HyDPO8GF7NmrIZpRxxxKAY1zgr',
            webSocket:
              'wss://polygon-mainnet.g.alchemy.com/v2/ZLSEk8HyDPO8GF7NmrIZpRxxxKAY1zgr',
          };
        } else if (chainId.id == 42161) {
          return {
            http: 'https://arb-mainnet.g.alchemy.com/v2/eCm1C8c0ke-nbr-n7sZ9S_UUovDTlTV6',
            webSocket:
              'wss://arb-mainnet.g.alchemy.com/v2/eCm1C8c0ke-nbr-n7sZ9S_UUovDTlTV6',
          };
        } else if (chainId.id == 80001) {
          return {
            http: 'https://polygon-mumbai.g.alchemy.com/v2/EaKu789oxhWzYFvzEzOPAkCqIl2CwKj5',
            webSocket:
              'wss://polygon-mumbai.g.alchemy.com/v2/EaKu789oxhWzYFvzEzOPAkCqIl2CwKj5',
          };
        } else if (chainId.id == 11155420) {
          return {
            http: 'https://sepolia.optimism.io',
            webSocket:
              'wss://polygon-mumbai.g.alchemy.com/v2/EaKu789oxhWzYFvzEzOPAkCqIl2CwKj5',
          };
        } else if (chainId.id == 3441006) {
          return {
            http: 'https://pacific-rpc.sepolia-testnet.manta.network/http',
            webSocket: '',
          };
        } else if (chainId.id == 5611) {
          return {
            http: 'https://opbnb-testnet-rpc.bnbchain.org',
            webSocket: '',
          };
        } else if (chainId.id == 44433) {
          return {
            http: 'https://testnet-rpc.ubitscan.io/',
            webSocket: '',
          };
        } else if (chainId.id == 90002) {
          return {
            http: 'https://rpc.ubitscan.io/',
            webSocket: '',
          };
        }else if (chainId.id == 421614) {
          return {
            http: 'https://sepolia-rollup.arbitrum.io/rpc',
            webSocket: '',
          };
        }
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Reels-Fi',
  projectId: '87106bd465234d097b8a51ba585bf799',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains };
