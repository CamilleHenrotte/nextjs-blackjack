import Header from "@/components/Header";
import PlayerBalance from "@/components/PlayerBalance";
import BubbleBackground from "@/components/BubbleBackground";
import FundAGameChips from "@/components/FundAGameChips";
import StartAGame from "@/components/StartAGame";
import DealerHand from "@/components/DealerHand";
import Deck from "@/components/Deck";

export default function Home() {
  return (
    <div className="">
      {/* Bubble background with negative z-index */}
      <div className="absolute -z-10 ">
        <BubbleBackground />
      </div>
      <Header />

      <PlayerBalance />
      <FundAGameChips />
      <StartAGame />
      <DealerHand />
      <Deck />
    </div>
  );
}
