import { gql } from "@apollo/client";
import client from "../../apollo";
import ListItem from "../../comps/home/List/ListItem";
import Seo from "../../comps/layout/SEO";
// import { webtoonsUrl } from "../../comps/URLs";

// export async function getServerSideProps() {
//   const webtoonsRes = await fetch(webtoonsUrl);
//   const webtoonsData = await webtoonsRes.json();
//   return { props: { webtoonsData } };
// }

const GET_WEBTOONS_DATA = gql`
  query Webtoons_data {
    allWebtoons {
      webtoon_id
      artist {
        name
        profile_image
      }
      title
      volume
      cover_image
      NFTs {
        webtoon_id
        sold_timestamp
        timeRemaining
      }
    }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_WEBTOONS_DATA,
    fetchPolicy: "network-only",
  });
  return {
    props: {
      webtoonsData: data.allWebtoons.slice(),
    },
  };
}

export default function Webtoons({ webtoonsData }) {
  return (
    <div className="container mx-auto">
      <Seo title="Webtoons | Rarement" />
      <main className="grid mx-8 my-10 gap-x-5 gap-y-10 sm:grid-cols-2 sm:my-20 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
        {webtoonsData
          .sort(
            (a, b) =>
              b.NFTs.filter((NFT) => !(NFT.sold_timestamp?.length > 0)).length -
              a.NFTs.filter((NFT) => !(NFT.sold_timestamp?.length > 0)).length
          )
          .sort(
            (a, b) =>
              b.NFTs.filter((NFT) => NFT.timeRemaining > 0).length -
              a.NFTs.filter((NFT) => NFT.timeRemaining > 0).length
          )
          .map((item) => (
            <ListItem key={item.webtoon_id} item={item} />
          ))}
      </main>
    </div>
  );
}
