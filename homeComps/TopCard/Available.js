export default function Available({ nft }) {
  const available = nft.filter((item) => item.sold === false);
  return (
    <div>
      <div className="whitespace-nowrap">Available NFT</div>
      {available.length ? (
        <div className="text-base font-bold md:text-xl">
          {available.length}/5
        </div>
      ) : (
        <div className="text-lightGray text-base font-bold md:text-xl">
          Soldout
        </div>
      )}
    </div>
  );
}