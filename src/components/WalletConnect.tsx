import React from 'react';

interface WalletConnectProps {
    connectWallet: () => void;
    switchNetwork: () => void;
    disconnectWallet: () => void;
    account: string | null;
    isConnecting: boolean;
    error: string | null;
    chainId: number | null;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
    connectWallet,
    switchNetwork,
    disconnectWallet,
    account,
    isConnecting,
    error,
    chainId
}) => {
    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const isWrongNetwork = chainId !== 11155111; // Hardcoded for now, or import constant

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 border border-gray-700">
            <div className="flex flex-col items-center justify-center space-y-4">
                {account ? (
                    <div className="text-center w-full">
                        <div className="flex items-center space-x-2 mb-2 justify-center">
                            <div className={`w-3 h-3 rounded-full animate-pulse ${isWrongNetwork ? 'bg-red-500' : 'bg-green-500'}`}></div>
                            <p className={`${isWrongNetwork ? 'text-red-400' : 'text-green-400'} font-semibold`}>
                                {isWrongNetwork ? 'Wrong Network' : 'Connected'}
                            </p>
                        </div>

                        <div className="flex items-center justify-center space-x-2 mt-2">
                            <p className="text-xl font-mono text-white bg-gray-700 px-4 py-2 rounded">
                                {formatAddress(account)}
                            </p>
                            <button
                                onClick={disconnectWallet}
                                title="Disconnect"
                                className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-400 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                            </button>
                        </div>

                        {chainId && (
                            <p className="text-sm text-gray-400 mt-2">
                                Chain ID: {chainId}
                            </p>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className={`
              bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors
              ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
                    >
                        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                    </button>
                )}

                {error && (
                    <div className="flex flex-col items-center mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm max-w-md text-center">
                        <p>{error}</p>
                        {error.includes("Wrong network") && (
                            <button
                                onClick={switchNetwork}
                                className="mt-2 bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs transition-colors"
                            >
                                Switch to Sepolia
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletConnect;
