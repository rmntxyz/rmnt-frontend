import { useRouter } from "next/router";
import Desc from "../../detailPageComps/Desc";
import NFT from "../../detailPageComps/NFT";
import Viewer from "../../detailPageComps/Viewer";
import { webtoonData } from "../../homeComps/Homedata";

export default function WebtoonItem() {
  const router = useRouter();
  const { id } = router.query;
  const item = webtoonData.find((item) => item.id === parseInt(id));
  if (!router.isReady) {
    return <h4>Loading...</h4>;
  } else
    return (
      <div className="mt-20">
        <Viewer data={item.pages} />
        <Desc item={item} />
        <NFT nft={item.nft} />
      </div>
    );
}
