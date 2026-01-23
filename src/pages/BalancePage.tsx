import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface BalancePageProps {
    account: string | null;
    ethBalance: string;
    usdcBalance: string;
    loading: boolean;
    onRefresh: () => void;
    onDisconnect: () => void;
    prices?: {
        ethInr: number;
        usdcInr: number;
    };
}

export default function BalancePage({
    account,
    ethBalance,
    usdcBalance,
    loading,
    onRefresh,
    onDisconnect,
    prices
}: BalancePageProps) {
    const navigate = useNavigate();

    const getEthInr = () => {
        if (!prices?.ethInr || !ethBalance) return '0';
        const value = parseFloat(ethBalance) * prices.ethInr;
        return value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    };

    const getUsdcInr = () => {
        if (!prices?.usdcInr || !usdcBalance) return '0';
        const value = parseFloat(usdcBalance) * prices.usdcInr;
        return value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    };

    const getEthWidth = () => {
        // Calculate width percentage (example: if ETH balance is higher)
        return '66%';
    };

    const getUsdcWidth = () => {
        return '33%';
    };

    return (
        <div className="min-h-screen bg-premium-black text-white geometric-bg">
            <Navbar variant="authenticated" account={account} onDisconnect={onDisconnect} />

            <main className="flex flex-1 justify-center py-20">
                <div className="flex flex-col max-w-[1000px] flex-1 px-8">
                    {/* Header */}
                    <div className="flex flex-col gap-6 mb-24 text-center items-center">
                        <h1 className="font-serif text-5xl md:text-6xl tracking-tight leading-tight premium-gradient-text uppercase">
                            Portfolio Balances
                        </h1>
                        <div className="w-12 h-px accent-bar"></div>
                        <p className="text-white/40 text-sm tracking-[0.1em] max-w-lg uppercase font-light">
                            Overview of your multi-chain assets and historical valuations.
                        </p>
                    </div>

                    {/* Token List */}
                    <div className="grid grid-cols-1 gap-0">
                        {/* Ethereum Card */}
                        <div className="stat-card p-10 group cursor-pointer">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-8">
                                    {/* Token Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="size-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden">
                                                <svg className="w-10 h-10 brightness-125" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                                                </svg>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-premium-black flex items-center justify-center border border-white/20">
                                                <div className="size-2 rounded-full accent-bar"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-3xl text-white tracking-wide uppercase">Ethereum</h3>
                                            <span className="text-white/30 text-xs tracking-[0.2em] font-mono uppercase">Mainnet Node</span>
                                        </div>
                                    </div>

                                    {/* Balance with Progress */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/50 text-sm font-light tracking-widest uppercase font-mono">
                                            {loading ? '...' : parseFloat(ethBalance).toFixed(8)} ETH
                                        </span>
                                        <div className="w-24 h-[2px] bg-white/5 overflow-hidden">
                                            <div className="h-full accent-bar" style={{ width: getEthWidth() }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Info */}
                                <div className="text-right">
                                    <div className="font-serif text-5xl text-white tracking-tighter mb-2">
                                        ₹{loading ? '...' : getEthInr()}
                                    </div>
                                    <div className="flex items-center justify-end gap-2 text-premium-accent-pink font-mono text-sm tracking-widest">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                        </svg>
                                        +2.45%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* USD Coin Card */}
                        <div className="stat-card p-10 group cursor-pointer">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-8">
                                    {/* Token Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="size-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden">
                                                <svg className="w-10 h-10 brightness-125" viewBox="0 0 32 32">
                                                    <circle cx="16" cy="16" r="16" fill="#2775CA" />
                                                    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm6.5-12.846c0-2.523-1.576-3.948-5.263-4.836v-4.44c1.14.234 2.231.729 3.298 1.496l1.359-2.196a9.49 9.49 0 00-4.657-1.777V6h-2.109v1.355c-3.157.257-5.128 1.947-5.128 4.339 0 2.391 1.678 3.816 5.128 4.573v4.88c-1.678-.234-3.093-.936-4.292-2.109L9 20.905c1.444 1.303 3.328 2.062 5.891 2.304V24.5h2.109v-1.342c3.298-.257 5.5-1.947 5.5-4.573v-.131zm-9.473-6.078c0-1.059.807-1.777 2.155-1.947v3.947c-1.297-.444-2.155-1.034-2.155-2zm4.264 10.123v-4.235c1.434.468 2.292 1.109 2.292 2.168 0 1.109-.858 1.88-2.292 2.067z" fill="white" />
                                                </svg>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-premium-black flex items-center justify-center border border-white/20">
                                                <div className="size-2 rounded-full bg-white/40"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-3xl text-white tracking-wide uppercase">USD Coin</h3>
                                            <span className="text-white/30 text-xs tracking-[0.2em] font-mono uppercase">Stable Reserve</span>
                                        </div>
                                    </div>

                                    {/* Balance with Progress */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/50 text-sm font-light tracking-widest uppercase font-mono">
                                            {loading ? '...' : parseFloat(usdcBalance).toFixed(2)} USDC
                                        </span>
                                        <div className="w-24 h-[2px] bg-white/5 overflow-hidden">
                                            <div className="h-full accent-bar" style={{ width: getUsdcWidth() }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Info */}
                                <div className="text-right">
                                    <div className="font-serif text-5xl text-white tracking-tighter mb-2">
                                        ₹{loading ? '...' : getUsdcInr()}
                                    </div>
                                    <div className="text-white/40 font-mono text-sm tracking-widest">
                                        $1.00 PEGGED
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transfer Button Section */}
                    <div className="mt-20 flex flex-col items-center justify-center text-center gap-6">
                        <button
                            onClick={() => navigate('/transfer')}
                            className="flex min-w-[240px] items-center justify-center h-14 bg-white text-black font-bold uppercase tracking-[0.3em] text-[11px] hover:invert transition-all"
                        >
                            Transfer Funds
                        </button>

                        {/* Refresh */}
                        <button
                            onClick={onRefresh}
                            disabled={loading}
                            className="flex items-center gap-3 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all disabled:opacity-50"
                        >
                            <svg className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {loading ? 'Synchronizing...' : 'Refresh Balances'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
