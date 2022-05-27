import ListTimer from "./ListTimer";

export default function ListAvailable({ nft, undropped }) {
  const available = nft.filter((item) => item.sold === false);
  return (
    <div
      className={`flex flex-col items-center p-4 drop-shadow-md ${
        undropped.array.length > 0 && "text-ourBlack bg-mediumBeige"
      } ${undropped.array.length === 0 && "text-white bg-ourBlack"}`}
    >
      <div className="w-full flex justify-between">
        <div className="whitespace-nowrap">Available NFT</div>
        {undropped.array.length ? (
          <div className="whitespace-nowrap">Drop begins in</div>
        ) : null}
      </div>
      <div className="w-full mt-1 flex items-center justify-between">
        <div>
          {available.length ? (
            <div className="text-base font-bold md:text-lg">
              {available.length}/5
            </div>
          ) : (
            <div className="text-lightGray text-base font-bold md:text-lg">
              Soldout
            </div>
          )}
        </div>
        {undropped.array.length ? (
          <ListTimer timeRemaining={undropped.timeRemaining} />
        ) : null}
      </div>
    </div>
  );
}
