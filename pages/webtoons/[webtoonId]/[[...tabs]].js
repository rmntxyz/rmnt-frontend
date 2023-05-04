import { getExchangeRate } from "../../api/USD_MATIC";
import client from "../../../apollo";
import { gql } from "@apollo/client";
// import { NextSeo } from "next-seo";
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
          collectibles(filters: { publishedAt: { ne: null } }) {
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
          characters(filters: { publishedAt: { ne: null } }) {
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
          episodes(
            pagination: { limit: 200 }
            filters: { publishedAt: { ne: null } }
          ) {
            data {
              id
              attributes {
                episode_number
                released_timestamp
                publishedAt
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
  if (!webtoon) {
    return {
      notFound: true,
      redirect: { destination: "/404", permanent: false },
    };
  }
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
  const title = `Rarement - ${webtoon.attributes?.title}`;
  // const desc = webtoon?.attributes?.description;
  // const canonicalUrl = `https://www.rmnt.xyz/webtoons/${webtoon.attributes.webtoon_id}`;

  return (
    <div>
      {/* <NextSeo
        title={title}
        description={desc}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: title,
          description: desc,
          images: [
            {
              url: webtoon.attributes.avatarGIF?.data?.attributes.url,
              width: 300,
              height: 300,
              alt: title,
              type: "image/gif",
            },
          ],
        }}
        twitter={{
          handle: "@rmntxyz",
          site: "@rmntxyz",
          cardType: "summary_large_image",
        }}
      /> */}
      <Seo title={title} />
      <main className="max-w-[768px] mx-auto md:max-w-[630px]">
        <Cover webtoon={webtoon} />
        <Tabs {...props} />
      </main>
    </div>
  );
}
