import { NFTData } from "../../../comps/Homedata";

// function getDropped(NFT) {
//   if (new Date(NFT.drop_timestamp).getTime() > new Date().getTime()) {
//     return false;
//   } else return true;
// }

export default function handler(req, res) {
  try {
    const NFTs = NFTData;
    // const NFTsWithDropped = NFTs.map((NFT) => ({
    //   ...NFT,
    //   dropped: getDropped(NFT),
    // }));
    res.status(200).json(NFTs);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
