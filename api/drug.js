import fetch from "node-fetch";

export default async function handler(req, res) {
  const { name } = req.query;

  const API_URL = "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService06";
  const SERVICE_KEY = process.env.SERVICE_KEY; // 🔑 Vercel 환경변수에서 가져오기

  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    type: "json", // ✅ 반드시 JSON으로 요청
    item_name: name,
    numOfRows: "5",
    pageNo: "1",
  });

  try {
    const response = await fetch(`${API_URL}?${params}`);
    const text = await response.text();

    let data;
    try {
      // JSON 파싱 시도
      data = JSON.parse(text);
    } catch {
      // JSON이 아니라면 XML로 온 것 → 그대로 반환
      return res
        .status(500)
        .send({ error: "API returned XML instead of JSON", raw: text });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
