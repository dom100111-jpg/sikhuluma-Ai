import fs from "fs";
import path from "path";

// simple keyword check (can later expand with AI)
const siswatiKeywords = ["sawubona", "unjani", "siyabonga", "babe", "make", "emanti", "indlu", "emhlabeni"];

export default async function handler(req, res) {
  try {
    // Example sources (you'll replace with real APIs)
    const sources = [
      "https://raw.githubusercontent.com/datasets/quotes/master/quotes.json", // placeholder text feed
    ];

    let collected = [];

    for (const url of sources) {
      const response = await fetch(url);
      const data = await response.text();

      siswatiKeywords.forEach((word) => {
        if (data.toLowerCase().includes(word)) {
          collected.push({ word, source: url, timestamp: new Date().toISOString() });
        }
      });
    }

    const filePath = path.join(process.cwd(), "public", "global_collections.json");
    fs.writeFileSync(filePath, JSON.stringify(collected, null, 2));

    res.status(200).json({ success: true, collectedCount: collected.length });
  } catch (error) {
    console.error("Collector error:", error);
    res.status(500).json({ success: false, message: "Error collecting data" });
  }
}
