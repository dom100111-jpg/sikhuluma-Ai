import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dictionaryPath = path.join(process.cwd(), "public/siswatiDictionary.json");
    const data = JSON.parse(fs.readFileSync(dictionaryPath, "utf8"));
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error reading dictionary:", err);
    return res.status(500).json({ success: false, message: "Failed to load dictionary" });
  }
}
