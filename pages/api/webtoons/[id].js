import { webtoonsUrl } from "../../../comps/URLs";

export async function getWebtoon(id) {
  const webtoonRes = await fetch(webtoonsUrl);
  const webtoonData = await webtoonRes.json();
  const webtoon = webtoonData.find((item) => item.id === parseInt(id));
  return webtoon;
}

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const webtoon = await getWebtoon(id);
    if (!webtoon) {
      return res.status(404).json({ status: 404, message: "Not found" });
    }
    res.status(200).json(webtoon);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
