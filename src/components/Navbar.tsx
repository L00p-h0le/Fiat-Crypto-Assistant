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
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-wide text-white">CRYPTOPAY</span>
                </div>

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
                <div className="size-10 flex items-center justify-center border border-white/20 rotate-45">
                    <div className="size-6 accent-bar -rotate-45"></div>
                </div>
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
