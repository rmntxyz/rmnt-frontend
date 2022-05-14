import { useRouter } from "next/router";
import { webtoonData } from "../../comps/Homedata";

export default function NFTPage() {
  const router = useRouter();
  const { id } = router.query;
  let AllNFTs = []
  webtoonData.map((item) => item.nft.forEach(item => AllNFTs.push(item)));
  const NFT = AllNFTs.find((item) => item.id === parseInt(id))
  const webtoonNFTs = AllNFTs.filter((item) => item.webtoonId === NFT?.webtoonId)

  if (!router.isReady) {
    return <h4>Loading...</h4>;
  } else return <div>{id}</div>;
}
