"use client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useContract from "@/hooks/useContract";

export default function DealerBalance() {
  const { contract, loading, error } = useContract();
  const [dealerBalance, setDealerBalance] = useState(null);

  async function getDealerBalance() {
    if (!contract) return; // Ensure contract is available

    try {
      const bigNumberInWei = await contract.getAvailableProceeds();
      const amount = ethers.utils.formatEther(bigNumberInWei).toString();
      setDealerBalance(amount);
    } catch (error) {
      console.error("Error viewing balance of dealer:", error);
    }
  }

  useEffect(() => {
    getDealerBalance();
  }, [contract]);
  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  return <div>Balance of dealer: {dealerBalance ?? "Fetching..."} ETH</div>;
}
