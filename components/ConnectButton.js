"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DropdownMenu from "@/components/DropdownMenu";
import Image from "next/image";
import { useGameState } from "@/hooks/useGameState";
function truncateAccount(account) {
  if (typeof account === "string" && account.length >= 8) {
    return `${account.slice(0, 4)}...${account.slice(-4)}`;
  } else {
    throw new Error("Invalid account string");
  }
}

const ConnectButton = () => {
  const { network, setNetwork, account, setAccount } = useGameState();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const networkInfo = await provider.getNetwork();

        setAccount(address);
        setNetwork(networkInfo);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask or another Ethereum provider is required.");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setNetwork(null);
  };

  const switchToSepolia = async () => {
    const sepoliaChainId = 11155111; // Sepolia testnet chain ID
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexValue(sepoliaChainId) }],
      });
      connectWallet(); // Reconnect after switching network
    } catch (error) {
      if (error.code === 4902) {
        alert(
          "Sepolia network is not available in your wallet. Please add it."
        );
      } else {
        console.error("Error switching to Sepolia:", error);
      }
    }
  };

  // Handle manual account switching
  const switchAccount = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      connectWallet(); // Reconnect after switching account
    } catch (error) {
      console.error("Error switching account:", error);
    }
  };

  // Handle network and account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload(); // Reload the page when the network is changed
      });
    }
  }, []);
  const handleSelect = (index) => {
    switch (index) {
      case 2:
        switchToSepolia();
        break;
      case 3:
        switchAccount();
        break;
      case 4:
        disconnectWallet();
        break;
    }
  };
  return (
    <div>
      {account ? (
        <div className="flex ">
          <div className="bg-main2 bg-opacity-60  rounded-full flex ">
            <div className="bg-main2 rounded-full py-1 pl-2 pr-2">
              <div className="flex-row flex">
                <Image
                  src="../../images/user-circle.svg"
                  alt="My SVG"
                  width={30}
                  height={30}
                />
                <p className="text-greyGreen text-[20px] px-2">
                  {" "}
                  {truncateAccount(account)}
                </p>
              </div>
            </div>

            <DropdownMenu
              options={[
                <div>
                  <span>Network:</span>{" "}
                  <span className="font-bold">
                    {network?.name || "Unknown"}
                  </span>
                </div>,
                <div>
                  <span>Chain ID:</span>{" "}
                  <span className="font-bold">{network?.chainId}</span>
                </div>,

                <div className="">Switch to Sepolia</div>,
                <div>Switch Account</div>,
                <div>Disconnect Wallet</div>,
              ]}
              onSelect={handleSelect}
              const
              customStyles={{
                0: {
                  className:
                    "bg-main2 bg-opacity-60 rounded-t-lg py-0 hover:bg-main2 hover:bg-opacity-60 text-greyGreen pt-1 ", // Tailwind classes for option at index 2
                },
                1: {
                  className:
                    "bg-main2 bg-opacity-60 py-0 hover:bg-main2 hover:bg-opacity-60 text-greyGreen pb-1", // Inline CSS for option at index 3
                },
                2: {
                  className: network?.name === "sepolia" && "hidden", // Conditional class based on network name
                },
              }}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-main2 text-[20px] outline-2 outline outline-blue text-center text-white font-outline-2 rounded-xl px-3 py-1"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
