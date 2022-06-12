export default function Available({ NFTs }) {
  const available = NFTs.filter((item) => item.sold === false);
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
