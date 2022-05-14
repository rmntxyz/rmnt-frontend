import { useRouter } from "next/router";
import Viewer from "../../comps/webtoon/Viewer";
import Desc from "../../comps/webtoon/Desc";
import NFT from "../../comps/webtoon/NFT";
import { webtoonData } from "../../comps/Homedata";

//fetch USD-ETH exchage rate... to be changed later
export async function getServerSideProps() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum"
  );
  const data = await res.json();
  const exchangeRate = data[0].current_price;
  return { props: { exchangeRate } };
}


export default function WebtoonPage({exchangeRate}) {
  const router = useRouter();
  const { id } = router.query;
  const item = webtoonData.find((item) => item.id === parseInt(id));
  if (!router.isReady) {
    return <h4>Loading...</h4>;
  } else
    return (
      <div className="mt-20 overflow-x-hidden ">
        <Viewer data={item.pages} />
        <Desc item={item} />
        <NFT nft={item.nft} exchangeRate={exchangeRate}  />
      </div>
    );
}
