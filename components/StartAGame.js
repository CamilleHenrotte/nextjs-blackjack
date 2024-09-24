const StartAGame = () => {
  return (
    <div className="absolute bottom-[10%] left-[60%] cursor-pointer">
      <div className="rounded-full outline-pinkChip hover:outline-main outline-[10px] outline border-[5px]  bg-pinkChip hover:bg-main border-background">
        <div className="py-6 px-2 flex flex-col  justify-center items-center">
          <p className="font-extrabold text-background ">START</p>
        </div>
      </div>
    </div>
  );
};
export default StartAGame;
