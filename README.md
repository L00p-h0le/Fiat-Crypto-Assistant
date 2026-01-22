# Fiat-Crypto Assistant

A sleek, modern Web3 application designed to bridge the gap between fiat (INR) and crypto transactions. Built with security and user experience in mind.

## 🚀 Features

- **Wallet Integration**: Seamlessly connect with MetaMask (EIP-1193).
- **Fiat-to-Crypto Calculation**: Real-time pricing via CoinGecko API to convert INR to ETH/USDC.
- **Multi-Token Support**: View balances and send ETH or USDC on the Ethereum Sepolia Testnet.
- **Smart Gas Estimation**: Accurate network fee calculations in both crypto and fiat.
- **Premium UI**: Dark-themed, responsive interface with smooth micro-animations.
- **Security First**: No private key handling; all transactions are signed via your browser wallet.

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Web3**: ethers.js v6
- **API**: CoinGecko for real-time prices
- **Network**: Ethereum Sepolia Testnet

## 📁 Project Structure

```text
src/
 ├─ components/    # Reusable UI components
 ├─ hooks/         # Custom Web3 and application logic
 ├─ utils/         # Formatting helpers and constants
 ├─ App.tsx        # Main application layout
 └─ main.tsx       # Entry point
```

## ⚙️ Preparation

1.  **Node.js**: Ensure you have Node.js installed.
2.  **MetaMask**: Install MetaMask extension and switch to **Sepolia Test Network**.
3.  **Dependencies**: Run `npm install` to install required packages.

## 🏃 Running Locally

```bash
npm run dev
```

## 🔒 Security

- This app is stateless regarding private data.
- It interacts solely with the user's injected provider (MetaMask).
- No backend is required; all logic happens client-side or on-chain.

## 📄 License

MIT
