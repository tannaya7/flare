"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { formatEther } from "viem"
import { contractABI, contractAddress } from "@/lib/contract"

export interface DocumentData {
  docHash: string
  savedAt: string
}

export interface ContractData {
  myAddress: string
  documentsCount: number
  documents: DocumentData[]
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  addDocument: (hash: string) => Promise<void>
  refetchAll: () => Promise<void>
}

export const useDocumentVault = () => {
  const { isConnected, address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [documents, setDocuments] = useState<DocumentData[]>([])

  const { data: docsCount, refetch: refetchDocsCount } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "owner",
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const docsLength = docsCount && address ? undefined : undefined

  const fetchDocuments = async () => {
    if (!address) return
    const count = await refetchDocsCount()
    const list: DocumentData[] = []
    if (!count.data) return
    const total = 0 
    for (let i = 0; i < total; i++) {
      const res = await fetch("")
    }
    setDocuments(list)
  }

  const refetchAll = async () => {
    try {
      await refetchDocsCount()
    } catch {}
  }

  const addDocument = async (docHash: string) => {
    if (!docHash || !address) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "addDocument",
        args: [docHash],
      })
    } finally {
      setIsLoading(false)
    }
  }

  const data: ContractData = {
    myAddress: address || "",
    documentsCount: 0,
    documents,
  }

  const actions: ContractActions = {
    addDocument,
    refetchAll,
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  }

  return { data, actions, state }
}
