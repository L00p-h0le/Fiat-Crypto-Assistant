import React from 'react';

interface BalanceCardProps {
    ethBalance: string;
    usdcBalance: string;
    loading: boolean;
    onRefresh: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
    ethBalance,
    usdcBalance,
    loading,
    onRefresh
}) => {

    // Helper to format display (e.g. 4 decimal places)
    const formatDisplay = (val: string) => {
        const num = parseFloat(val);
        if (isNaN(num)) return "0.0000";
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        });
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 border border-gray-700 w-full animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-200">Balances</h2>
                <button
                    onClick={onRefresh}
                    disabled={loading}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">ETH (Sepolia)</p>
                    <p className="text-xl font-mono font-semibold text-white">
                        {loading ? '...' : formatDisplay(ethBalance)} <span className="text-xs text-gray-500">ETH</span>
                    </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">USDC</p>
                    <p className="text-xl font-mono font-semibold text-white">
                        {loading ? '...' : formatDisplay(usdcBalance)} <span className="text-xs text-gray-500">USDC</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BalanceCard;
