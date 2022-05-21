// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export function getCurrentTime() {
  return new Date();
}

export default function handler(req, res) {
  const { method } = req;
  const currentTime = getCurrentTime();
  res.status(200).json({ utc_datetime: currentTime });
  res.setHeader("Access-Control-Allow-Headers");
  res.status(405).end(`Method ${method} Not Allowed`);
}

// export async function getTimeWithApi() {
//   const res = await fetch('http://worldtimeapi.org/api/ip');
//   const data = await res.json();
//   return data.utc_datetime
// }
