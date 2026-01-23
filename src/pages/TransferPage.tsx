import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AmountEntry from '../components/AmountEntry';
import TransferDetails from '../components/TransferDetails';
import TokenSelector from '../components/TokenSelector';

interface TransferPageProps {
    account: string | null;
    onDisconnect: () => void;
    sendTransaction: (recipient: string, amount: string) => Promise<void>;
    txStatus: 'idle' | 'pending' | 'success' | 'error';
    txHash?: string;
    txError?: string;
    resetTx: () => void;
    prices?: {
        ethInr: number;
        usdcInr: number;
    };
    gasCostEth?: string;
    gasCostInr?: string;
}

export default function TransferPage({
    account,
    onDisconnect,
    sendTransaction,
    txStatus,
    txHash,
    txError,
    resetTx,
    prices,
    gasCostEth = '0.00',
    gasCostInr = '0'
}: TransferPageProps) {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
    const [selectedToken, setSelectedToken] = useState<'ETH' | 'USDC'>('ETH');
    const [recipient, setRecipient] = useState('');

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getEstimatedCrypto = () => {
        if (!prices || !amount) return '0.00';
        const amountValue = parseFloat(amount);
        if (isNaN(amountValue) || amountValue <= 0) return '0.00';

        // Convert to INR first if in USD
        let inrAmount = amountValue;
        if (currency === 'USD') {
            inrAmount = amountValue * 83; // Approximate USD to INR
        }

        const rate = selectedToken === 'ETH' ? prices.ethInr : prices.usdcInr;
        if (!rate) return '0.00';

        const estimate = inrAmount / rate;
        return estimate.toFixed(6);
    };

    const getInrAmount = () => {
        if (!amount) return '0';
        const amountValue = parseFloat(amount);
        if (isNaN(amountValue)) return '0';

        if (currency === 'USD') {
            return (amountValue * 83).toFixed(2); // Approximate USD to INR
        }
        return amountValue.toFixed(2);
    };

    const handleSend = async () => {
        const cryptoAmount = getEstimatedCrypto();
        if (cryptoAmount === '0.00' || !recipient) return;

        try {
            await sendTransaction(recipient, cryptoAmount);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    const isFormValid = () => {
        const amountValue = parseFloat(amount);
        return (
            !isNaN(amountValue) &&
            amountValue > 0 &&
            recipient.length > 0 &&
            txStatus !== 'pending'
        );
    };

    return (
        <div className="min-h-screen bg-premium-black text-white geometric-bg">
            <Navbar variant="authenticated" account={account} onDisconnect={onDisconnect} />

            <main className="flex flex-1 justify-center py-16">
                <div className="flex flex-col max-w-[1400px] flex-1 px-8">
                    {/* Header */}
                    <div className="flex flex-col gap-6 mb-16 text-center items-center">
                        <h1 className="font-serif text-5xl md:text-6xl tracking-tight leading-tight premium-gradient-text uppercase">
                            Enter Payment Amount
                        </h1>
                        <div className="w-12 h-px accent-bar"></div>
                        <p className="text-white/40 text-sm tracking-[0.1em] max-w-lg uppercase font-light italic">
                            Universal liquidity, elegantly channeled to your destination.
                        </p>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Left Column - Amount Entry */}
                        <div className="space-y-6">
                            <AmountEntry
                                amount={amount}
                                onAmountChange={setAmount}
                                selectedCurrency={currency}
                                onCurrencyChange={setCurrency}
                                cryptoAmount={getEstimatedCrypto()}
                                selectedToken={selectedToken}
                                disabled={txStatus === 'pending'}
                            />

                            {/* Recipient Input */}
                            <div className="bg-premium-card/50 backdrop-blur-md border border-premium-border rounded p-8">
                                <label className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase block mb-4">
                                    Recipient Address
                                </label>
                                <input
                                    type="text"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    disabled={txStatus === 'pending'}
                                    placeholder="0x..."
                                    className="w-full bg-white/[0.03] border border-white/10 text-white rounded p-4 font-mono text-sm focus:border-premium-accent-blue focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Token Selector */}
                            <div className="bg-premium-card/50 backdrop-blur-md border border-premium-border rounded p-8">
                                <TokenSelector
                                    selectedToken={selectedToken}
                                    onSelect={setSelectedToken}
                                    disabled={txStatus === 'pending'}
                                />
                            </div>
                        </div>

                        {/* Right Column - Transfer Details */}
                        <TransferDetails
                            recipient={recipient}
                            amount={getInrAmount()}
                            currency="INR"
                            cryptoAmount={getEstimatedCrypto()}
                            selectedToken={selectedToken}
                            gasCostEth={gasCostEth}
                            gasCostInr={gasCostInr}
                        />
                    </div>

                    {/* Transaction Status */}
                    {txError && (
                        <div className="mb-8 p-6 bg-white text-center">
                            <p className="text-black text-xs tracking-[0.2em] uppercase font-bold">{txError}</p>
                        </div>
                    )}

                    {txStatus === 'success' && txHash && (
                        <div className="mb-8 p-6 bg-green-900/20 border border-green-500/30 rounded text-center">
                            <p className="text-green-200 font-bold mb-3 tracking-[0.1em] uppercase text-xs">Transaction Successful</p>
                            <a
                                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-premium-accent-blue underline hover:text-premium-accent-pink transition-colors text-xs tracking-wide"
                            >
                                View on Explorer
                            </a>
                            <div className="mt-4 flex justify-center gap-4">
                                <button
                                    onClick={resetTx}
                                    className="px-6 h-10 border border-white/20 text-white hover:bg-white hover:text-black tracking-[0.2em] text-[10px] font-bold uppercase transition-all"
                                >
                                    Send Another
                                </button>
                                <button
                                    onClick={() => navigate('/balance')}
                                    className="px-6 h-10 border border-white/20 text-white hover:bg-white hover:text-black tracking-[0.2em] text-[10px] font-bold uppercase transition-all"
                                >
                                    Back to Balance
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {txStatus !== 'success' && (
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => navigate('/balance')}
                                className="px-8 h-14 border border-white/20 text-white hover:bg-white hover:text-black tracking-[0.2em] text-[10px] font-bold uppercase transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={!isFormValid()}
                                className="flex min-w-[280px] items-center justify-center gap-3 h-14 bg-white text-black font-bold uppercase tracking-[0.3em] text-[11px] hover:invert transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:invert-0"
                            >
                                {txStatus === 'pending' ? (
                                    <>
                                        <div className="size-3 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                        <span>Processing</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Initiate Transaction</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
