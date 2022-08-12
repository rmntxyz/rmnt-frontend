import Viewer from "../../comps/webtoonDetail/Viewer";
import Desc from "../../comps/webtoonDetail/Desc";
import NFT from "../../comps/webtoonDetail/NFT";
import { getExchangeRate } from "../api/USD_ETH";
import client from "../../apollo";
import { gql } from "@apollo/client";
import Seo from "../../comps/layout/SEO";

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
          webtoon_pages(pagination: { limit: 200 }) {
            data {
              attributes {
                page_image {
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
                      nft_id
                      name
                      drop_timestamp
                      sold_timestamp
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
  const { id } = context.query;
  const { data } = await client.query({
    query: GET_WEBTOON_DATA,
    variables: {
      id: id,
    },
    fetchPolicy: "network-only",
  });
  return {
    props: {
      exchangeRate: exchangeRate,
      webtoon: data.webtoon.data,
      pages: data.webtoon.data.attributes.webtoon_pages.data.map(
        (page) => page.attributes.page_image.data.attributes.url
      ),
      NFTs: data.webtoon.data.attributes.webtoon_pages.data
        .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
        .flat(1)
        .filter((NFT) => !!NFT),
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
  pages,
  NFTs,
  users,
}) {
  return (
    <div className="mt-20 overflow-x-hidden">
      <Seo
        title={`${webtoon.attributes.artist_id.data.attributes.first_name} - ${webtoon.attributes.title}`}
      />
      <main>
        <Viewer data={pages} />
        <Desc item={webtoon} users={users} />
        <NFT NFTs={NFTs} exchangeRate={exchangeRate} />
      </main>
    </div>
  );
}
