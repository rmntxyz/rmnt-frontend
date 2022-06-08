import Viewer from "../../comps/webtoonDetail/Viewer";
import Desc from "../../comps/webtoonDetail/Desc";
import NFT from "../../comps/webtoonDetail/NFT";
import { getExchangeRate } from "../api/USD_ETH";
import { webtoonsUrl } from "../../comps/URLs";
import Seo from "../../comps/SEO";
import { userData } from "../../comps/Homedata";

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { id } = context.query;
  const webtoonRes = await fetch(webtoonsUrl + id);
  const webtoon = await webtoonRes.json();
  let collectors = [];
  webtoon.NFTs.forEach((item) => collectors.push(item.owned_by));
  const uniqueCollectors = collectors.filter(
    (item, index) => collectors.indexOf(item) === index
  );
  return {
    props: {
      exchangeRate: exchangeRate,
      webtoon: webtoon,
      collectors: uniqueCollectors,
    },
  };
}

export default function WebtoonPage({ exchangeRate, webtoon, collectors }) {
  return (
    <div className="mt-20 overflow-x-hidden">
      <Seo title={`${webtoon.artist.name} - ${webtoon.title}`} />
      <Viewer data={webtoon.pages} />
      <Desc item={webtoon} collectors={collectors} users={userData} />
      <NFT
        NFTs={webtoon.NFTs}
        timeRemaining={webtoon.timeRemaining}
        exchangeRate={exchangeRate}
      />
    </div>
  );
}
