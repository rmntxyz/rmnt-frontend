import { userData } from "../../../comps/Homedata";

export default function handler(req, res) {
  try {
    const users = userData;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
