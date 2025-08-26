import fetch from "node-fetch";

export default async function handler(req, res) {
  const { name } = req.query;

  const API_URL = "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService06";
  const SERVICE_KEY = process.env.SERVICE_KEY; // 🔑 Vercel 환경변수에서 가져오기

  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    type: "json",
    item_name: name,
    numOfRows: "5",
    pageNo: "1"
  });

  try {
    const response = await fetch(`${API_URL}?${params}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
