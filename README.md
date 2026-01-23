# Fiat-Crypto Assistant

A premium, fiat-first crypto payment application that seamlessly bridges traditional finance with digital assets. Built with a focus on user experience, security, and institutional-grade design.

## ✨ Features

### 💳 Fiat-First Payments
- **Real-time Conversion**: Convert USD/INR to ETH or USDC with live pricing from CoinGecko
- **Smart Token Selection**: Support for ETH and USDC on Ethereum Sepolia Testnet
- **Transparent Fee Display**: Clear breakdown of network fees in both crypto and fiat

### 🔐 Wallet Integration
- **MetaMask Support**: Seamless connection via EIP-1193 provider
- **Network Detection**: Automatic Sepolia testnet validation
- **Secure Transactions**: Non-custodial - all transactions signed through your browser wallet

### 💎 Premium UI/UX
- **Modern Design**: Dark theme with gradient accents and glassmorphism effects
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Smooth Animations**: Micro-interactions and transitions for enhanced user experience
- **Clean Typography**: Cinzel serif for headings, Inter for body text

### 📊 Portfolio Management
- **Live Balances**: Real-time ETH and USDC balance tracking
- **Fiat Conversion**: View your crypto holdings in INR
- **Quick Refresh**: Update balances on demand

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS 3.4 with custom design tokens
- **Web3 Library**: ethers.js v6
- **Price API**: CoinGecko API (free tier)
- **Network**: Ethereum Sepolia Testnet

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AmountEntry.tsx     # Fiat amount input with currency toggle
│   ├── Navbar.tsx          # Navigation bar (landing & authenticated)
│   ├── TokenSelector.tsx   # ETH/USDC selection buttons
│   └── TransferDetails.tsx # Transaction summary display
├── hooks/              # Custom React hooks
│   ├── useWallet.ts        # Wallet connection & network management
│   ├── useBalances.ts      # Token balance fetching
│   ├── usePrices.ts        # CoinGecko price polling
│   ├── useGasEstimate.ts   # Gas cost calculation
│   └── useSendTx.ts        # Transaction execution
├── pages/              # Route components
│   ├── LandingPage.tsx     # Wallet connection page
│   ├── BalancePage.tsx     # Portfolio overview
│   └── TransferPage.tsx    # Payment flow
├── utils/              # Helper functions
│   ├── format.ts           # Number & address formatting
│   └── constants.ts        # Contract addresses & configs
├── App.tsx             # Main app with routing
├── index.css           # Global styles & Tailwind config
└── main.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

1. **Node.js**: Version 18 or higher
2. **MetaMask**: Browser extension installed
3. **Sepolia ETH**: Get test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/L00p-h0le/Fiat-Crypto-Assistant.git

# Navigate to project directory
cd Fiat-Crypto-Assistant

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage Flow

1. **Connect Wallet**: Click "Connect Wallet" on the landing page
2. **Switch Network**: Ensure you're on Sepolia testnet (app will prompt if needed)
3. **View Balances**: See your ETH and USDC balances with INR values
4. **Initiate Transfer**: Click "Transfer" to start a payment
5. **Enter Details**: Input amount (USD/INR), recipient address, and select token
6. **Review & Send**: Confirm transaction details and sign with MetaMask
7. **Track Status**: View transaction hash and confirmation on Etherscan

## 🔒 Security

- **Non-Custodial**: No private keys are stored or transmitted
- **Client-Side Only**: All logic runs in your browser
- **Provider-Based**: Transactions signed through MetaMask
- **Testnet Only**: Currently configured for Sepolia testnet

## 🎨 Design Tokens

### Colors
- **Background**: Pure black (#000000)
- **Cards**: Deep charcoal with transparency
- **Accents**: Soft blue (#A5B4FC) to soft pink (#F472B6) gradient
- **Borders**: White with low opacity (5-10%)

### Typography
- **Headings**: Cinzel (serif) - uppercase with letter spacing
- **Body**: Inter (sans-serif) - clean and readable
- **Monospace**: JetBrains Mono - for addresses and amounts

## 📝 Environment

No environment variables required. The app uses:
- CoinGecko public API (no key needed)
- Sepolia testnet (chainId: 11155111)
- MetaMask injected provider

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Repository**: [GitHub](https://github.com/L00p-h0le/Fiat-Crypto-Assistant)
- **Sepolia Faucet**: [sepoliafaucet.com](https://sepoliafaucet.com/)
- **Sepolia Explorer**: [sepolia.etherscan.io](https://sepolia.etherscan.io/)

---

Built with ❤️ for the Web3 community
