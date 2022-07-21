import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../../apollo";
import Seo from "../../comps/layout/SEO";
import Desc from "../../comps/NFTDetail/Desc";
import Specs from "../../comps/NFTDetail/Specs";
import Viewer from "../../comps/NFTDetail/Viewer";
// import { NFTsUrl } from "../../comps/URLs";
import { getExchangeRate } from "../api/USD_ETH";

// export async function getServerSideProps(context) {
//   const exchangeRate = await getExchangeRate();
//   const { id } = context.query;
//   const NFTRes = await fetch(NFTsUrl + id);
//   const NFT = await NFTRes.json();
//   return { props: { exchangeRate: exchangeRate, NFT: NFT } };
// }

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { nft_id } = context.query;
  const { data } = await client.query({
    query: gql`
      query NFT($nftId: String!) {
        NFT(nft_id: $nftId) {
          nft_id
          webtoon {
            webtoon_id
            title
            volume
            NFTs {
              nft_id
              image
              name
              description
              sold_timestamp
              price
              created_by
              edition
              timeRemaining
              opensea
              metadata
              contract
              width
              height
              license
              reward
            }
          }
        }
      }
    `,
    variables: {
      nftId: nft_id,
    },
  });
  return {
    props: {
      exchangeRate: exchangeRate,
      NFT: data.NFT,
    },
  };
}

export default function NFTPage({ exchangeRate, NFT }) {
  //Use router to identify the currently displayed NFT
  const router = useRouter();
  const currentNFT = NFT.webtoon.NFTs.find(
    (item) => item.nft_id === router.query.nft_id
  );
  return (
    <div className="overflow-hidden">
      <Seo
        title={
          currentNFT.name +
          " - " +
          NFT.webtoon.title +
          " by " +
          currentNFT.created_by
        }
      />
      <main>
        <div className="container mx-auto flex flex-col xl:grid xl:grid-cols-2 xl:gap-16 xl:w-[953px] xl:pb-16">
          <Viewer NFT={NFT} currentNFT={currentNFT} router={router} />
          <Desc
            NFT={NFT}
            currentNFT={currentNFT}
            exchangeRate={exchangeRate}
            router={router}
          />
        </div>
        <Specs NFT={NFT} currentNFT={currentNFT} />
      </main>
    </div>
  );
}
