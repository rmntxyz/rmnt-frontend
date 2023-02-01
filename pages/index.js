import { gql } from "@apollo/client";
import client from "../apollo";
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
          webtoon_pages(pagination: { limit: 200 }) {
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
    artists(pagination: { page: 1, pageSize: 7 }) {
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
    # webtoonUsers(pagination: { page: 1, pageSize: 7 }) {
    #   data {
    #     id
    #     attributes {
    #       user_id
    #       first_name
    #       wallet_address
    #       profile_image {
    #         data {
    #           attributes {
    #             url
    #           }
    #         }
    #       }
    #     }
    #   }
    # }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_HOME_DATA,
    // fetchPolicy: "network-only",
  });
  return {
    props: {
      webtoons: data.webtoons.data.slice().sort(
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
      artists: data.artists.data.slice().sort((a, b) => a.id - b.id),
    },
  };
}

export default function Home({ webtoons, artists }) {
  return (
    <div className="overflow-x-hidden text-ourBlack">
      <Seo title="Rarement" />
      <main className="max-w-[768px] mx-auto md:max-w-[630px]">
        <TopCard item={webtoons[0]} />
        <List data={webtoons.slice(1)} />
        {/* <AboutTop />
        <AboutBottom artists={artists} /> */}
      </main>
    </div>
  );
}
