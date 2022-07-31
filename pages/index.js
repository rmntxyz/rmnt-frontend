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
    // fetchPolicy: "network-only",
  });
  return {
    props: {
      webtoonsData: data.webtoons.data.slice().sort(
        (a, b) =>
          b.attributes.webtoon_pages.data
            .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
            .flat(1)
            .filter((NFT) => !NFT.sold_timestamp).length -
          a.attributes.webtoon_pages.data
            .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
            .flat(1)
            .filter((NFT) => !NFT?.sold_timestamp).length
      ),
      // .sort(
      //   (a, b) =>
      //     b.NFTs.filter((NFT) => NFT.timeRemaining > 0).length -
      //     a.NFTs.filter((NFT) => NFT.timeRemaining > 0).length
      // ),
      // .filter((item) => item.webtoon_id !== data.webtoonTop.webtoon_id),
    },
  };
}

export default function Home({ webtoonsData }) {
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
