import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider } from 'ethers';
import type { Signer, Eip1193Provider } from 'ethers';
import { SEPOLIA_CHAIN_ID } from '../utils/constants';

declare global {
    interface Window {
        ethereum?: Eip1193Provider & {
            on: (event: string, callback: (...args: unknown[]) => void) => void;
            removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
            request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            isMetaMask?: boolean;
        };
    }
}

interface UseWalletReturn {
    account: string | null;
    chainId: number | null;
    provider: BrowserProvider | null;
    signer: Signer | null;
    error: string | null;
    isConnecting: boolean;
    connectWallet: () => Promise<void>;
    switchNetwork: () => Promise<void>;
    disconnectWallet: () => void;
}

export const useWallet = (): UseWalletReturn => {
    const [account, setAccount] = useState<string | null>(null);
    const [chainId, setChainId] = useState<number | null>(null);
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [signer, setSigner] = useState<Signer | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = useCallback(async () => {
        setIsConnecting(true);
        setError(null);

        if (!window.ethereum) {
            setError("MetaMask is not installed. Please install it to use this app.");
            setIsConnecting(false);
            return;
        }

        try {
            const browserProvider = new BrowserProvider(window.ethereum);
            const accounts = await browserProvider.send("eth_requestAccounts", []);

            if (accounts.length === 0) {
                throw new Error("No accounts found");
            }

            const currentSigner = await browserProvider.getSigner();
            const network = await browserProvider.getNetwork();
            const currentChainId = Number(network.chainId);

            setProvider(browserProvider);
            setSigner(currentSigner);
            setAccount(accounts[0]);
            setChainId(currentChainId);

            // Verify network immediately
            if (currentChainId !== SEPOLIA_CHAIN_ID) {
                setError("Wrong network. Please switch to Sepolia.");
            }

        } catch (err: any) {
            console.error("Error connecting wallet:", err);
            if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
                setError("Connection denied");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred while connecting.");
            }
        } finally {
            setIsConnecting(false);
        }
    }, []);

    const handleAccountsChanged = useCallback((...args: unknown[]) => {
        const accounts = args[0] as string[];
        if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
            // Re-initialize provider
            if (window.ethereum) {
                const newProvider = new BrowserProvider(window.ethereum);
                setProvider(newProvider);
                newProvider.getSigner().then(setSigner).catch(console.error);
            }
        } else {
            setAccount(null);
            setSigner(null);
        }
    }, []);

    const handleChainChanged = useCallback((...args: unknown[]) => {
        const _chainId = args[0] as string;
        const newChainId = Number(_chainId);
        setChainId(newChainId);
        if (newChainId !== SEPOLIA_CHAIN_ID) {
            setError("Wrong network. Please switch to Sepolia.");
        } else {
            setError(null);
        }

        // Provider might need refresh
        if (window.ethereum) {
            const newProvider = new BrowserProvider(window.ethereum);
            setProvider(newProvider);
            newProvider.getSigner().then(setSigner).catch(console.error);
        }
    }, []);

    const switchNetwork = useCallback(async () => {
        if (!window.ethereum) return;
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }], // Sepolia Chain ID in Hex
            });
            // The chainChanged event will handle the state update
        } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                setError("Sepolia network is not available in your MetaMask. Please add it manually.");
            } else {
                console.error("Failed to switch network:", switchError);
                setError("Failed to switch network. Please try explicitly in MetaMask.");
            }
        }
    }, []);

    const disconnectWallet = useCallback(async () => {
        try {
            if (window.ethereum) {
                // This forces MetaMask to revoke the dApp's permissions.
                await window.ethereum.request({
                    method: 'wallet_revokePermissions',
                    params: [{ eth_accounts: {} }]
                });
            }
        } catch (err) {
            console.error("Failed to revoke permissions", err);
        } finally {
            // Always clear local state
            setAccount(null);
            setChainId(null);
            setProvider(null);
            setSigner(null);
            setError(null);
        }
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        return () => {
            if (window.ethereum && window.ethereum.removeListener) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    }, [handleAccountsChanged, handleChainChanged]);

    const checkConnection = async () => {
        if (window.ethereum) {
            const browserProvider = new BrowserProvider(window.ethereum);
            try {
                const accounts = await browserProvider.listAccounts();
                if (accounts.length > 0) {
                    const network = await browserProvider.getNetwork();
                    setProvider(browserProvider);
                    setSigner(accounts[0]);
                    setAccount(accounts[0].address);
                    setChainId(Number(network.chainId));

                    if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
                        setError("Wrong network. Please switch to Sepolia.");
                    }
                }
            } catch (err) {
                console.error("Failed to check existing connection", err);
            }
        }
    }

    useEffect(() => {
        checkConnection();
    }, [handleAccountsChanged, handleChainChanged]);

    return { account, chainId, provider, signer, error, isConnecting, connectWallet, switchNetwork, disconnectWallet };
};
