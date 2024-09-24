import Image from "next/image";

const DealerHand = () => {
  return (
    <div className="absolute left-[10%]">
      <div className=" border-4 rounded-lg border-main ">
        <Image src="/images/cards/1c.svg" alt="deck" width={200} height={200} />
      </div>
    </div>
  );
};
export default DealerHand;
