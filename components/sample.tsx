"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useDocumentVault } from "@/hooks/useContract"
import { isAddress } from "viem"

const SampleIntegration = () => {
  const { isConnected, address } = useAccount()
  const [inputHash, setInputHash] = useState("")

  const { data, actions, state } = useDocumentVault()

  const handleAddDoc = async () => {
    if (!inputHash) return
    try {
      await actions.addDocument(inputHash)
      setInputHash("")
    } catch {}
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Document Vault</h2>
          <p className="text-muted-foreground">Connect wallet to interact with the contract.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Document Vault</h1>
          <p className="text-muted-foreground text-sm mt-1">Store and verify document hashes on-chain</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Document Hash</label>
          <input
            type="text"
            placeholder="Enter document hash"
            value={inputHash}
            onChange={(e) => setInputHash(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <button
          onClick={handleAddDoc}
          disabled={state.isLoading || !inputHash}
          className="w-full mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {state.isLoading ? "Adding..." : "Add Document"}
        </button>

        {state.hash && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Tx Hash</p>
            <p className="text-sm font-mono text-foreground break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p className="text-sm text-primary">Confirming...</p>}
            {state.isConfirmed && <p className="text-sm text-green-500">Confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive-foreground">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntegration
