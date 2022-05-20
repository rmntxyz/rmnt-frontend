import { getWebtoons } from "../webtoons/listData";

export async function getAllNFTs() {
  let AllNFTs = [];
  const webtoonData = await getWebtoons();
  webtoonData.map((item) => item.nft.forEach((item) => AllNFTs.push(item)));
  return AllNFTs;
}

function getDropped(NFT) {
  if (new Date(NFT.targetTime).getTime() > new Date().getTime()) {
    return false;
  } else return true;
}

export default async function handler(req, res) {
  try {
    const AllNFTs = await getAllNFTs();
    const AllNFTsWithDropped = AllNFTs.map((NFT) => ({
      ...NFT,
      dropped: getDropped(NFT),
    }));
    res.status(200).json(AllNFTsWithDropped);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
