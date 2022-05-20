import { topData } from "../../../comps/Homedata";
import { getWebtoon } from "./[id]";

async function getTopData() {
  const id = topData.id;
  const topWebtoon = await getWebtoon(id);
  return topWebtoon;
}

function getTimeRemaining(targetTime) {
  const timeRemaining = new Date(targetTime).getTime() - new Date().getTime();
  return timeRemaining;
}

export default async function handler(req, res) {
  const topWebtoon = await getTopData();
  const targetTime = topWebtoon.undropped[0].targetTime;
  const timeRemaining = getTimeRemaining(targetTime);
  res
    .status(200)
    .json({
      ...topWebtoon,
      targetTime: targetTime,
      timeRemaining: timeRemaining,
    });
}
