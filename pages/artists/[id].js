import { gql } from "@apollo/client";
import client from "../../apollo";
import Seo from "../../comps/layout/SEO";
import Desc from "../../comps/profile/Desc";
import NFT from "../../comps/profile/NFT";
import Webtoons from "../../comps/profile/Webtoons";
// import { artistsUrl, NFTsUrl, usersUrl, webtoonsUrl } from "../../comps/URLs";

// export async function getServerSideProps(context) {
//   const { name } = context.query;
//   const artistRes = await fetch(artistsUrl + name);
//   const artist = await artistRes.json();
//   const webtoonsRes = await fetch(webtoonsUrl);
//   const webtoons = await webtoonsRes.json();
//   const artistWebtoons = webtoons.filter(
//     (item) => item.artist_id === artist.id
//   );
//   const NFTsRes = await fetch(NFTsUrl);
//   const NFTs = await NFTsRes.json();
//   const artistNFTs = NFTs.filter((item) => item.created_by === artist.name);
//   const usersRes = await fetch(usersUrl);
//   const users = await usersRes.json();
//   return {
//     props: {
//       artist: artist,
//       webtoons: artistWebtoons,
//       NFTs: artistNFTs,
//       users: users,
//     },
//   };
// }

const GET_ARTIST_DATA = gql`
  query Artist($id: ID) {
    artist(id: $id) {
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
          # background_image {
          #   data {
          #     attributes {
          #       url
          #     }
          #   }
          # }
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
                webtoon_pages {
                  data {
                    attributes {
                      nfts {
                        data {
                          id
                          attributes {
                            name
                            nft_id
                            image {
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
  const { id } = context.query;
  const { data } = await client.query({
    query: GET_ARTIST_DATA,
    variables: {
      id: id,
    },
  });
  return {
    props: {
      artist: data.artist.data,
      webtoons: data.artist.data.attributes.webtoon_ids.data,
      NFTs: data.artist.data.attributes.webtoon_ids.data
        .map((webtoon) => webtoon.attributes.webtoon_pages.data)
        .flat(1)
        .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
        .flat(1)
        .filter((NFT) => !!NFT),
    },
  };
}

export default function Artist({ artist, webtoons, NFTs }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title={artist.attributes.first_name} />
      <main>
        <Desc props={artist} />
        <Webtoons
          webtoons={webtoons}
          NFTs={NFTs}
          artist={artist.attributes.first_name}
        />
        <NFT NFTs={NFTs} artist={artist} />
      </main>
    </div>
  );
}
