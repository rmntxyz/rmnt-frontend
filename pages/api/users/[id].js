import { usersUrl } from "../../../comps/URLs";

async function getUser(id) {
  const usersRes = await fetch(usersUrl);
  const usersData = await usersRes.json();
  const user = usersData.find((item) => item.id === parseInt(id));
  return user;
}

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({ status: 404, message: "Not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to lad" });
  }
}
