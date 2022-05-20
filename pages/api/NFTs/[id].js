import { NFTsUrl } from "../../../comps/URLs";

async function getNFT(id) {
  const NFTsRes = await fetch(NFTsUrl);
  const NFTsData = await NFTsRes.json();
  const NFT = NFTsData.find((item) => item.id === parseInt(id));
  return NFT;
}

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const NFT = await getNFT(id);
    if (!NFT) {
      return res.status(404).json({ status: 404, message: "Not found" });
    }
    res.status(200).json(NFT);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
