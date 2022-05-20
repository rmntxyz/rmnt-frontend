import { topData } from "../../../comps/Homedata";
import { getWebtoon } from "./[id]";

async function getTopData() {
  const id = topData.id;
  const topWebtoon = await getWebtoon(id);
  return topWebtoon;
}

export default async function handler(req, res) {
  const topWebtoon = await getTopData();
  res.status(200).json(topWebtoon);
}
