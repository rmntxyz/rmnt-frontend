import { NFTsUrl } from "../../comps/URLs";
import { getExchangeRate } from "../api/USD_ETH";

export async function getServerSideProps(context) {
  const exchangeRate = await getExchangeRate();
  const { id } = context.query;
  const NFTRes = await fetch(NFTsUrl + id);
  const NFT = await NFTRes.json();
  return { props: { exchangeRate: exchangeRate, NFT: NFT } };
}

export default function NFTPage({ exchangeRate, NFT }) {
  return <div>{NFT.id}</div>;
}
