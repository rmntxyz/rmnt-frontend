import { gql } from "@apollo/client";
import client from "../../apollo";
import { NextSeo } from "next-seo";
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
          webtoon_ids(filters: { publishedAt: { ne: null } }) {
            data {
              id
              attributes {
                webtoon_id
                title
                volume
                released_timestamp
                publishedAt
                cover_image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                rarement {
                  data {
                    id
                    attributes {
                      startTime
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

  if (!artist) {
    return { notFound: true };
  }

  return {
    props: {
      artist: artist,
      webtoons: artist.attributes.webtoon_ids.data,
    },
  };
}

export default function Artist({ artist, webtoons }) {
  const artistName = artist.attributes.first_name;
  const title = `Rarement - ${artistName}`;
  const canonicalUrl = `https://rmnt-frontend-git-develop-rmnt.vercel.app/artists/${artistName}}`;

  return (
    <div>
      <NextSeo
        title={title}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: title,
          images: [
            {
              url: artist.attributes.profile_image?.data?.attributes.url,
              width: 700,
              height: 700,
              alt: title,
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@rmntxyz",
          site: "@rmntxyz",
          cardType: "summary_large_image",
        }}
      />
      <main>
        <Desc props={artist} />
        <Line />
        <Webtoons webtoons={webtoons} />
      </main>
    </div>
  );
}
