import { Link } from 'react-router-dom';

interface NavbarProps {
    variant: 'landing' | 'authenticated';
    onConnectWallet?: () => void;
    account?: string | null;
    onDisconnect?: () => void;
}

export default function Navbar({ variant, onConnectWallet, account, onDisconnect }: NavbarProps) {
    if (variant === 'landing') {
        return (
            <nav className="w-full px-8 py-6 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <span className="font-serif text-2xl tracking-[0.2em] uppercase text-white hover:opacity-80 transition-opacity">CryptoPay</span>
                </Link>

                <button
                    onClick={onConnectWallet}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                >
                    CONNECT WALLET
                </button>
            </nav>
        );
    }

    return (
        <header className="flex items-center justify-between px-12 py-8 bg-premium-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-serif text-2xl tracking-[0.2em] uppercase text-white hover:opacity-80 transition-opacity">CryptoPay</span>
                </Link>
            </div>


            <div className="flex flex-1 justify-end gap-12 items-center">
                <nav className="flex items-center gap-12">
                    <a className="text-white text-xs uppercase tracking-[0.15em] font-bold relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-white" href="#">Tokens</a>
                </nav>

                <div className="flex gap-4">
                    <button
                        onClick={onDisconnect}
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-white/20 grayscale hover:grayscale-0 transition-all cursor-pointer"
                        style={{
                            background: account ? `linear-gradient(135deg, #4e67eb 0%, #ec88ff 100%)` : undefined
                        }}
                        title={account || 'Disconnect'}
                    >
                        {account && (
                            <div className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {account.slice(2, 4).toUpperCase()}
                            </div>
                        )}
                    </button>
                </div>
            </div>              </header>
    );
}
