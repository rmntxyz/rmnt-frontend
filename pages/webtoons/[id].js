import Viewer from "../../comps/webtoonDetail/Viewer";
import Desc from "../../comps/webtoonDetail/Desc";
import NFT from "../../comps/webtoonDetail/NFT";
import { getExchangeRate } from "../api/USD_ETH";
import { usersUrl, webtoonsUrl } from "../../comps/URLs";
import Seo from "../../comps/SEO";

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { id } = context.query;
  const webtoonRes = await fetch(webtoonsUrl + id);
  const webtoon = await webtoonRes.json();
  const uniqueCollectors = webtoon.collectors.filter(
    (item, index) => webtoon.collectors.indexOf(item) === index
  );
  const usersRes = await fetch(usersUrl);
  const users = await usersRes.json();
  return {
    props: {
      exchangeRate: exchangeRate,
      webtoon: webtoon,
      collectors: uniqueCollectors,
      users: users,
    },
  };
}

export default function WebtoonPage({
  exchangeRate,
  webtoon,
  collectors,
  users,
}) {
  return (
    <div className="mt-20 overflow-x-hidden">
      <Seo title={`${webtoon.artist.name} - ${webtoon.title}`} />
      <Viewer data={webtoon.pages} />
      <Desc item={webtoon} collectors={collectors} users={users} />
      <NFT
        NFTs={webtoon.NFTs}
        timeRemaining={webtoon.timeRemaining}
        exchangeRate={exchangeRate}
      />
    </div>
  );
}
