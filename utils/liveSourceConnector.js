import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictionaryPath = path.join(__dirname, "../pages/data/siswatiDictionary.json");
const contentDir = path.join(__dirname, "../content");
const liveSources = [
  "https://www.gov.sz/index.php?option=com_content&view=article&id=1234", // example Swazi gov speech
  "https://www.times.co.sz/", // example news site
  "https://www.observer.org.sz/"
];

// Function to clean HTML and extract text
function stripHTML(html) {
  return html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ");
}

async function collectLiveData() {
  console.log("🌍 Fetching live SiSwati content sources...");
  const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, "utf8"));

  for (const url of liveSources) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const clean = stripHTML(text);

      const words = clean
        .split(/\s+/)
        .filter(w => /^[a-zA-Záéíóúàèìòù]/.test(w))
        .map(w => w.toLowerCase());

      for (const word of words) {
        if (!dictionary[word]) {
          dictionary[word] = "";
        }
      }

      console.log(`✅ Processed source: ${url}`);
    } catch (err) {
      console.warn(`⚠️ Could not fetch ${url}: ${err.message}`);
    }
  }

  fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary, null, 2), "utf8");
  console.log("📘 Dictionary updated with new live source words!");
}

collectLiveData();
