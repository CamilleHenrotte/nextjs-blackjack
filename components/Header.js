"use client";
import ConnectButton from "./ConnectButton";

import DealerBalance from "./DealerBalance";
export default function Header() {
  return (
    <div className="grid grid-cols-3 p-4">
      <div />
      <div className="  z-50  flex items-center justify-center ">
        <p className="bg-white bg-opacity-80 text-[32px] text-center text-main font-outline-2 rounded-xl px-6 py-2">
          Blackjack
        </p>
      </div>
      <div className="flex justify-end">
        <ConnectButton />
      </div>
    </div>
  );
}
