import Viewer from "../../comps/webtoonDetail/Viewer";
import Desc from "../../comps/webtoonDetail/Desc";
import NFT from "../../comps/webtoonDetail/NFT";
import { getExchangeRate } from "../api/USD_ETH";
// import { usersUrl, webtoonsUrl } from "../../comps/URLs";
import client from "../../apollo";
import { gql } from "@apollo/client";
import Seo from "../../comps/layout/SEO";

// export async function getServerSideProps(context) {
//   const exchangeRate = await getExchangeRate();
//   const { id } = context.query;
//   const webtoonRes = await fetch(webtoonsUrl + id);
//   const webtoon = await webtoonRes.json();
//   const uniqueCollectors = webtoon.collectors.filter(
//     (item, index) => webtoon.collectors.indexOf(item) === index
//   );
//   const usersRes = await fetch(usersUrl);
//   const users = await usersRes.json();
//   return {
//     props: {
//       exchangeRate: exchangeRate,
//       webtoon: webtoon,
//       collectors: uniqueCollectors,
//       users: users,
//     },
//   };
// }

const GET_WEBTOON_DATA = gql`
  query Webtoon($webtoonId: String!) {
    webtoon(webtoon_id: $webtoonId) {
      artist {
        name
        profile_image
        wallet_address
        description
        email
        instagram
      }
      title
      volume
      pages {
        page_image
      }
      cover_image
      description
      timeRemaining
      NFTs {
        nft_id
        name
        sold_timestamp
        edition
        image
        price
        opensea
        user {
          user_id
          profile_image
          name
          wallet_address
        }
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { webtoon_id } = context.query;
  const { data } = await client.query({
    query: GET_WEBTOON_DATA,
    variables: {
      webtoonId: webtoon_id,
    },
    fetchPolicy: "network-only",
  });
  return {
    props: {
      exchangeRate: exchangeRate,
      webtoon: data.webtoon,
      users: data.webtoon.NFTs?.map((NFT) => NFT.user),
    },
  };
}

export default function WebtoonPage({ exchangeRate, webtoon, users }) {
  return (
    <div className="mt-20 overflow-x-hidden">
      <Seo title={`${webtoon.artist.name} - ${webtoon.title}`} />
      <main>
        <Viewer data={webtoon.pages.map((page) => page.page_image)} />
        <Desc item={webtoon} users={users} />
        <NFT
          NFTs={webtoon.NFTs}
          timeRemaining={webtoon.timeRemaining}
          exchangeRate={exchangeRate}
        />
      </main>
    </div>
  );
}
