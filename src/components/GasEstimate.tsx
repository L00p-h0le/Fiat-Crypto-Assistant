import React from 'react';

interface GasEstimateProps {
    estimatedGas: string | null;
    gasPrice: string | null;
    costEth: string | null;
    costInr: string | null;
    costToken: string | null;
    selectedToken: 'ETH' | 'USDC';
    loading: boolean;
    error: string | null;
}

const GasEstimate: React.FC<GasEstimateProps> = ({
    estimatedGas,
    gasPrice,
    costEth,
    costInr,
    costToken,
    selectedToken,
    loading,
    error
}) => {
    if (loading) {
        return (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-4 text-xs text-red-400 bg-red-900/20 p-2 rounded">
                Gas Error: {error}
            </div>
        );
    }

    if (!costEth) return null;

    return (
        <div className="mt-6 mb-2">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm font-bold">Estimated Network Fee</h3>
                <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                    ~{gasPrice} Gwei
                </span>
            </div>

            <div className="bg-gray-700/30 p-3 rounded-lg flex justify-between items-center border border-gray-600/50">
                <div className="flex flex-col">
                    <span className="text-white font-mono">{costEth} ETH</span>
                    {costToken && selectedToken === 'USDC' && (
                        <span className="text-xs text-blue-300">
                            ~ {costToken} USDC
                        </span>
                    )}
                    <span className="text-xs text-gray-500 mt-1">Gas Limit: {estimatedGas}</span>
                </div>
                <div className="text-right">
                    <span className="text-green-400 font-bold text-lg">₹ {costInr}</span>
                </div>
            </div>
        </div>
    );
};

export default GasEstimate;
