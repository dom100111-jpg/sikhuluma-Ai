import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "content", "community_submissions.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    if (!fs.existsSync(filePath)) return res.status(200).json([]);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { word, translation } = req.body;
    if (!word || !translation) return res.status(400).json({ error: "Missing data" });

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const updated = data.filter(
      (item) => item.word !== word || item.translation !== translation
    );
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}
