// utils/expandDictionary.js

import fs from "fs";
import path from "path";
import translate from "google-translate-api-x"; // ✅ Fixed import — no more “translate is not a function” issue

// Load the existing SiSwati dictionary (JSON file)
const dictionaryPath = path.join(process.cwd(), "pages", "data", "siswatiDictionary.json");
let dictionary = JSON.parse(fs.readFileSync(dictionaryPath, "utf8"));

// Folder that contains your speech or text files (e.g., content/king_speech.txt)
const contentDir = path.join(process.cwd(), "content");

// ✅ Helper function: Extract unique lowercase words
function extractWords(text) {
  // Match all alphabetic sequences (remove punctuation, etc.)
  return [...new Set(text.toLowerCase().match(/[a-záéíóú’]+/gi))];
}

// ✅ Main function: scan the folder, translate, and expand dictionary
async function expandDictionary() {
  console.log("🚀 Scanning content folder for new SiSwati words...\n");

  // Get all text files in your content folder
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".txt"));

  for (const file of files) {
    console.log(`📄 Reading file: ${file}`);
    const text = fs.readFileSync(path.join(contentDir, file), "utf8");
    const words = extractWords(text);

    for (const word of words) {
      if (!dictionary[word]) {
        try {
          // Translate from SiSwati to English
          const result = await translate(word, { to: "en" });

          if (result && result.text) {
            dictionary[word] = result.text;
            console.log(`🆕 Added: ${word} → ${result.text}`);
          } else {
            console.warn(`⚠️ No translation returned for: ${word}`);
          }
        } catch (error) {
          console.warn(`⚠️ Could not translate "${word}": ${error.message}`);
        }
      }
    }
  }

  // ✅ Save updated dictionary to disk
  fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary, null, 2), "utf8");
  console.log("\n✅ Dictionary updated successfully!");
}

// ✅ Run the script
expandDictionary();
