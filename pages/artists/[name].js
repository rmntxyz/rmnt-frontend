import { gql } from "@apollo/client";
import client from "../../apollo";
import Seo from "../../comps/layout/SEO";
import Desc from "../../comps/profile/Desc";
import Webtoons from "../../comps/profile/Webtoons";
import Line from "../../utils/Line";

const GET_ARTIST_DATA = gql`
  query Artist($name: String) {
    artists(filters: { first_name: { eq: $name } }) {
      data {
        id
        attributes {
          first_name
          description
          email
          instagram
          twitter
          opensea
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
      webtoons: artist.attributes.webtoon_ids.data,
    },
  };
}

export default function Artist({ artist, webtoons }) {
  return (
    <div>
      <Seo title={artist.attributes.first_name} />
      <main>
        <Desc props={artist} />
        <Line />
        <Webtoons webtoons={webtoons} />
        {/* <NFT NFTs={NFTs} artist={artist} /> */}
      </main>
    </div>
  );
}
