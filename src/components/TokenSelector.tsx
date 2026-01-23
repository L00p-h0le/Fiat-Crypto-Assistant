import React from 'react';

interface TokenSelectorProps {
    selectedToken: 'ETH' | 'USDC';
    onSelect: (token: 'ETH' | 'USDC') => void;
    disabled?: boolean;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ selectedToken, onSelect, disabled }) => {
    return (
        <div className="w-full">
            <label className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase block mb-4">
                Select Token
            </label>
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => onSelect('ETH')}
                    disabled={disabled}
                    className={`
                        h-14 px-8 font-bold text-xs uppercase tracking-[0.2em] transition-all
                        ${selectedToken === 'ETH'
                            ? 'bg-white text-black'
                            : 'border border-white/20 text-white hover:bg-white hover:text-black'}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    ETH
                </button>
                <button
                    onClick={() => onSelect('USDC')}
                    disabled={disabled}
                    className={`
                        h-14 px-8 font-bold text-xs uppercase tracking-[0.2em] transition-all
                        ${selectedToken === 'USDC'
                            ? 'bg-white text-black'
                            : 'border border-white/20 text-white hover:bg-white hover:text-black'}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    USDC
                </button>
            </div>
        </div>
    );
};

export default TokenSelector;
