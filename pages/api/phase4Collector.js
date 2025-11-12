import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ make sure you have this in .env.local
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // ✅ Correct path to dictionary in /public/data/
    const dictionaryPath = path.join(process.cwd(), "public", "data", "siswatiDictionary.json");

    if (!fs.existsSync(dictionaryPath)) {
      console.warn("Dictionary file not found at", dictionaryPath);
      return res.status(404).json({ message: "Dictionary file not found" });
    }

    const fileData = fs.readFileSync(dictionaryPath, "utf8");
    const dictionary = JSON.parse(fileData);

    // ✅ Generate 3 new word pairs using AI
    const prompt = `
      Generate 3 simple Siswati-English word pairs in JSON format:
      Example: {"sawubona": "hello", "umsebenti": "work", "inyoni": "bird"}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const newWords = JSON.parse(completion.choices[0].message.content.trim());

    // ✅ Merge with existing dictionary
    const updatedDictionary = { ...dictionary, ...newWords };

    // ✅ Save updated dictionary
    fs.writeFileSync(dictionaryPath, JSON.stringify(updatedDictionary, null, 2), "utf8");

    res.status(200).json({
      success: true,
      message: "Auto-collected new words successfully",
      added: Object.keys(newWords),
    });
  } catch (error) {
    console.error("Auto-collector error:", error);
    res.status(500).json({ success: false, message: "Auto-collector failed", error: error.message });
  }
}
