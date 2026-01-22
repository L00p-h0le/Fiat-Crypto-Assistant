import React from 'react';

interface TokenSelectorProps {
    selectedToken: 'ETH' | 'USDC';
    onSelect: (token: 'ETH' | 'USDC') => void;
    disabled?: boolean;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ selectedToken, onSelect, disabled }) => {
    return (
        <div className="w-full mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2">
                Select Token
            </label>
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => onSelect('ETH')}
                    disabled={disabled}
                    className={`
                        py-3 px-4 rounded-lg font-bold border-2 transition-all flex items-center justify-center space-x-2
                        ${selectedToken === 'ETH'
                            ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    <span>ETH</span>
                </button>
                <button
                    onClick={() => onSelect('USDC')}
                    disabled={disabled}
                    className={`
                        py-3 px-4 rounded-lg font-bold border-2 transition-all flex items-center justify-center space-x-2
                        ${selectedToken === 'USDC'
                            ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    <span>USDC</span>
                </button>
            </div>
        </div>
    );
};

export default TokenSelector;
