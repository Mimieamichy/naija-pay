# NaijaPay - Naira Token Transfer MVP using Solana Devnet

A web-based MVP for demonstrating on-chain token transfers on Solana Devnet, wallet connection, custodial deposit simulation, and mock naira fiat operations.

## 🚀 Features

### Phase A - Wallet Connection ✅
- Connect to Solana wallets (Phantom, Solflare, Backpack)
- Display connected wallet address
- Show real-time SOL balance on Devnet
- Copy address to clipboard

### Phase B - Token Transfer ✅
- Send SOL to any Solana address
- Transaction confirmation tracking
- Real-time balance updates

### Phase C - Mock Fiat Operations ✅
- Simulated naira deposit (₦ → USDC)
- Simulated naira withdrawal (USDC → ₦)
- Toast notifications for operations

### Additional Features ✅
- QR code generation for receiving payments (Solana Pay compatible)
- Transaction history display
- Mobile-responsive design
- Dark theme optimized for crypto UX

## 🛠 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- @solana/wallet-adapter (wallet integration)
- @solana/web3.js (Solana interactions)
- @solana/spl-token (SPL token operations)

**Backend (Coming Soon):**
- Lovable Cloud (Supabase-powered)
- PostgreSQL database
- Edge Functions for webhook handling
- Real-time transaction indexing

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🌐 Environment Variables

Create a `.env` file in the root directory (optional):

```env
# Solana Configuration
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_SOLANA_NETWORK=devnet

# Token Configuration (for future SPL token support)
VITE_TOKEN_MINT=<your-test-token-mint-address>

# Backend API (when implemented)
VITE_API_URL=http://localhost:3000
```

## 🎯 Usage

### 1. Connect Wallet
- Click "Select Wallet" button
- Choose your preferred Solana wallet (Phantom, Solflare, or Backpack)
- Approve the connection request
- Your wallet address and SOL balance will appear

### 2. Send SOL
- Enter recipient's Solana address
- Enter amount in SOL
- Click "Send SOL"
- Approve the transaction in your wallet
- Wait for confirmation

### 3. Receive Tokens
- View your QR code in the "Receive" section
- Share your wallet address or QR code
- Incoming transactions will appear in history

### 4. Mock Fiat Operations
- **Deposit:** Enter naira amount → simulates receiving USDC
- **Withdraw:** Enter naira amount → simulates converting USDC to fiat

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── WalletInfo.tsx   # Wallet connection display
│   ├── SendToken.tsx    # Token transfer form
│   ├── ReceiveQR.tsx    # QR code generator
│   ├── MockFiatOperations.tsx  # Deposit/withdraw UI
│   └── TransactionHistory.tsx  # Transaction list
├── contexts/
│   └── WalletContextProvider.tsx  # Wallet adapter setup
├── pages/
│   ├── Index.tsx        # Main app page
│   └── NotFound.tsx     # 404 page
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

## 🔮 Roadmap

### Phase D - Backend Implementation
- [ ] Enable Lovable Cloud
- [ ] Create database schema (users, wallets, transactions, fiat_requests)
- [ ] Implement REST API endpoints
- [ ] Add treasury wallet management
- [ ] Real USDC transfers on Devnet

### Phase E - Webhook & Indexing
- [ ] Helius webhook integration
- [ ] Transaction status tracking
- [ ] Real-time database updates
- [ ] Fallback RPC polling

### Phase F - Testing & Deployment
- [ ] Unit tests for components
- [ ] Integration tests for API
- [ ] End-to-end demo script
- [ ] Production deployment

## 🧪 Testing

Currently supports manual testing in browser. Automated tests coming soon.

### Manual Test Flow:
1. Connect wallet → verify address and balance display
2. Send 0.01 SOL to test address → verify transaction appears
3. Click "Deposit ₦10,000" → verify success toast
4. Check transaction history → verify entry appears

## 🔒 Security Notes

⚠️ **This is a development MVP for Solana Devnet only**

- Uses Devnet SOL (no real value)
- Custodial features are simulated
- Do not use production keys or mainnet
- Treasury wallet implementation is for demo purposes

## 📚 Documentation

- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
- [Wallet Adapter Docs](https://github.com/solana-labs/wallet-adapter)
- [Lovable Cloud Docs](https://docs.lovable.dev/features/cloud)

## 🤝 Contributing

This is an MVP project. Future contributions will focus on:
- Real SPL token support (USDC)
- Production-ready custodial system
- Real fiat on/off-ramp integration
- Enhanced security features

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues or questions:
1. Check existing documentation
2. Review Solana Devnet status
3. Ensure wallet has Devnet SOL (get from [faucet](https://faucet.solana.com/))

---

**Built with ⚡️ on Solana Devnet**
