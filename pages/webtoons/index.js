import { gql } from "@apollo/client";
import client from "../../apollo";
import ListItem from "../../comps/home/List/ListItem";
import Seo from "../../comps/layout/SEO";

const GET_WEBTOONS_DATA = gql`
  query Home_data {
    webtoons {
      data {
        id
        attributes {
          webtoon_id
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
                      drop_timestamp
                      sold_timestamp
                      # timeRemaining
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_WEBTOONS_DATA,
    // fetchPolicy: "network-only",
  });
  return {
    props: {
      webtoons: data.webtoons.data.slice().sort(
        (a, b) =>
          Math.min(
            ...a.attributes.webtoon_pages.data
              .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
              .flat(1)
              .filter(
                (NFT) =>
                  NFT.attributes.drop_timestamp - new Date().getTime() / 1000 >
                  0
              )
              .map((NFT) => NFT.attributes.drop_timestamp)
          ) -
          Math.min(
            ...b.attributes.webtoon_pages.data
              .map((webtoon_page) => webtoon_page.attributes.nfts?.data)
              .flat(1)
              .filter(
                (NFT) =>
                  NFT.attributes.drop_timestamp - new Date().getTime() / 1000 >
                  0
              )
              .map((NFT) => NFT.attributes.drop_timestamp)
          )
      ),
    },
  };
}

export default function Webtoons({ webtoons }) {
  return (
    <div className="container mx-auto">
      <Seo title="Webtoons | Rarement" />
      <main className="grid mx-8 my-10 gap-x-5 gap-y-10 sm:grid-cols-2 sm:my-20 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
        {webtoons.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </main>
    </div>
  );
}
