import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../../apollo";
import Desc from "../../comps/NFTDetail/Desc";
import Specs from "../../comps/NFTDetail/Specs";
import Viewer from "../../comps/NFTDetail/Viewer";
import Seo from "../../comps/SEO";
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
  const { id } = context.query;
  const { data } = await client.query({
    query: gql`
      query NFT($nftId: String!) {
        NFT(id: $nftId) {
          id
          webtoon {
            id
            title
            volume
            NFTs {
              id
              image_address
              name
              description
              sold
              price
              created_by
              edition
              total_editions
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
      nftId: id,
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
  const router = useRouter();
  const currentNFT = NFT.webtoon.NFTs.find(
    (item) => item.id === router.query.id
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
      <Viewer NFT={NFT} currentNFT={currentNFT} router={router} />
      <Desc currentNFT={currentNFT} exchangeRate={exchangeRate} />
      <Specs currentNFT={currentNFT} />
    </div>
  );
}
