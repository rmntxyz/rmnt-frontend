import { gql } from "@apollo/client";
import client from "../../apollo";
import ListItem from "../../comps/home/ListItem";
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
          released_timestamp
          publishedAt
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
    // fetchPolicy: "network-only",
  });
  if (!data) {
    return {
      notFound: true,
      redirect: { destination: "/404", permanent: false },
    };
  }
  return {
    props: {
      webtoons: data.webtoons.data.slice().sort((a, b) => b.id - a.id),
      rarementABI: data.rarementContract.data.attributes.rarementABI,
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
