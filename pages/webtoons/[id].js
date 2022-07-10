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

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { id } = context.query;
  const { data } = await client.query({
    query: gql`
      query Webtoon($webtoonId: String!) {
        webtoon(id: $webtoonId) {
          artist {
            name
            profile_picture
            wallet_address
            description
            email
            instagram
          }
          title
          volume
          pages
          cover_image
          description
          timeRemaining
          NFTs {
            id
            name
            sold
            edition
            image_address
            price
            opensea
            user {
              id
              profile_picture
              name
              wallet_address
            }
          }
        }
      }
    `,
    variables: {
      webtoonId: id,
    },
  });
  return {
    props: {
      exchangeRate: exchangeRate,
      webtoon: data.webtoon,
      users: data.webtoon.NFTs.map((NFT) => NFT.user),
    },
  };
}

export default function WebtoonPage({ exchangeRate, webtoon, users }) {
  return (
    <div className="mt-20 overflow-x-hidden">
      <Seo title={`${webtoon.artist.name} - ${webtoon.title}`} />
      <main>
        <Viewer data={webtoon.pages} />
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
