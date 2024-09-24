import Image from "next/image";
const Deck = () => {
  return (
    <div>
      <div className="absolute top-[37%] left-[80%]">
        <Image src="/images/deck.svg" alt="deck" width={300} height={300} />
      </div>
    </div>
  );
};
export default Deck;
