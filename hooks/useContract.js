"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ethers } from "ethers";
import abi from "../constants/Blackjack.json";
import networkMapping from "../constants/networkMapping.json"; // Assuming you have this mapping

// Create a context for the contract
const ContractContext = createContext({});

// Provider component to wrap your app
export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [blackjackAddress, setBlackjackAddress] = useState("");
  const [showErrorWrongNetwork, setShowErrorWrongNetwork] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chainId, setChainId] = useState("");

  // Fetch the chainId on component mount
  useEffect(() => {
    const fetchChainId = async () => {
      if (!window.ethereum) {
        setError(
          "Ethereum provider is not available. Please install MetaMask."
        );
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        setChainId(network.chainId.toString());
      } catch (err) {
        setError(`Error fetching chain ID: ${err.message}`);
        setLoading(false);
      }
    };

    fetchChainId();
  }, []);

  // Set contract address based on chainId
  useEffect(() => {
    if (!chainId) {
      setError("Invalid chain ID.");
      setShowErrorWrongNetwork(true);
      return;
    }

    const chainIdString = chainId;
    if (networkMapping[chainIdString]?.Blackjack?.[-1]) {
      setBlackjackAddress(networkMapping[chainIdString].Blackjack[-1]);
      setShowErrorWrongNetwork(false);
      setError(null);
    } else {
      setBlackjackAddress("");
      setShowErrorWrongNetwork(true);
      setError("Wrong network or contract not deployed on this network.");
    }
  }, [chainId]);

  // Load contract when chainId or blackjackAddress changes
  useEffect(() => {
    const loadContract = async () => {
      if (!window.ethereum) {
        setError(
          "Ethereum provider is not available. Please install MetaMask."
        );
        setLoading(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      if (!blackjackAddress) {
        setError("Blackjack contract address is not available.");
        setLoading(false);
        return;
      }

      try {
        const contractInstance = new ethers.Contract(
          blackjackAddress,
          abi,
          signer
        );
        setContract(contractInstance);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(`Error loading contract: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (blackjackAddress) {
      loadContract();
    }
  }, [blackjackAddress]);

  const memodValue = useMemo(
    () => ({
      contract,
      showErrorWrongNetwork,
      loading,
      error,
      chainId,
    }),
    [contract, showErrorWrongNetwork, loading, error, chainId]
  );
  return (
    <ContractContext.Provider value={memodValue}>
      {children}
    </ContractContext.Provider>
  );
};

// Custom hook to use the contract context in components

export default function useContract() {
  return useContext(ContractContext);
}
