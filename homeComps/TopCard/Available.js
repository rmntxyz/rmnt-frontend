export default function Available({ available }) {
  return (
    <div>
      <div className="whitespace-nowrap">Available NFT</div>
      {available ? (
        <div className="text-base font-bold md:text-xl">{available}/5</div>
      ) : (
        <div className="text-lightGray text-base font-bold md:text-xl">Soldout</div>
      )}
    </div>
  );
}
