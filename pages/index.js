import { gql } from "@apollo/client";
import client from "../apollo";
import About from "../comps/home/About";
import List from "../comps/home/List/List";
import TopCard from "../comps/home/TopCard/TopCard";
import Seo from "../comps/SEO";
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
          id
          artist {
            name
            profile_picture
          }
          title
          volume
          pages
          NFTs {
            sold
          }
          timeRemaining
        }
        allWebtoons {
          id
          artist {
            name
            profile_picture
          }
          title
          volume
          pages
          NFTs {
            sold
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
        .sort((a, b) => b.id - a.id)
        .sort((a, b) => b.timeRemaining - a.timeRemaining)
        .filter((item) => item.id !== data.webtoonTop.id),
    },
  };
}

export default function Home({ topData, listData }) {
  return (
    <div className="transition-opacity opacity-100 ease-in">
      <Seo title="Rarement" />
      <main>
        <TopCard data={topData} />
        <List data={listData} />
        <About />
      </main>
    </div>
  );
}
