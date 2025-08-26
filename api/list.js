import fetch from "node-fetch";

export default async function handler(req, res) {
  const { item_name } = req.query; // 제품 허가목록은 품목명으로 조회

  const API_URL =
    "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService06/getDrugPrdtPrmsnInq06";
  const SERVICE_KEY = process.env.SERVICE_KEY;

  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    type: "json",
    item_name: item_name,
    numOfRows: "5",
    pageNo: "1",
  });

  try {
    const response = await fetch(`${API_URL}?${params}`);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).send({ error: "API returned XML", raw: text });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
