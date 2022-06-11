import { NFTsUrl } from "../../../comps/URLs";

async function getNFTGroups() {
  const NFTsRes = await fetch(NFTsUrl);
  const NFTs = await NFTsRes.json();
  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  const groups = groupBy(NFTs, "editions_title");
  const finalGroups = [];

  for (const key in groups) {
    finalGroups.push({
      categoryName: key,
      children: groups[key],
      collectors: groups[key].map((item) => item.owned_by),
    });
  }
  return finalGroups;
}

export default async function handler(req, res) {
  try {
    const NFTGroups = await getNFTGroups();
    const NFTGroupsWithIndex = NFTGroups.map((group, idx) => ({
      ...group,
      index: idx + 1,
    }));
    res.status(200).json(NFTGroupsWithIndex);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
