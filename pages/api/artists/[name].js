import { artistsUrl } from "../../../comps/URLs";

async function getArtist(name) {
  const artistsRes = await fetch(artistsUrl);
  const artistsData = await artistsRes.json();
  const artist = artistsData.find((artist) => artist.name === name);
  return artist;
}

export default async function handler(req, res) {
  try {
    const { name } = req.query;
    const artist = await getArtist(name);
    if (!artist) {
      return res.status(404).json({ status: 404, message: "Not found" });
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
