const url = "https://api.coingate.com/v2/rates/merchant/MATIC/USD";

export async function getExchangeRate() {
  const res = await fetch(url, { mode: "cors" });
  const data = await res.json();
  return data;
}

export default async function handler(req, res) {
  try {
    const data = await getExchangeRate();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
