import { gql } from "@apollo/client";
import client from "../apollo";
import About from "../comps/home/About";
import List from "../comps/home/List/List";
import TopCard from "../comps/home/TopCard/TopCard";
import Seo from "../comps/layout/SEO";

const GET_HOME_DATA = gql`
  query Home_data {
    webtoons {
      data {
        id
        attributes {
          webtoon_id
          artist_id {
            data {
              id
              attributes {
                first_name
                profile_image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          title
          volume
          cover_image {
            data {
              attributes {
                url
              }
            }
          }
          webtoon_pages {
            data {
              attributes {
                nfts {
                  data {
                    id
                    attributes {
                      drop_timestamp
                      sold_timestamp
                      # timeRemaining
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_HOME_DATA,
    fetchPolicy: "network-only",
  });
  return {
    props: {
      webtoonsData: data.webtoons.data.slice().sort(
        (a, b) =>
          Math.min(
            ...a.attributes.webtoon_pages.data
              .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
              .flat(1)
              .filter(
                (NFT) =>
                  NFT.attributes.drop_timestamp - new Date().getTime() / 1000 >
                  0
              )
              .map((NFT) => NFT.attributes.drop_timestamp)
          ) -
          Math.min(
            ...b.attributes.webtoon_pages.data
              .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
              .flat(1)
              .filter(
                (NFT) =>
                  NFT.attributes.drop_timestamp - new Date().getTime() / 1000 >
                  0
              )
              .map((NFT) => NFT.attributes.drop_timestamp)
          )
      ),
    },
  };
}

export default function Home({ webtoonsData }) {
  console.log();

  return (
    <div className="overflow-x-hidden">
      <Seo title="Rarement" />
      <main>
        <TopCard item={webtoonsData[0]} />
        <List data={webtoonsData.slice(1)} />
        <About />
      </main>
    </div>
  );
}
