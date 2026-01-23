interface TransferDetailsProps {
    recipient: string;
    amount: string;
    currency: 'USD' | 'INR';
    cryptoAmount: string;
    selectedToken: 'ETH' | 'USDC';
    gasCostEth?: string;
    gasCostInr?: string;
    estimatedArrival?: string;
}

export default function TransferDetails({
    recipient,
    amount,
    currency,
    cryptoAmount,
    selectedToken,
    gasCostEth = '0.00',
    gasCostInr = '0',
    estimatedArrival = '2-5 minutes'
}: TransferDetailsProps) {
    const getCurrencySymbol = () => {
        return currency === 'INR' ? '₹' : '$';
    };

    const formatRecipient = (addr: string) => {
        if (!addr || addr.length < 10) return addr;
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const getTotalInr = () => {
        const amountValue = parseFloat(amount) || 0;
        const gasValue = parseFloat(gasCostInr) || 0;
        return (amountValue + gasValue).toLocaleString('en-IN', { maximumFractionDigits: 0 });
    };

    return (
        <div className="bg-premium-card/50 backdrop-blur-md border border-premium-border rounded p-10 h-full">
            <h3 className="font-serif text-3xl mb-10 tracking-wide uppercase premium-gradient-text">Transfer Details</h3>

            <div className="space-y-8">
                {/* Recipient */}
                <div>
                    <label className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase block mb-3">Recipient</label>
                    <div className="bg-white/[0.03] border border-white/10 rounded p-4 font-mono text-sm text-white/80">
                        {recipient ? formatRecipient(recipient) : (
                            <span className="text-white/30">No address entered</span>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5"></div>

                {/* Amount Breakdown */}
                <div>
                    <label className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase block mb-4">Amount Breakdown</label>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-white/40 text-xs tracking-widest uppercase font-light">Transfer Amount</span>
                            <div className="text-right">
                                <p className="font-serif text-xl font-semibold">{getCurrencySymbol()}{amount || '0.00'}</p>
                                <p className="text-[10px] text-white/40 font-mono tracking-wide">{cryptoAmount} {selectedToken}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-white/40 text-xs tracking-widest uppercase font-light">Network Fee</span>
                            <div className="text-right">
                                <p className="font-serif text-xl font-semibold text-premium-accent-pink">₹{gasCostInr}</p>
                                <p className="text-[10px] text-white/40 font-mono tracking-wide">{gasCostEth} ETH</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5"></div>

                {/* Total */}
                <div className="flex justify-between items-center">
                    <span className="text-white/60 font-bold text-xs tracking-[0.2em] uppercase">Total Cost</span>
                    <div className="text-right">
                        <p className="font-serif text-4xl font-bold text-white tracking-tighter">₹{getTotalInr()}</p>
                        <p className="text-[10px] text-white/30 tracking-wide uppercase">Including fees</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5"></div>

                {/* Estimated Arrival */}
                <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs tracking-widest uppercase font-light">Estimated Arrival</span>
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-mono tracking-wide text-green-400">{estimatedArrival}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
