import { useState, useCallback, useEffect } from 'react';
import { Network, BrowserProvider, Contract, parseUnits, formatUnits } from 'ethers';
import { USDC_SEPOLIA_ADDRESS, USDC_DECIMALS } from '../utils/constants';

// Minimal ABI for estimateGas
const MIN_ABI = [
    "function transfer(address to, uint256 amount) returns (bool)",
    "function estimateGas(address to, uint256 amount) view returns (uint256)" // Not strictly needed on interface but good for ref
];

interface GasEstimateReturn {
    estimatedGas: string | null; // Gas units
    gasPrice: string | null;     // In Gwei
    costEth: string | null;      // Total cost in ETH
    costInr: string | null;      // Total cost in INR
    costToken: string | null;    // Total cost in Selected Token (if not ETH)
    loading: boolean;
    error: string | null;
    refreshGas: () => void;
}

export const useGasEstimate = (
    provider: BrowserProvider | null,
    account: string | null,
    selectedToken: 'ETH' | 'USDC',
    ethPriceInr: number | undefined,
    usdcPriceInr: number | undefined
): GasEstimateReturn => {
    const [estimatedGas, setEstimatedGas] = useState<string | null>(null);
    const [gasPrice, setGasPrice] = useState<string | null>(null);
    const [costEth, setCostEth] = useState<string | null>(null);
    const [costInr, setCostInr] = useState<string | null>(null);
    const [costToken, setCostToken] = useState<string | null>(null); // New state
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const estimate = useCallback(async () => {
        if (!provider || !account) return;

        setLoading(true);
        setError(null);
        setCostToken(null);

        try {
            // Get current Gas Price
            const feeData = await provider.getFeeData();
            const currentGasPrice = feeData.gasPrice; // current gas price in wei

            if (!currentGasPrice) throw new Error("Could not fetch gas price");

            let limit = BigInt(0);

            if (selectedToken === 'ETH') {
                // Standard ETH transfer is always 21,000 gas
                limit = BigInt(21000);
            } else {
                // Estimate USDC transfer
                // We simulate sending 1 unit to self just for estimation
                const signer = await provider.getSigner();
                const usdcContract = new Contract(USDC_SEPOLIA_ADDRESS, MIN_ABI, signer);

                // Using dummy amount (1 unit) and self address
                try {
                    limit = await usdcContract.transfer.estimateGas(account, BigInt(1));
                } catch (e) {
                    console.warn("USDC Gas estimation failed, falling back to default", e);
                    limit = BigInt(65000); // Safe fallback for ERC20 transfer
                }
            }

            // Calculate Total Cost in ETH (Wei)
            const totalCostWei = limit * currentGasPrice;
            const totalCostEthStr = formatUnits(totalCostWei, 18);
            const costInEthNum = parseFloat(totalCostEthStr);

            // Calculate Cost in INR
            let inrCostStr = '0.00';
            if (ethPriceInr) {
                inrCostStr = (costInEthNum * ethPriceInr).toFixed(2);
            }

            // Calculate Cost in Selected Token (if USDC)
            if (selectedToken === 'USDC' && ethPriceInr && usdcPriceInr) {
                // Price of 1 ETH in USDC = ethInr / usdcInr
                const ethToUsdcRate = ethPriceInr / usdcPriceInr;
                const costInUsdc = costInEthNum * ethToUsdcRate;
                setCostToken(costInUsdc.toFixed(6));
            }

            setEstimatedGas(limit.toString());
            setGasPrice(formatUnits(currentGasPrice, 'gwei')); // Display in Gwei
            setCostEth(costInEthNum.toFixed(6));
            setCostInr(inrCostStr);

        } catch (err: any) {
            console.error("Gas estimation error:", err);
            setError(err.message || "Failed to estimate gas");
        } finally {
            setLoading(false);
        }
    }, [provider, account, selectedToken, ethPriceInr, usdcPriceInr]);

    // Re-estimate when token changes or periodically
    useEffect(() => {
        estimate();
    }, [estimate]);

    return {
        estimatedGas,
        gasPrice,
        costEth,
        costInr,
        costToken,
        loading,
        error,
        refreshGas: estimate
    };
};
