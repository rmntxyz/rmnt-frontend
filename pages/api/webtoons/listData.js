import { topUrl, webtoonsUrl } from "../../../comps/URLs";

export async function getWebtoons() {
  const webtoonRes = await fetch(webtoonsUrl);
  const webtoonData = await webtoonRes.json();
  return webtoonData;
}

async function getTopData() {
  const topRes = await fetch(topUrl);
  const topData = await topRes.json();
  return topData;
}

export default async function handler(req, res) {
  try {
    const webtoonData = await getWebtoons();
    const topData = await getTopData();
    const listData = webtoonData
      .sort((a, b) => b.id - a.id)
      .sort((a, b) => b.undropped.length - a.undropped.length)
      .filter((item) => item.id !== topData.id);
    res.status(200).json(listData);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
