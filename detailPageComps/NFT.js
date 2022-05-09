import ListTimer from "../homeComps/List/ListTimer";

export default function NFT ({nft}) {
  const unminted = nft.filter((item) => item.minted === false);
  const lastUnminted =
    unminted.length > 0 ? unminted[unminted.length - 1] : null;

  return <div className="bg-lightBeige">
    <div className="flex">
    <div>NFT</div>
    {lastUnminted ? <ListTimer targetTime={lastUnminted.targetTime} className="bg-white text-black"/> : null}
    </div>
  </div>
}