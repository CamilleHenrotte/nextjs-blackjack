"use client";
import useContract from "../hooks/useContract";
import Image from "next/image";

import { ethers } from "ethers";

export default function FundAGameChips() {
  const { contract, loading, error } = useContract();

  const fundAGame = async (amountInEther) => {
    try {
      const amountInWei = ethers.utils.parseEther(amountInEther);
      await contract.fundAGame({ value: amountInWei });
    } catch (error) {
      console.error("Error funding the game:", error);
    }
  };

  return (
    <div>
      <button
        className=" hover:bg-main rounded-full p-2 absolute top-[68%] left-[3%]  "
        onClick={() => {
          fundAGame("0.1");
        }}
      >
        <Image
          src="/images/100-casino-chip.svg"
          alt="casino chip 100"
          width={100}
          height={100}
        />
      </button>
      <button
        className=" hover:bg-main rounded-full p-2 absolute  top-[72%] left-[10%]  "
        onClick={() => {
          fundAGame("0.05");
        }}
      >
        <Image
          src="/images/50-casino-chip.svg"
          alt="casino chip 50"
          width={100}
          height={100}
        />
      </button>
      <button
        className=" hover:bg-main rounded-full p-2 absolute top-[74.2%] left-[17%]  "
        onClick={() => {
          fundAGame("0.02");
        }}
      >
        <Image
          src="/images/20-casino-chip.svg"
          alt="casino chip 20"
          width={100}
          height={100}
        />
      </button>
      <button
        className=" hover:bg-main rounded-full p-2 absolute top-[76%] left-[24.6%]  "
        onClick={() => {
          fundAGame("0.01");
        }}
      >
        <Image
          src="/images/10-casino-chip.svg"
          alt="casino chip 10"
          width={100}
          height={100}
        />
      </button>
    </div>
  );
}
