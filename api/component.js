import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  const { name } = req.query; // 의약품 제품 주성분 상세정보 조회는 제품명(한글)으로 조회

  const API_URL =
    "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService06/getDrugPrdtMcpnDtlInq06";
  const SERVICE_KEY = process.env.SERVICE_KEY;

  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    type: "json",
    Prduct: name,
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
