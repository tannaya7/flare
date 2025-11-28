# 📂 On-Chain Document Vault (Flare Coston2)

**Contract Address:** `0x25DE8Acd894021799b1581b0d86f38b979ddACD0`

**Explorer Reference:** Flare Coston2 Deployment  
**Purpose:** Immutable storage & verification of document fingerprints on-chain.

## 🧾 Overview
On-Chain Document Vault is a decentralized registry built on the Flare Coston2 network that allows a single contract owner to permanently record cryptographic hashes representing documents, media, or any digital data fingerprint. Each entry is timestamped at storage and can be publicly retrieved or verified without exposing the underlying content, ensuring both transparency and privacy.

## ✨ Core Capabilities
- **Owner-only write access:** Only the contract deployer/owner can append document hashes.
- **Immutable fingerprinting:** Once stored, hashes cannot be altered or removed.
- **Timestamped storage:** Every recorded hash is paired with an on-chain storage timestamp.
- **Public retrieval:** Anyone can view stored document hashes and their timestamps.
- **Direct indexed access:** Fetch an entry using `viewDocument(index)` or via `documents(index)` view.
- **Wallet-gated UI:** Front-end access requires wallet connection.
- **Robust states:** Loading, pending, error, and confirmation statuses in UI.
- **Network-aligned integration:** viem + wagmi compatible ABI and contract config.

## 🧠 Problem It Solves
Centralized document storage systems lack verifiability, are vulnerable to tampering, and do not provide a transparent proof-of-existence. This vault solves that by acting as a **trustless proof-of-existence registry**, where a document’s authenticity can be validated by comparing its hash with the one recorded on-chain.

### 🧩 Use Cases
- ✅ Certify academic certificates, IDs, and agreements
- ✅ Prove ownership of digital assets without revealing data
- ✅ Audit trails for school / enterprise projects
- ✅ Registry for signed PDFs or important legal document fingerprints
- ✅ Build higher-level dApps for verification workflows on Flare

## 🚀 Technical Integration
- **Stack:** TypeScript (React/Next.js), wagmi hooks, viem utilities, Flare JSON-RPC providers.
- **Files Connected to Contract:**  
  - `lib/contract.ts` (address + ABI)  
  - `hooks/useContract.ts` (owner reads + `addDocument`)  
  - `components/sample.tsx` (wallet gating + on-chain writes)

## 🔗 Smart Contract Functions Used
| Function | Access | Action |
|---|---|---|
| `addDocument(_docHash)` | Owner | Stores a new document hash |
| `viewDocument(index)` | Public View | Returns `(hash, timestamp)` |
| `documents(index)` | Public View | Returns `{ docHash, savedAt }` |
| `owner()` | Public View | Returns contract owner address |

## 🛡 Front-End Safeguards
- Wallet must be connected to write
- Address validation using `isAddress`
- Write transaction uses `writeContractAsync`
- Receipt monitoring via `useWaitForTransactionReceipt`
- Error handling preserved in UI state

## 📌 Notes
This contract currently uses a **single-writer (owner) vault model**. Multi-writer or user-vault features can be built in higher layers or future contract versions.

---

*Built for decentralized trust and permanent digital authenticity on the Flare ecosystem.*
