import React from 'react';

interface CurrencyInputProps {
    amount: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ amount, onChange, disabled }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow only positive numbers and decimals
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            onChange(value);
        }
    };

    return (
        <div className="w-full mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">
                Amount (INR)
            </label>
            <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 font-bold">₹</span>
                <input
                    type="text"
                    value={amount}
                    onChange={handleChange}
                    disabled={disabled}
                    placeholder="200"
                    className="w-full bg-gray-800 border-2 border-gray-700 text-white font-bold py-3 pl-8 pr-4 rounded-lg focus:outline-none focus:border-blue-500 hover:border-gray-600 transition-colors placeholder-gray-600 text-lg"
                />
            </div>
        </div>
    );
};

export default CurrencyInput;
