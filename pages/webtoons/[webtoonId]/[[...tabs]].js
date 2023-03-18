import { getExchangeRate } from "../../api/USD_ETH";
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
                # wallet_address
                # description
                # email
                # instagram
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
          avatars(pagination: { limit: 200 }) {
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
                price_in_wei
                sold_timestamp
                owned_by {
                  data {
                    id
                    attributes {
                      wallet_address
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
                # eng_image {
                #   data {
                #     attributes {
                #       url
                #     }
                #   }
                # }
                # kor_image {
                #   data {
                #     attributes {
                #       url
                #     }
                #   }
                # }
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
  }
`;

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { webtoonId } = context.query;
  const {
    data: { webtoons },
  } = await client.query({
    query: GET_WEBTOON_DATA,
    variables: {
      id: webtoonId,
    },
    // fetchPolicy: "network-only",
  });

  const webtoon = webtoons.data[0];

  const currTime = Math.floor(Date.now() / 1000);
  const availableAvatars = webtoon.attributes.avatars.data
    .filter(avatar => !!avatar.attributes.rarement.data)
    .filter(avatar => avatar.attributes.rarement.data.attributes.endTime > currTime)
    .sort((a, b) => a.attributes.rarement.data.attributes.startTime -
                    b.attributes.rarement.data.attributes.startTime);

  return {
    props: {
      exchangeRate: exchangeRate,
      webtoon: webtoon,
      avatar: availableAvatars[0],//: webtoon.attributes.avatars.data,
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

export default function WebtoonPage({
  exchangeRate,
  webtoon,
  episodes,
  collectibles,
  avatar,
  benefits,
}) {
  return (
    <div>
      <Seo
        title={`${webtoon.attributes.artist_id.data.attributes.first_name} - ${webtoon.attributes.title}`}
      />
      <main className="max-w-[768px] mx-auto overflow-hidden md:max-w-[630px]">
        <Cover webtoon={webtoon} />
        <Tabs
          webtoon={webtoon}
          collectibles={collectibles}
          exchangeRate={exchangeRate}
          episodes={episodes}
          avatar={avatar}
          benefits={benefits}
        />
      </main>
    </div>
  );
}
