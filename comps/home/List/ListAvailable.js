import ListTimer from "./ListTimer";

export default function ListAvailable({ NFTs }) {
  const available = NFTs.filter((NFT) => !NFT.attributes.sold_timestamp);
  return (
    <div
      className={`flex flex-col items-center p-4 shadow-md ${
        available.length
          ? "text-ourBlack bg-mediumBeige"
          : "text-white bg-ourBlack"
      }`}
    >
      <div className="w-full flex text-xs justify-between md:text-sm">
        <div className="whitespace-nowrap">Available NFT</div>
        {/* {timeRemaining > 0 ? (
          <div className="whitespace-nowrap">Drop begins in</div>
        ) : null} */}
      </div>
      <div className="w-full mt-1 flex items-center justify-between text-[15px] font-bold md:text-base">
        <div>
          {available.length ? (
            <div>
              {available.length}/{NFTs.length}
            </div>
          ) : (
            <div className="text-lightGray">Soldout</div>
          )}
        </div>
        {available.find((NFT) => NFT.attributes.timeRemaining > 0) ? (
          <ListTimer
            timeRemaining={
              available.find((NFT) => NFT.attributes.timeRemaining > 0)
                .attributes.timeRemaining
            }
          />
        ) : null}
      </div>
    </div>
  );
}
