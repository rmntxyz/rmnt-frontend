export default function Available({ NFTs }) {
  //Filter out sold NFTs to paint the number of available NFTs
  const available = NFTs.filter(
    (item) =>
      (item.sold_timestamp === null) |
      (item.sold_timestamp === undefined) |
      (item.sold_timestamp === "")
  );
  return (
    <div>
      <div className="whitespace-nowrap">Available NFT</div>
      {available.length ? (
        <div className="text-base font-bold md:text-xl">
          {available.length}/{NFTs.length}
        </div>
      ) : (
        <div className="text-lightGray text-base font-bold md:text-xl">
          Soldout
        </div>
      )}
    </div>
  );
}
