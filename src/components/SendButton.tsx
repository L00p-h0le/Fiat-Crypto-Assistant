import React from 'react';

interface SendButtonProps {
    onClick: () => void;
    disabled: boolean;
    loading: boolean;
    label: string;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick, disabled, loading, label }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                w-full mt-6 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95
                ${disabled
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25'}
                ${loading ? 'cursor-wait opacity-90' : ''}
            `}
        >
            {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    <span>Confirming...</span>
                </div>
            ) : (
                label
            )}
        </button>
    );
};

export default SendButton;
