import React from 'react';

interface TxSummaryProps {
    inrAmount: string;
    cryptoAmount: string;
    selectedToken: 'ETH' | 'USDC';
    gasCostInr: string | null;
    gasCostEth: string | null;
}

const TxSummary: React.FC<TxSummaryProps> = ({
    inrAmount,
    cryptoAmount,
    selectedToken,
    gasCostInr,
    gasCostEth
}) => {
    // Helper to format currency
    const formatINR = (val: string) => {
        const num = parseFloat(val);
        if (isNaN(num)) return '0.00';
        return num.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        });
    };

    const transferAmountNum = parseFloat(inrAmount) || 0;
    const gasCostNum = parseFloat(gasCostInr || '0') || 0;
    const totalCost = transferAmountNum + gasCostNum;

    if (transferAmountNum <= 0) return null;

    return (
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-inner">
            <h3 className="text-gray-300 font-bold mb-4 border-b border-gray-700 pb-2">Transaction Summary</h3>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Transfer Amount</span>
                    <div className="text-right">
                        <span className="block text-white font-medium">{formatINR(inrAmount)}</span>
                        <span className="block text-xs text-blue-400">
                            ≈ {cryptoAmount} {selectedToken}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Estimated Network Fee</span>
                    <div className="text-right">
                        <span className="block text-white font-medium">
                            {gasCostInr ? formatINR(gasCostInr) : '...'}
                        </span>
                        {gasCostEth && (
                            <span className="block text-xs text-gray-500">
                                {gasCostEth} ETH
                            </span>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-700 my-2 pt-2 flex justify-between items-center">
                    <span className="text-gray-200 font-bold">Total Cost</span>
                    <span className="text-xl font-bold text-green-400">
                        {formatINR(totalCost.toString())}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TxSummary;
