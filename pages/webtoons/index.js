import { gql } from "@apollo/client";
import client from "../../apollo";
import ListItem from "../../comps/home/ListItem";
import Seo from "../../comps/layout/SEO";

const GET_WEBTOONS_DATA = gql`
  query Home_data {
    webtoons(
      filters: {
        priority: { notNull: true }
        rarement: { id: { notNull: true } }
      }
      sort: "priority"
    ) {
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
          released_timestamp
          publishedAt
          priority
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_WEBTOONS_DATA,
    fetchPolicy: "network-only",
  });
  if (!data) {
    return {
      notFound: true,
      redirect: { destination: "/404", permanent: false },
    };
  }

  const byChainId = (webtoon) => {
    const { chainId } = webtoon.attributes.rarement.data.attributes;
    return process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? chainId === 137
      : chainId === 80001;
  };

  return {
    props: {
      webtoons: data.webtoons.data.filter(byChainId),
    },
  };
}

export default function Webtoons({ webtoons, rarementABI }) {
  return (
    <div className="">
      <Seo title="Webtoons | Rarement" />
      <main className="max-w-[768px] mx-auto px-4 py-14 grid grid-cols-2 gap-3 md:max-w-[630px]">
        {webtoons.map((item, idx) => (
          <ListItem
            key={item.id}
            idx={idx + 1}
            item={item}
            rarementABI={rarementABI}
          />
        ))}
      </main>
    </div>
  );
}
