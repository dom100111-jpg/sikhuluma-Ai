import fs from "fs";
import path from "path";

// 🔠 helper: remove punctuation + soft endings
function cleanVariant(word) {
  return word
    .toLowerCase()
    .replace(/[’']/g, "")     // remove apostrophes
    .replace(/kh/g, "k")      // soft-normalize kh↔k
    .replace(/ngn/g, "ng")    // fix doubled consonants
    .replace(/[^a-záéíóúäëïöüñ]/gi, ""); // keep letters only
}

export default function handler(req, res) {
  try {
    const { word } = req.query;
    if (!word) return res.status(400).json({ error: "Word required" });

    const filePath = path.join(process.cwd(), "pages/data/siswatiDictionary.json");
    const dictionary = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const cleaned = cleanVariant(word);

    // exact match
    if (dictionary[cleaned])
      return res.status(200).json({ normalized: cleaned, meaning: dictionary[cleaned] });

    // fuzzy: look for near-match with small edit distance
    const distance = (a, b) => {
      const dp = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
      );
      for (let i = 0; i <= a.length; i++) dp[i][0] = i;
      for (let j = 0; j <= b.length; j++) dp[0][j] = j;
      for (let i = 1; i <= a.length; i++)
        for (let j = 1; j <= b.length; j++)
          dp[i][j] = a[i - 1] === b[j - 1]
            ? dp[i - 1][j - 1]
            : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      return dp[a.length][b.length];
    };

    let bestWord = "";
    let bestScore = Infinity;

    for (const key of Object.keys(dictionary)) {
      const score = distance(cleaned, key);
      if (score < bestScore) {
        bestScore = score;
        bestWord = key;
      }
    }

    if (bestScore <= 2) {
      return res
        .status(200)
        .json({ normalized: bestWord, meaning: dictionary[bestWord], score: bestScore });
    }

    return res.status(404).json({ normalized: cleaned, meaning: null });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Normalization failed" });
  }
}
