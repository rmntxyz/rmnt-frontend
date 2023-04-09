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
          released_timestamp
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
          rarement {
            data {
              id
              attributes {
                contractAddress
                name
                symbol
                baseURI
                fundingRecipient
                royaltyBPS
                presalePrice
                presaleStartTime
                price
                startTime
                endTime
                maxSupply
                cutoffSupply
                maxMintablePerAccount
                flags
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
    rarementContract {
      data {
        attributes {
          rarementABI
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
      webtoons: data.webtoons.data.slice().sort((a, b) => {
        if (b.attributes.rarement.data === null) return -1;
        if (b.attributes.rarement.data.endTime < Date.now()) return -1;
        if (
          a.attributes.rarement.data.attributes.endTime <
          b.attributes.rarement.data.attributes.endTime
        )
          return -1;
        if (
          a.attributes.rarement.data.attributes.endTime >
          b.attributes.rarement.data.attributes.endTime
        )
          return 1;
      }),
      artists: data.artists.data.slice().sort((a, b) => a.id - b.id),
      rarementABI: data.rarementContract.data.attributes.rarementABI,
    },
  };
}

export default function Home({ webtoons, artists, rarementABI }) {
  return (
    <div className="overflow-hidden">
      <Seo title="Rarement" />
      <main className="max-w-[768px] mx-auto px-4 md:max-w-[630px]">
        <List webtoons={webtoons} rarementABI={rarementABI} />
        <AboutTop />
        <Artists artists={artists} />
        <AboutBottom />
      </main>
    </div>
  );
}
