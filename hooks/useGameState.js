"use client";

import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { ethers } from "ethers";
import useContract from "./useContract";
const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const { contract } = useContract();
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isBlockchain, setIsBlockChain] = useState(false);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerBalance, setPlayerBalance] = useState(0);
  const [gameStatus, setGameStatus] = useState("idle");
  useEffect(() => {
    if (network?.name === "sepolia") {
      setIsBlockChain(true);
    } else {
      setIsBlockChain(false);
    }
  }, [network]);
  useEffect(() => {
    if (isBlockchain) {
      getPlayerBalance();
    } else {
      setPlayerBalance(0);
    }
  }, [isBlockchain]);
  async function getPlayerBalance() {
    if (!contract || !account) return; // Ensure contract and account are available

    try {
      const bigNumberInWei = await contract.getProceeds(account);
      const amount = ethers.utils.formatEther(bigNumberInWei).toString();
      setPlayerBalance(amount);
    } catch (error) {
      console.error("Error viewing balance of player:", error);
    }
  }
  const value = useMemo(
    () => ({
      account,
      network,
      dealerHand,
      playerHand,
      playerBalance,
      gameStatus,
      setPlayerBalance,
      setGameStatus,
      setAccount,
      setNetwork,
    }),
    [account, network, dealerHand, playerHand, playerBalance, gameStatus]
  );

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
};
