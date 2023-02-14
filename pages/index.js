import { gql } from "@apollo/client";
import client from "../apollo";
import AboutBottom from "../comps/home/AboutBottom";
import AboutTop from "../comps/home/AboutTop";
import Artists from "../comps/home/Artists";
import List from "../comps/home/List";
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
          avatarGIF {
            data {
              attributes {
                url
              }
            }
          }
          avatars(pagination: { limit: 200 }) {
            data {
              id
              attributes {
                owned_by {
                  data {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
    artists(pagination: { page: 1, pageSize: 6 }) {
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
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_HOME_DATA,
    // fetchPolicy: "network-only",
  });
  return {
    props: {
      webtoons: data.webtoons.data.slice().sort((a, b) => b.id - a.id),
      // webtoons: data.webtoons.data.slice().sort(
      //   (a, b) =>
      //     Math.min(
      //       ...a.attributes.webtoon_pages.data
      //         .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
      //         .flat(1)
      //         .filter(
      //           (NFT) =>
      //             NFT.attributes.drop_timestamp - new Date().getTime() / 1000 >
      //             0
      //         )
      //         .map((NFT) => NFT.attributes.drop_timestamp)
      //     ) -
      //     Math.min(
      //       ...b.attributes.webtoon_pages.data
      //         .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
      //         .flat(1)
      //         .filter(
      //           (NFT) =>
      //             NFT.attributes.drop_timestamp - new Date().getTime() / 1000 >
      //             0
      //         )
      //         .map((NFT) => NFT.attributes.drop_timestamp)
      //     )
      // ),
      artists: data.artists.data.slice().sort((a, b) => a.id - b.id),
    },
  };
}

export default function Home({ webtoons, artists }) {
  console.log(artists);
  return (
    <div>
      <Seo title="Rarement" />
      <main className="max-w-[768px] mx-auto px-4 md:max-w-[630px]">
        <List data={webtoons} />
        <AboutTop />
        <Artists artists={artists} />
        <AboutBottom />
      </main>
    </div>
  );
}
