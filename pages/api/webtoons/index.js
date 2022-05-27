import { webtoonData } from "../../../comps/Homedata";

function getUndropped(webtoon) {
  const undropped = webtoon.nft.filter(
    (item) => new Date(item.targetTime).getTime() > new Date().getTime()
  );
  return {
    array: undropped,
    timeRemaining:
      undropped.length > 0
        ? new Date(undropped[0].targetTime).getTime() - new Date().getTime()
        : null,
  };
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
