import { webtoonData } from "../../../comps/Homedata";
import { artistsUrl, NFTsUrl } from "../../../comps/URLs";

export default async function handler(req, res) {
  try {
    const artistsRes = await fetch(artistsUrl);
    const artists = await artistsRes.json();
    const allNFTsRes = await fetch(NFTsUrl);
    const allNFTs = await allNFTsRes.json();
    const webtoons = webtoonData.map((webtoon) => ({
      ...webtoon,
      artist: artists.find((item) => item.id === webtoon.artist_id),
      NFTs: allNFTs.filter((item) => item.webtoon_id === webtoon.id),
      timeRemaining:
        allNFTs
          .filter((item) => item.webtoon_id === webtoon.id)
          .filter((item) => item.sold === false).length > 0
          ? new Date(
              allNFTs
                .filter((item) => item.webtoon_id === webtoon.id)
                .filter((item) => item.sold === false)[0].drop_timestamp
            ).getTime() - new Date().getTime()
          : null,
    }));
    res.status(200).json(webtoons);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
