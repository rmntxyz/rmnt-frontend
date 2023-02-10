import { gql } from "@apollo/client";
import client from "../../apollo";
import SmallItem from "../../comps/home/SmallItem";
import Seo from "../../comps/layout/SEO";

const GET_WEBTOONS_DATA = gql`
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
          avatarGIF {
            data {
              id
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
                      image {
                        data {
                          attributes {
                            url
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
      }
    }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_WEBTOONS_DATA,
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
    },
  };
}

export default function Webtoons({ webtoons }) {
  return (
    <div className="">
      <Seo title="Webtoons | Rarement" />
      <main className="max-w-[768px] mx-auto px-4 grid grid-cols-2 gap-3 md:max-w-[630px]">
        {webtoons.map((item) => (
          <SmallItem key={item.id} item={item} />
        ))}
      </main>
    </div>
  );
}
