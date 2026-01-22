import { useState, useEffect, useCallback } from 'react';

interface Prices {
    ethInr: number;
    usdcInr: number;
}

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=inr";

export const usePrices = () => {
    const [prices, setPrices] = useState<Prices | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrices = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(COINGECKO_API_URL);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Rate limited by CoinGecko. Please wait.");
                }
                throw new Error("Failed to fetch prices.");
            }

            const data = await response.json();

            if (data.ethereum && data['usd-coin']) {
                setPrices({
                    ethInr: data.ethereum.inr,
                    usdcInr: data['usd-coin'].inr
                });
            } else {
                throw new Error("Invalid data format from API.");
            }

        } catch (err: unknown) {
            console.error("Price fetch error:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error fetching prices.");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrices();
        // Auto-refresh every 60 seconds
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, [fetchPrices]);

    return { prices, loading, error, refreshPrices: fetchPrices };
};
