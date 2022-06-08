import { topData } from "../../../comps/Homedata";
import { getWebtoon } from "./[id]";

async function getTopData() {
  const id = topData.id;
  const topWebtoon = await getWebtoon(id);
  return topWebtoon;
}

export default async function handler(req, res) {
  try {
    const topWebtoon = await getTopData();
    if (!topWebtoon) {
      return res.status(404).json({ status: 404, message: "Not found" });
    }
    res.status(200).json(topWebtoon);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
