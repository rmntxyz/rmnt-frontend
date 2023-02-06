import { getExchangeRate } from "../api/USD_ETH";
import client from "../../apollo";
import { gql } from "@apollo/client";
import Seo from "../../comps/layout/SEO";
import Tabs from "../../comps/webtoonDetail/Tabs";
import Cover from "../../comps/webtoonDetail/Cover";

const GET_WEBTOON_DATA = gql`
  query Webtoon($id: ID) {
    webtoon(id: $id) {
      data {
        id
        attributes {
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
                wallet_address
                description
                email
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
          # avatars(pagination: { limit: 200 }) {
          #   data {
          #     id
          #   }
          # }
          webtoon_pages(pagination: { limit: 200 }) {
            data {
              id
              attributes {
                webtoon_page_id
                page_number
                page_image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                nfts(pagination: { limit: 200 }) {
                  data {
                    id
                    attributes {
                      nft_id
                      name
                      drop_timestamp
                      sold_timestamp
                      quantity
                      edition
                      price_in_wei
                      # timeRemaining
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
                      owned_by {
                        data {
                          id
                          attributes {
                            user_id
                            first_name
                            wallet_address
                            profile_image {
                              data {
                                attributes {
                                  url
                                }
                              }
                            }
                            nfts {
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
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { webtoonId } = context.query;
  const { data } = await client.query({
    query: GET_WEBTOON_DATA,
    variables: {
      id: webtoonId,
    },
    fetchPolicy: "network-only",
  });
  return {
    props: {
      exchangeRate: exchangeRate,
      webtoon: data.webtoon.data,
      // avatars: data.webtoon.data.attributes.avatars.data,
      episodes: data.webtoon.data.attributes.webtoon_pages.data
        .slice()
        .sort((a, b) => a.attributes.page_number - b.attributes.page_number),
      // .map((page) => page.attributes.page_image.data.attributes.url),
      NFTs: data.webtoon.data.attributes.webtoon_pages.data
        .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
        .flat(1)
        .filter((NFT) => !!NFT)
        .sort((a, b) => a.id - b.id)
        .sort(
          (a, b) => b.attributes.drop_timestamp - a.attributes.drop_timestamp
        ),
      users: data.webtoon.data.attributes.webtoon_pages.data
        .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
        .flat(1)
        .filter((NFT) => !!NFT)
        .map((NFT) => NFT.attributes.owned_by.data),
    },
  };
}

export default function WebtoonPage({
  exchangeRate,
  webtoon,
  episodes,
  NFTs,
  users,
  // avatars
}) {
  // console.log(avatars)
  return (
    <div>
      <Seo
        title={`${webtoon.attributes.artist_id.data.attributes.first_name} - ${webtoon.attributes.title}`}
      />
      <main className="max-w-[768px] mx-auto overflow-hidden md:max-w-[630px]">
        <Cover webtoon={webtoon} />
        <Tabs
          webtoon={webtoon}
          users={users}
          NFTs={NFTs}
          exchangeRate={exchangeRate}
          episodes={episodes}
        />
      </main>
    </div>
  );
}
