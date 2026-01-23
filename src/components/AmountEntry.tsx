interface AmountEntryProps {
    amount: string;
    onAmountChange: (value: string) => void;
    selectedCurrency: 'USD' | 'INR';
    onCurrencyChange: (currency: 'USD' | 'INR') => void;
    cryptoAmount: string;
    selectedToken: 'ETH' | 'USDC';
    disabled?: boolean;
}

export default function AmountEntry({
    amount,
    onAmountChange,
    selectedCurrency,
    onCurrencyChange,
    cryptoAmount,
    selectedToken,
    disabled = false
}: AmountEntryProps) {
    const getCurrencySymbol = () => {
        return selectedCurrency === 'INR' ? '₹' : '$';
    };

    return (
        <div className="bg-premium-card/50 backdrop-blur-md border border-premium-border rounded p-10">
            {/* Currency Selector */}
            <div className="flex justify-center gap-3 mb-12">
                <button
                    onClick={() => onCurrencyChange('USD')}
                    disabled={disabled}
                    className={`px-8 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${selectedCurrency === 'USD'
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/10'
                        }`}
                >
                    USD
                </button>
                <button
                    onClick={() => onCurrencyChange('INR')}
                    disabled={disabled}
                    className={`px-8 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${selectedCurrency === 'INR'
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/10'
                        }`}
                >
                    INR
                </button>
            </div>

            {/* Amount Display */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4">
                    <span className="font-serif text-4xl text-white/30">{getCurrencySymbol()}</span>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9.]/g, '');
                            onAmountChange(val);
                        }}
                        disabled={disabled}
                        className="font-serif text-5xl md:text-6xl font-bold bg-transparent border-none outline-none text-center w-full max-w-md text-white tracking-tighter placeholder:text-white/20 caret-white"
                        style={{ caretColor: 'white' }}
                        placeholder="0"
                    />
                </div>
            </div>

            {/* Crypto Conversion */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 text-white/50 font-mono text-sm tracking-widest">
                    <span className="text-premium-accent-blue">₿</span>
                    <span>= {cryptoAmount} {selectedToken}</span>
                </div>
            </div>

            {/* Message */}
            <div className="text-center space-y-2">
                <p className="text-white/60 text-xs tracking-[0.15em] uppercase font-light">
                    You pay in fiat, we handle the crypto.
                </p>
                <p className="text-white/30 text-[10px] tracking-[0.1em] uppercase font-light">
                    Real-time settlement via institutional liquidity pools.
                </p>
            </div>
        </div>
    );
}
