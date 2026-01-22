import { useState, useCallback } from 'react';
import { BrowserProvider, Contract, parseUnits } from 'ethers';
import { USDC_SEPOLIA_ADDRESS, USDC_DECIMALS } from '../utils/constants';

// Minimal ABI for transfer
const MIN_ABI = [
    "function transfer(address to, uint256 amount) returns (bool)"
];

interface SendTxReturn {
    sendTransaction: (to: string, amountCrypto: string) => Promise<void>;
    status: 'idle' | 'pending' | 'success' | 'error';
    txHash: string | null;
    error: string | null;
    reset: () => void;
}

export const useSendTx = (
    provider: BrowserProvider | null,
    account: string | null,
    selectedToken: 'ETH' | 'USDC'
): SendTxReturn => {
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [txHash, setTxHash] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const reset = useCallback(() => {
        setStatus('idle');
        setTxHash(null);
        setError(null);
    }, []);

    const sendTransaction = useCallback(async (to: string, amountCrypto: string) => {
        if (!provider || !account) {
            setError("Wallet not connected");
            return;
        }

        if (!to || !amountCrypto) {
            setError("Invalid recipient or amount");
            return;
        }

        setStatus('pending');
        setError(null);
        setTxHash(null);

        try {
            const signer = await provider.getSigner();
            let tx;

            if (selectedToken === 'ETH') {
                // Send ETH
                const amountWei = parseUnits(amountCrypto, 18);
                tx = await signer.sendTransaction({
                    to,
                    value: amountWei
                });
            } else {
                // Send USDC
                const usdcContract = new Contract(USDC_SEPOLIA_ADDRESS, MIN_ABI, signer);
                const amountUnits = parseUnits(amountCrypto, USDC_DECIMALS);
                tx = await usdcContract.transfer(to, amountUnits);
            }

            setTxHash(tx.hash);

            // Wait for confirmation (optional, but good for UX)
            await tx.wait();

            setStatus('success');
        } catch (err: any) {
            console.error("Transaction failed:", err);

            // Handle known error codes
            if (err.code === 'ACTION_REJECTED' || err.code === 4001) {
                setError("Transaction rejected by user");
            } else if (err.code === 'INSUFFICIENT_FUNDS' || err.message?.includes("insufficient funds")) {
                setError("Insufficient balance");
            } else {
                setError(err.message || "Transaction failed");
            }
            setStatus('error');
        }
    }, [provider, account, selectedToken]);

    return { sendTransaction, status, txHash, error, reset };
};
