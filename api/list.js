import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.headers.authorization) {
    delete req.headers.authorization;
  }

  const { name } = req.query; // 제품 허가목록은 품목명으로 조회
  const API_URL =
    "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService06/getDrugPrdtPrmsnInq06";
  const SERVICE_KEY = process.env.SERVICE_KEY;

  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    type: "json",
    item_name: name,
    numOfRows: "5",
    pageNo: "1",
  });

  try {
    const url = `${API_URL}?${params}`;
    console.log("📡 Request URL (list):", url);

    const response = await fetch(url);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("❌ API returned non-JSON:", text.slice(0, 200));
      return res.status(500).json({ error: "API returned XML", raw: text });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ list.js error:", err);
    res.status(500).json({ error: err.message });
  }
}
