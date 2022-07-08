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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Webtoons_data {
        allWebtoons {
          id
          artist {
            name
            profile_picture
          }
          title
          volume
          cover_image
          NFTs {
            sold
          }
          timeRemaining
          sold
        }
      }
    `,
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
          // .sort((a, b) => b.id - a.id)
          // .sort((a, b) => a.sold - b.sold)
          .sort((a, b) => b.timeRemaining - a.timeRemaining)
          .sort((a, b) => a.sold - b.sold)
          .map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
      </main>
    </div>
  );
}
