import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { word, translation } = req.body;

  if (!word || !translation) {
    return res.status(400).json({ error: "Missing word or translation" });
  }

  // define paths
  const dictionaryPath = path.join(process.cwd(), "public", "siswatiDictionary.json");

  try {
    // read the existing dictionary or create an empty one
    let dictionary = {};
    if (fs.existsSync(dictionaryPath)) {
      dictionary = JSON.parse(fs.readFileSync(dictionaryPath, "utf8"));
    }

    // add or update entry
    dictionary[word.toLowerCase()] = translation;

    // write back to file
    fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary, null, 2));

    console.log(`✅ Added ${word} → ${translation} to dictionary`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating dictionary:", error);
    return res.status(500).json({ error: "Error updating dictionary" });
  }
}
