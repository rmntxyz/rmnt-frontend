import { gql } from "@apollo/client";
import client from "../../apollo";
import Seo from "../../comps/layout/SEO";
// import Desc from "../../comps/profile/Desc";
// import NFT from "../../comps/profile/NFT";
// import Webtoons from "../../comps/profile/Webtoons";

const GET_ARTIST_DATA = gql`
  query Artist($name: String) {
    artists(filters: { first_name: { eq: $name } }) {
      data {
        id
        attributes {
          first_name
          description
          email
          # instagram
          # twitter
          # opensea
          wallet_address
          profile_image {
            data {
              attributes {
                url
              }
            }
          }
          background_image {
            data {
              attributes {
                url
              }
            }
          }
          webtoon_ids {
            data {
              id
              attributes {
                webtoon_id
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
                            name
                            nft_id
                            drop_timestamp
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
                            webtoon_pages {
                              data {
                                attributes {
                                  webtoon_id {
                                    data {
                                      attributes {
                                        title
                                        volume
                                      }
                                    }
                                  }
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
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const { name } = context.query;
  const {
    data: { artists },
  } = await client.query({
    query: GET_ARTIST_DATA,
    variables: {
      name: name,
    },
  });
  const artist = artists.data[0];

  return {
    props: {
      artist: artist,
      //   webtoons: artist.attributes.webtoon_ids.data,
      //   NFTs: artist.attributes.webtoon_ids.data
      //     .map((webtoon) => webtoon.attributes.webtoon_pages.data)
      //     .flat(1)
      //     .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
      //     .flat(1)
      //     .filter((NFT) => !!NFT)
      //     .sort((a, b) => a.id - b.id)
      //     .sort(
      //       (a, b) => a.attributes.drop_timestamp - b.attributes.drop_timestamp
      //     ),
    },
  };
}

export default function Artist({ artist, artists, webtoons, NFTs }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title={artist.attributes.first_name} />
      <main>
        {artist.attributes.first_name}
        {/* <Desc props={artist} /> */}
        {/* <Webtoons
          webtoons={webtoons}
          NFTs={NFTs}
          artist={artist.attributes.first_name}
        />
        <NFT NFTs={NFTs} artist={artist} /> */}
      </main>
    </div>
  );
}
