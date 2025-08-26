import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.headers.authorization) {
    delete req.headers.authorization;
  }

  const { item_seq } = req.query; // 허가 상세조회는 품목기준코드
  const API_URL =
    "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService06/getDrugPrdtPrmsnDtlInq05";
  const SERVICE_KEY = process.env.SERVICE_KEY;

  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    type: "json",
    item_seq,
    numOfRows: "1",
    pageNo: "1",
  });

  try {
    const url = `${API_URL}?${params}`;
    console.log("📡 Request URL (detail):", url);

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
    console.error("❌ detail.js error:", err);
    res.status(500).json({ error: err.message });
  }
}
