import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // ✅ Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    // ✅ Get Siswati word and new English meaning from request
    const { word, newMeaning } = req.body;

    if (!word || !newMeaning) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    // ✅ Correct file path (points to /public/data/)
    const dictionaryPath = path.join(
      process.cwd(),
      "public",
      "data",
      "siswatiDictionary.json"
    );

    // ✅ Check if dictionary file exists
    if (!fs.existsSync(dictionaryPath)) {
      return res.status(404).json({
        success: false,
        message: "Dictionary file not found",
      });
    }

    // ✅ Read and parse current dictionary file
    const fileData = fs.readFileSync(dictionaryPath, "utf8");
    const dictionary = JSON.parse(fileData);

    // ✅ Update the word (convert to lowercase to prevent duplicates)
    dictionary[word.toLowerCase()] = newMeaning;

    // ✅ Write updated dictionary back to file
    fs.writeFileSync(
      dictionaryPath,
      JSON.stringify(dictionary, null, 2),
      "utf8"
    );

    return res.status(200).json({
      success: true,
      message: `Word '${word}' updated successfully.`,
    });
  } catch (error) {
    console.error("Error updating word:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating word",
      error: error.message,
    });
  }
}
