import { gql } from "@apollo/client";
import client from "../../apollo";
import Seo from "../../comps/layout/SEO";
import Desc from "../../comps/profile/Desc";
import UserNFT from "../../comps/profile/UserNFT";

const GET_USER_DATA = gql`
  query User($id: ID) {
    webtoonUser(id: $id) {
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
                nft_id
                name
                edition
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
                      nfts {
                        data {
                          id
                          attributes {
                            name
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
    query: GET_USER_DATA,
    variables: {
      id: id,
    },
  });
  return {
    props: {
      user: data.webtoonUser.data,
      NFTs: data.webtoonUser.data.attributes.nfts?.data,
    },
  };
}

export default function User({ user, NFTs }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title="Rarement" />
      <main>
        <Desc props={user} />
        <UserNFT user={user} NFTs={NFTs} />
      </main>
    </div>
  );
}
