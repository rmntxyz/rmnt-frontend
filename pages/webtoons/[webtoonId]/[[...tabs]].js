import { getExchangeRate } from "../../api/USD_MATIC";
import client from "../../../apollo";
import { gql } from "@apollo/client";
import Seo from "../../../comps/layout/SEO";
import Tabs from "../../../comps/webtoonDetail/Tabs";
import Cover from "../../../comps/webtoonDetail/Cover";

const GET_WEBTOON_DATA = gql`
  query Webtoon($id: String) {
    webtoons(filters: { webtoon_id: { eq: $id } }) {
      data {
        id
        attributes {
          webtoon_id
          title
          volume
          description
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
          rarement {
            data {
              id
              attributes {
                contractAddress
                chainId
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
          collectibles {
            data {
              id
              attributes {
                name
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                thumbnail {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          characters {
            data {
              id
              attributes {
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                name
                description
              }
            }
          }
          episodes(pagination: { limit: 200 }) {
            data {
              id
              attributes {
                episode_number
                released_timestamp
                thumbnail {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          benefits {
            data {
              id
              attributes {
                name
                description
                active
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

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { webtoonId } = context.query;
  const {
    data: { webtoons, rarementContract },
  } = await client.query({
    query: GET_WEBTOON_DATA,
    variables: {
      id: webtoonId,
    },
    // fetchPolicy: "network-only",
  });

  const webtoon = webtoons.data[0];
  const rarementABI = rarementContract.data.attributes.rarementABI;

  return {
    props: {
      exchangeRate: exchangeRate,
      webtoon: webtoon,
      rarementABI,
      collectibles: webtoon.attributes.collectibles.data,
      episodes: webtoon.attributes.episodes.data
        .slice()
        .sort(
          (a, b) => a.attributes.episode_number - b.attributes.episode_number
        ),
      benefits: webtoon.attributes.benefits.data
        .slice()
        .sort((a, b) => a.id - b.id)
        .sort((a, b) => b.attributes.active - a.attributes.active),
    },
  };
}

export default function WebtoonPage(props) {
  const { webtoon } = props;
  return (
    <div>
      <Seo
        title={`${webtoon.attributes.artist_id.data.attributes.first_name} - ${webtoon.attributes.title}`}
      />
      <main className="max-w-[768px] mx-auto md:max-w-[630px]">
        <Cover webtoon={webtoon} />
        <Tabs {...props} />
      </main>
    </div>
  );
}
