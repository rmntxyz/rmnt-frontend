import ListTimer from "./ListTimer";

export default function ListAvailable({ available, targetTime, minted }) {
  return (
    <div
      className={`flex flex-col items-center p-4 drop-shadow-md ${
        minted === false && "text-ourBlack bg-mediumBeige"
      } ${minted === true && "text-white bg-ourBlack"}`}
    >
      <div className="w-full flex justify-between">
        <div className="whitespace-nowrap">Available NFT</div>
        {minted ? null : <div className="whitespace-nowrap">Drop begins in</div>}
      </div>
      <div className="w-full mt-1 flex items-center justify-between">
        <div>
          {available ? (
            <div className="text-base font-bold md:text-lg">{available}/5</div>
          ) : (
            <div className="text-lightGray text-base font-bold md:text-lg">
              Soldout
            </div>
          )}
        </div>
        <ListTimer targetTime={targetTime} />
      </div>
    </div>
  );
}
