import Viewer from "../../comps/webtoonDetail/Viewer";
import Desc from "../../comps/webtoonDetail/Desc";
import NFT from "../../comps/webtoonDetail/NFT";
import { getExchangeRate } from "../api/USD_ETH";
import { webtoonsUrl } from "../../comps/URLs";

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { id } = context.query;
  const webtoonRes = await fetch(webtoonsUrl + id);
  const webtoon = await webtoonRes.json();
  return { props: { exchangeRate: exchangeRate, webtoon: webtoon } };
}

export default function WebtoonPage({ exchangeRate, webtoon }) {
  return (
    <div className="mt-20 overflow-x-hidden ">
      <Viewer data={webtoon.pages} />
      <Desc item={webtoon} />
      <NFT
        nft={webtoon.nft}
        undropped={webtoon.undropped}
        exchangeRate={exchangeRate}
      />
    </div>
  );
}
