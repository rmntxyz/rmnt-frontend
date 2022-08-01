import ListTimer from "./ListTimer";

export default function ListAvailable({ NFTs }) {
  const available = NFTs.filter((NFT) => !NFT.attributes.sold_timestamp);
  const upcomingDropRemaining = Math.min(
    ...available
      .filter(
        (NFT) => NFT.attributes.drop_timestamp - new Date().getTime() / 1000 > 0
      )
      .map((NFT) => NFT.attributes.drop_timestamp - new Date().getTime() / 1000)
  );
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
        {/* {upcomingDropRemaining > 0 && upcomingDropRemaining !== Infinity ? (
          <ListTimer timeRemaining={upcomingDropRemaining * 1000} />
        ) : null} */}
      </div>
    </div>
  );
}
