import { artistData } from "../../../comps/Homedata";

export default async function handler(req, res) {
  try {
    const artists = artistData;
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
