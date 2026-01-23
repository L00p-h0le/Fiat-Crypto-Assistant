import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useWallet } from './hooks/useWallet';
import { useBalances } from './hooks/useBalances';
import { usePrices } from './hooks/usePrices';
import { useGasEstimate } from './hooks/useGasEstimate';
import { useSendTx } from './hooks/useSendTx';
import LandingPage from './pages/LandingPage';
import BalancePage from './pages/BalancePage';
import TransferPage from './pages/TransferPage';
import { useState } from 'react';

function App() {
  const { account, chainId, provider, error, isConnecting, connectWallet, switchNetwork, disconnectWallet } = useWallet();
  const { ethBalance, usdcBalance, loading: balancesLoading, refreshBalances } = useBalances(provider, account, chainId);
  const { prices, loading: pricesLoading, error: priceError } = usePrices();

  const [selectedToken, setSelectedToken] = useState<'ETH' | 'USDC'>('ETH');

  // Gas Estimate
  const {
    estimatedGas,
    gasPrice,
    costEth: gasCostEth,
    costInr: gasCostInr,
    costToken: gasCostToken,
    loading: gasLoading,
    error: gasError
  } = useGasEstimate(provider, account, selectedToken, prices?.ethInr, prices?.usdcInr);

  // Transaction Hook
  const { sendTransaction, status: txStatus, txHash, error: txError, reset: resetTx } = useSendTx(provider, account, selectedToken);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <LandingPage
              onConnectWallet={connectWallet}
              account={account}
              isConnecting={isConnecting}
              chainId={chainId}
            />
          }
        />

        {/* Balance Page - Protected */}
        <Route
          path="/balance"
          element={
            account && chainId === 11155111 ? (
              <BalancePage
                account={account}
                ethBalance={ethBalance}
                usdcBalance={usdcBalance}
                loading={balancesLoading}
                onRefresh={refreshBalances}
                onDisconnect={disconnectWallet}
                prices={prices}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Transfer Page - Protected */}
        <Route
          path="/transfer"
          element={
            account && chainId === 11155111 ? (
              <TransferPage
                account={account}
                onDisconnect={disconnectWallet}
                sendTransaction={sendTransaction}
                txStatus={txStatus}
                txHash={txHash}
                txError={txError}
                resetTx={resetTx}
                prices={prices}
                gasCostEth={gasCostEth}
                gasCostInr={gasCostInr}
                gasCostToken={gasCostToken}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>


      {/* Connection Error */}
      {error && !isConnecting && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-900/90 backdrop-blur-md border border-red-600 px-8 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <p className="text-red-200 font-semibold mb-2">Connection Error</p>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
    </Router>
  );
}

export default App;
