"use client";

import { useGameState } from "@/hooks/useGameState";

const PlayerBalance = () => {
  const { playerBalance } = useGameState();
  return (
    <div className="flex justify-center items-center">
      <div className="absolute bottom-[0%] ">
        <div className="rounded-t-full outline-main outline-[10px] outline border-[5px]  bg-main border-background">
          <div className="px-8 pb-2 py-3 flex flex-col w-[200px] justify-center items-center">
            <p className="font-extrabold text-background ">Balance</p>
            <span className="text-background rounded-full px-2 font-extrabold">
              {playerBalance} ETH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBalance;
