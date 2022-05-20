import { webtoonData } from "../../../comps/Homedata";

function getUndropped(webtoon) {
  const undropped = webtoon.nft.filter(
    (item) => new Date(item.targetTime).getTime() > new Date().getTime()
  );
  return undropped;
}

export default function handler(req, res) {
  try {
    const webtoonDataWithUndropped = webtoonData.map((webtoon) => ({
      ...webtoon,
      undropped: getUndropped(webtoon),
    }));
    res.status(200).json(webtoonDataWithUndropped);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
