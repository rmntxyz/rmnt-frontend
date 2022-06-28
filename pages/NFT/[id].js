import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import client from "../../apollo";
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
  const { id } = context.query;
  const { data } = await client.query({
    query: gql`
      query NFT($nftId: Int!) {
        NFT(id: $nftId) {
          id
          webtoon {
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
      nftId: parseInt(id),
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
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  const currentNFT = NFT.webtoon.NFTs.find(
    (item) => item.id === parseInt(router.query.id)
  );
  return (
    <div className="overflow-hidden">
      <Viewer
        NFT={NFT}
        currentNFT={currentNFT}
        router={router}
        loading={loading}
        handleLoading={handleLoading}
      />
      <Desc
        currentNFT={currentNFT}
        loading={loading}
        exchangeRate={exchangeRate}
      />
      <Specs currentNFT={currentNFT} loading={loading} />
    </div>
  );
}
