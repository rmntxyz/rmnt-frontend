import { NFTsUrl } from "../../comps/URLs";
import { getExchangeRate } from "../api/USD_ETH";

export async function getStaticProps(context) {
  const ethData = await getExchangeRate();
  const exchangeRate = ethData[0].current_price;
  const id = context.params.id;
  const NFTRes = await fetch(NFTsUrl + id);
  const NFT = await NFTRes.json();
  return { props: { exchangeRate: exchangeRate, NFT: NFT } };
}

export default function NFTPage({ exchangeRate, NFT }) {
  return <div>{NFT.id}</div>;
}
