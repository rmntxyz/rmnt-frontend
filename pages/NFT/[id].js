import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../../apollo";
import Seo from "../../comps/layout/SEO";
import Desc from "../../comps/NFTDetail/Desc";
import Specs from "../../comps/NFTDetail/Specs";
import Viewer from "../../comps/NFTDetail/Viewer";
import { getExchangeRate } from "../api/USD_ETH";

const GET_NFT_DATA = gql`
  query NFT($id: ID!) {
    nft(id: $id) {
      data {
        id
        attributes {
          nft_id
          webtoon_pages {
            data {
              attributes {
                webtoon_id {
                  data {
                    id
                    attributes {
                      webtoon_id
                      title
                      volume
                      artist_id {
                        data {
                          id
                          attributes {
                            first_name
                          }
                        }
                      }
                      webtoon_pages {
                        data {
                          id
                          attributes {
                            nfts {
                              data {
                                id
                                attributes {
                                  nft_id
                                  name
                                  # timeRemaining
                                  # opensea
                                  # metadata
                                  # contract
                                  # license
                                  # reward
                                  description
                                  sold_timestamp
                                  price_in_wei
                                  edition
                                  image {
                                    data {
                                      attributes {
                                        url
                                        width
                                        height
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
  const { id } = context.query;
  const { data } = await client.query({
    query: GET_NFT_DATA,
    variables: {
      id: id,
    },
    fetchPolicy: "network-only",
  });
  return {
    props: {
      exchangeRate: exchangeRate,
      NFT: data.nft.data,
    },
  };
}

export default function NFTPage({ exchangeRate, NFT }) {
  //Use router to identify the currently displayed NFT
  const router = useRouter();
  const currentWebtoon =
    NFT.attributes.webtoon_pages.data[0].attributes.webtoon_id.data;
  const currentWebtoonNFTs = currentWebtoon.attributes.webtoon_pages.data
    .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
    .flat(1)
    .filter((NFT) => !!NFT);
  const currentNFT = currentWebtoonNFTs.find(
    (item) => item.id === router.query.id
  );

  return (
    <div className="overflow-hidden">
      <Seo
        title={
          currentNFT.attributes.name +
          " - " +
          currentWebtoon.attributes.title +
          " by " +
          currentWebtoon.attributes.artist_id.data.attributes.first_name
        }
      />
      <main>
        <Viewer
          currentWebtoon={currentWebtoon}
          currentWebtoonNFTs={currentWebtoonNFTs}
          currentNFT={currentNFT}
          router={router}
        />
        <div className="bg-darkGray py-12 md:py-20">
          <div className="container mx-auto max-w-[72%] flex flex-col gap-6 md:gap-8 xl:grid xl:grid-cols-2 xl:gap-16 xl:w-[1184px] xl:pb-16">
            <Desc
              currentNFT={currentNFT}
              exchangeRate={exchangeRate}
              router={router}
            />
            <Specs
              currentWebtoon={currentWebtoon}
              currentWebtoonNFTs={currentWebtoonNFTs}
              currentNFT={currentNFT}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
