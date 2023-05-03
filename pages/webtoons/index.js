import { gql } from "@apollo/client";
import client from "../../apollo";
import ListItem from "../../comps/home/ListItem";
import { NextSeo } from "next-seo";

const GET_WEBTOONS_DATA = gql`
  query Home_data {
    webtoons(filters: { priority: { notNull: true } }, sort: "priority") {
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

  return {
    props: {
      webtoons: data.webtoons.data,
      rarementABI: data.rarementContract.data.attributes.rarementABI,
    },
  };
}

export default function Webtoons({ webtoons, rarementABI }) {
  const title = "Rarement - Webtoons";
  const desc = "List of all webtoons on Rarement";
  const canonicalUrl =
    "https://rmnt-frontend-git-develop-rmnt.vercel.app/webtoons";

  return (
    <div className="">
      <NextSeo
        title={title}
        description={desc}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: title,
          description: desc,
          images: webtoons
            .map((webtoon) => ({
              url: webtoon.attributes.avatarGIF?.data?.attributes.url,
              width: 300,
              height: 300,
              alt: webtoon.attributes.title,
              type: "image/gif",
            }))
            .filter((image) => image.url),
        }}
        twitter={{
          handle: "@rmntxyz",
          site: "@rmntxyz",
          cardType: "summary_large_image",
        }}
      />
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
