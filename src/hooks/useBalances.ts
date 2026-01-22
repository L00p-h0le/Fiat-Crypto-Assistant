import { useState, useEffect, useCallback } from 'react';
import { Contract, formatUnits, BrowserProvider } from 'ethers';
import { USDC_SEPOLIA_ADDRESS, USDC_DECIMALS, ETH_DECIMALS } from '../utils/constants';

interface UseBalancesReturn {
    ethBalance: string;
    usdcBalance: string;
    loading: boolean;
    refreshBalances: () => Promise<void>;
}

// Minimal ERC20 ABI for balanceOf
const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)"
];

export const useBalances = (
    provider: BrowserProvider | null,
    account: string | null,
    chainId: number | null
): UseBalancesReturn => {
    const [ethBalance, setEthBalance] = useState<string>("0.0");
    const [usdcBalance, setUsdcBalance] = useState<string>("0.0");
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBalances = useCallback(async () => {
        if (!provider || !account || !chainId) return;

        // Don't fetch if not on Sepolia (or your supported chain) to avoid errors
        if (chainId !== 11155111) return;

        setLoading(true);
        try {
            // Fetch ETH Balance
            const ethBal = await provider.getBalance(account);
            setEthBalance(formatUnits(ethBal, ETH_DECIMALS));

            // Fetch USDC Balance
            const usdcContract = new Contract(USDC_SEPOLIA_ADDRESS, ERC20_ABI, provider);
            const usdcBal = await usdcContract.balanceOf(account);
            setUsdcBalance(formatUnits(usdcBal, USDC_DECIMALS));

        } catch (error) {
            console.error("Error fetching balances:", error);
            // Optionally handle UI error for balance fetching
        } finally {
            setLoading(false);
        }
    }, [provider, account, chainId]);

    useEffect(() => {
        fetchBalances();
    }, [fetchBalances]);

    return { ethBalance, usdcBalance, loading, refreshBalances: fetchBalances };
};
