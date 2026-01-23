import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
    onConnectWallet: () => Promise<void>;
    account: string | null;
    isConnecting: boolean;
    chainId?: number;
}

export default function LandingPage({ onConnectWallet, account, isConnecting, chainId }: LandingPageProps) {
    const navigate = useNavigate();

    // Redirect to balance page if wallet is connected AND on correct network
    useEffect(() => {
        if (account && chainId === 11155111) {
            navigate('/balance');
        }
    }, [account, chainId, navigate]);

    return (
        <div className="min-h-screen bg-premium-black text-white geometric-bg">
            {/* Navbar */}
            <nav className="w-full px-12 py-8 flex items-center justify-between bg-premium-black/50 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="size-10 flex items-center justify-center border border-white/20 rotate-45">
                        <div className="size-6 accent-bar -rotate-45"></div>
                    </div>
                    <h2 className="font-serif text-2xl tracking-[0.2em] uppercase">CryptoPay</h2>
                </div>

                <button
                    onClick={onConnectWallet}
                    disabled={isConnecting}
                    className="px-10 h-14 border border-white/20 text-white hover:bg-white hover:text-black tracking-[0.2em] text-[10px] font-bold uppercase transition-all duration-300 disabled:opacity-50"
                >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
            </nav>

            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
                {/* Hero Title */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
                        <div className="premium-gradient-text uppercase mb-4">
                            Fiat-First
                        </div>
                        <div className="premium-gradient-text uppercase">
                            Crypto Payments
                        </div>
                    </h1>

                    <div className="w-12 h-px accent-bar mx-auto mb-8"></div>

                    {/* Tagline */}
                    <p className="text-white/40 text-center max-w-2xl text-base md:text-lg leading-relaxed tracking-wide font-light mx-auto">
                        Seamlessly bridge traditional finance with the digital asset economy
                        <br />
                        through our secure, high-fidelity settlement protocol.
                    </p>
                </div>
            </div>

            {/* Loading state feedback */}
            {isConnecting && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-premium-card/80 backdrop-blur-md border border-white/10 px-8 py-4 rounded">
                    <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full accent-bar animate-pulse"></div>
                        <p className="text-white/60 text-xs tracking-[0.2em] uppercase font-bold">Initializing Connection</p>
                    </div>
                </div>
            )}
        </div>
    );
}
