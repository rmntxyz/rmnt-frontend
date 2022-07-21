import { gql } from "@apollo/client";
import client from "../apollo";
import About from "../comps/home/About";
import List from "../comps/home/List/List";
import TopCard from "../comps/home/TopCard/TopCard";
import Seo from "../comps/layout/SEO";
// import { listUrl, topUrl } from "../comps/URLs";

// export async function getServerSideProps() {
//   const topRes = await fetch(topUrl);
//   const topData = await topRes.json();
//   const listRes = await fetch(listUrl);
//   const listData = await listRes.json();
//   return { props: { topData: topData, listData: listData } };
// }

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Home_data {
        webtoonTop {
          webtoon_id
          artist {
            name
            profile_image
          }
          title
          volume
          cover_image
          NFTs {
            sold_timestamp
          }
          timeRemaining
        }
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
          }
          timeRemaining
        }
      }
    `,
  });
  return {
    props: {
      topData: data.webtoonTop,
      listData: data.allWebtoons
        .slice()
        .sort((a, b) => b.timeRemaining - a.timeRemaining)
        .sort(
          (a, b) =>
            b.NFTs.filter(
              (NFT) =>
                (NFT.sold_timestamp === null) |
                (NFT.sold_timestamp === undefined) |
                (NFT.sold_timestamp === "")
            ).length -
            a.NFTs.filter(
              (NFT) =>
                (NFT.sold_timestamp === null) |
                (NFT.sold_timestamp === undefined) |
                (NFT.sold_timestamp === "")
            ).length
        )
        .filter((item) => item.webtoon_id !== data.webtoonTop.webtoon_id),
    },
  };
}

export default function Home({ topData, listData }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title="Rarement" />
      <main>
        <TopCard data={topData} />
        <List data={listData} />
        <About />
      </main>
    </div>
  );
}
