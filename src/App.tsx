import { useState, useEffect } from 'react';
import { useWallet } from './hooks/useWallet';
import { useBalances } from './hooks/useBalances';
import { usePrices } from './hooks/usePrices';
import { useGasEstimate } from './hooks/useGasEstimate';
import { useSendTx } from './hooks/useSendTx';
import WalletConnect from './components/WalletConnect';
import BalanceCard from './components/BalanceCard';
import CurrencyInput from './components/CurrencyInput';
import TokenSelector from './components/TokenSelector';
import GasEstimate from './components/GasEstimate';
import TxSummary from './components/TxSummary';
import SendButton from './components/SendButton';
import { isAddress } from 'ethers';

function App() {
  const { account, chainId, provider, error, isConnecting, connectWallet, switchNetwork, disconnectWallet } = useWallet();
  const { ethBalance, usdcBalance, loading: balancesLoading, refreshBalances } = useBalances(provider, account, chainId);
  const { prices, loading: pricesLoading, error: priceError } = usePrices();

  // Step 3 State
  const [inrAmount, setInrAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<'ETH' | 'USDC'>('ETH');

  // Step 6 State: Recipient
  const [recipient, setRecipient] = useState<string>('');

  // Step 4: Gas Estimate
  const {
    estimatedGas,
    gasPrice,
    costEth: gasCostEth,
    costInr: gasCostInr,
    costToken: gasCostToken,
    loading: gasLoading,
    error: gasError
  } = useGasEstimate(provider, account, selectedToken, prices?.ethInr, prices?.usdcInr);

  // Step 6: Transaction Hook
  const { sendTransaction, status: txStatus, txHash, error: txError, reset: resetTx } = useSendTx(provider, account, selectedToken);

  // Reset INR amount when account disconnects or changes
  useEffect(() => {
    setInrAmount('');
    setRecipient(''); // Clear recipient too
    setSelectedToken('ETH'); // Optional: reset token choice too for a fresh state
    resetTx();
  }, [account, resetTx]);

  // Conversion Logic
  const getEstimatedCrypto = () => {
    if (!prices || !inrAmount) return '0.00';
    const amount = parseFloat(inrAmount);
    if (isNaN(amount) || amount <= 0) return '0.00';

    const rate = selectedToken === 'ETH' ? prices.ethInr : prices.usdcInr;
    if (!rate) return '0.00';

    const estimate = amount / rate;
    return estimate.toFixed(6); // 6 decimal places
  };

  const handleSend = () => {
    const cryptoAmount = getEstimatedCrypto();
    if (cryptoAmount === '0.00') return;
    sendTransaction(recipient, cryptoAmount);
  };

  const isFormValid = () => {
    const amount = parseFloat(inrAmount);
    return (
      !isNaN(amount) &&
      amount > 0 &&
      isAddress(recipient) &&
      !pricesLoading &&
      !gasLoading &&
      txStatus !== 'pending'
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Fiat Crypto Assistant
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Send ETH or USDC with INR estimation
          </p>
        </div>

        <WalletConnect
          connectWallet={connectWallet}
          switchNetwork={switchNetwork}
          disconnectWallet={disconnectWallet}
          account={account}
          isConnecting={isConnecting}
          error={error}
          chainId={chainId}
        />

        {account && chainId === 11155111 && (
          <>
            <BalanceCard
              ethBalance={ethBalance}
              usdcBalance={usdcBalance}
              loading={balancesLoading}
              onRefresh={refreshBalances}
            />

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 animate-fade-in-up">
              <h2 className="text-lg font-bold text-gray-200 mb-4">Transfer Details</h2>

              {/* Price Error */}
              {priceError && (
                <div className="mb-4 text-xs text-red-400 bg-red-900/30 p-2 rounded">
                  Price Error: {priceError}
                </div>
              )}

              {/* Recipient Input */}
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded p-3 text-sm font-mono focus:border-blue-500 focus:outline-none"
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  disabled={txStatus === 'pending'}
                />
              </div>

              <CurrencyInput
                amount={inrAmount}
                onChange={setInrAmount}
                disabled={pricesLoading || txStatus === 'pending'}
              />

              <TokenSelector
                selectedToken={selectedToken}
                onSelect={setSelectedToken}
                disabled={pricesLoading || txStatus === 'pending'}
              />

              <div className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-400 text-sm">Estimated Receive:</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {pricesLoading ? '...' : getEstimatedCrypto()}
                  </p>
                  <p className="text-xs text-blue-400 font-bold">{selectedToken}</p>
                </div>
              </div>

              <GasEstimate
                estimatedGas={estimatedGas}
                gasPrice={gasPrice}
                costEth={gasCostEth}
                costInr={gasCostInr}
                costToken={gasCostToken}
                selectedToken={selectedToken}
                loading={gasLoading}
                error={gasError}
              />

              <TxSummary
                inrAmount={inrAmount}
                cryptoAmount={getEstimatedCrypto()}
                selectedToken={selectedToken}
                gasCostInr={gasCostInr}
                gasCostEth={gasCostEth}
              />

              {/* Transaction Error */}
              {txError && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm text-center">
                  {txError}
                </div>
              )}

              {/* Transaction Success */}
              {txStatus === 'success' && txHash && (
                <div className="mt-4 p-3 bg-green-900/50 border border-green-500 rounded text-green-200 text-sm text-center">
                  <p className="font-bold">Transaction Successful!</p>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline mt-1 block hover:text-blue-200"
                  >
                    View on Explorer
                  </a>
                  <button
                    onClick={resetTx}
                    className="mt-2 text-xs bg-green-700 px-2 py-1 rounded hover:bg-green-600"
                  >
                    Send Another
                  </button>
                </div>
              )}

              {/* Send Button */}
              {txStatus !== 'success' && (
                <SendButton
                  onClick={handleSend}
                  disabled={!isFormValid()}
                  loading={txStatus === 'pending'}
                  label={inrAmount ? `Send ₹${inrAmount}` : 'Enter Amount'}
                />
              )}
            </div>
          </>
        )}

        {account && chainId !== 11155111 && (
          <div className="text-center text-yellow-500 bg-yellow-900/20 p-4 rounded-lg border border-yellow-700">
            Please switch to Sepolia.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
