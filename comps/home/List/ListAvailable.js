import ListTimer from "./ListTimer";

export default function ListAvailable({ NFTs, timeRemaining }) {
  //Filter out sold NFTs to pain the number of available NFTs
  const available = NFTs.filter((item) => item.sold === false);
  return (
    <div
      className={`flex flex-col items-center p-4 drop-shadow-md ${
        available.length
          ? "text-ourBlack bg-mediumBeige"
          : "text-white bg-ourBlack"
      }`}
    >
      <div className="w-full flex justify-between">
        <div className="whitespace-nowrap">Available NFT</div>
        {timeRemaining > 0 ? (
          <div className="whitespace-nowrap">Drop begins in</div>
        ) : null}
      </div>
      <div className="w-full mt-1 flex items-center justify-between">
        <div>
          {available.length ? (
            <div className="text-base font-bold md:text-lg">
              {available.length}/{NFTs.length}
            </div>
          ) : (
            <div className="text-lightGray text-base font-bold md:text-lg">
              Soldout
            </div>
          )}
        </div>
        {available.length ? <ListTimer timeRemaining={timeRemaining} /> : null}
      </div>
    </div>
  );
}
