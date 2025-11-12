import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const results = [];

    // Example fallback: test sentence for Siswati detection
    const sampleData = [
      { source: "YouTube", text: "Ngiyabonga kakhulu kubo bonkhe labekhona." },
      { source: "Speech", text: "Bayethe! This is the King's speech section." },
      { source: "Facebook", text: "Make utsandza bantfwana bakhe." },
    ];

    // very simple language detector
    const siswatiWords = ["ngiyabonga", "bayethe", "babe", "make", "utsi", "emanti"];
    const isSiswati = (text) =>
      siswatiWords.some((word) => text.toLowerCase().includes(word));

    sampleData.forEach((item) => {
      if (isSiswati(item.text)) {
        results.push({
          source: item.source,
          text: item.text,
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Save collected data
    const filePath = path.join(process.cwd(), "public", "live_collections.json");
    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

    res.status(200).json({
      success: true,
      collected: results.length,
      message: "✅ Live collector ran successfully",
    });
  } catch (error) {
    console.error("Collector error:", error);
    res.status(500).json({
      success: false,
      message: "❌ Collector failed",
      error: error.message,
    });
  }
}
