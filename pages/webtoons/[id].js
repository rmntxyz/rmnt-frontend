import { useRouter } from "next/router";
import Viewer from "../../comps/webtoon/Viewer";
import Desc from "../../comps/webtoon/Desc";
import NFT from "../../comps/webtoon/NFT";
import { webtoonData } from "../../comps/home/Homedata";


export default function WebtoonItem() {
  const router = useRouter();
  const { id } = router.query;
  const item = webtoonData.find((item) => item.id === parseInt(id));
  if (!router.isReady) {
    return <h4>Loading...</h4>;
  } else
    return (
      <div className="mt-20 overflow-x-hidden ">
        <Viewer data={item.pages}  />
        <Desc item={item} />
        <NFT nft={item.nft}  />
      </div>
    );
}
