import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import App from './App'; // Assuming your main app component is in App.tsx
import '@mysten/dapp-kit/dist/index.css';
import './index.css'; // Your existing global CSS

const queryClient = new QueryClient();

// Use the OneChain Testnet RPC you found
const networks = {
  onechainTestnet: { url: 'https://rpc-testnet.onelabs.cc:443' },
  // Add other networks if needed, like local
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="onechainTestnet">
        <WalletProvider autoConnect>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
