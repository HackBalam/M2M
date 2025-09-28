import { AuthProvider } from "@reown/appkit-auth-ethers-react-native";
import {
  createAppKit,
  defaultConfig,
} from '@reown/appkit-ethers-react-native';
import "@walletconnect/react-native-compat";

// Get projectId from environment variables
const projectId = "c39e06f90add2c9efc1b766132cd5531";

// App metadata configuration
const metadata = {
  name: "M2M",
  description: "M2M App",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "M2M://",
  },
};

// Enable social login onboarding
const authProvider = new AuthProvider({ projectId, metadata });
const config = defaultConfig({
  metadata,
  extraConnectors: [authProvider],
});

// Define blockchain networks
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com",
};

const binance = {
  chainId: 56,
  name: "BSC Mainnet",
  currency: "BNB",
  explorerUrl: "https://bscscan.com/",
  rpcUrl: "https://bsc-dataseed.bnbchain.org"
};

const chains = [mainnet, polygon, binance];

// Track if AppKit has been initialized to prevent double initialization
let isAppKitInitialized = false;

// Initialize AppKit
export const initializeReownAppKit = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isAppKitInitialized) {
      console.log('Reown AppKit already initialized, skipping...');
      resolve();
      return;
    }

    try {
      createAppKit({
        projectId,
        metadata,
        chains,
        config,
        features: {
          email: true,
          socials: ["x", "discord", "apple"],
          emailShowWallets: true,
          swaps: true,
          onramp: true
        },
      });

      isAppKitInitialized = true;
      console.log('Reown AppKit initialized successfully');
      resolve();
    } catch (error) {
      console.error('Error initializing Reown AppKit:', error);
      reject(error);
    }
  });
};

export { chains, config, metadata, projectId };
