import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { word, translation, feedback } = req.body;

  if (!word || !translation) {
    return res.status(400).json({ error: "Missing word or translation" });
  }

  const dataDir = path.join(process.cwd(), "content");
  const filePath = path.join(dataDir, "community_submissions.json");

  const newEntry = {
    word,
    translation,
    feedback: feedback || "",
    timestamp: new Date().toISOString(),
  };

  try {
    let existing = [];
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    existing.push(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving submission:", error);
    return res.status(500).json({ error: "Error saving submission" });
  }
}
