import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { siswati, english } = req.body;

    if (!siswati || !english) {
      return res.status(400).json({
        success: false,
        message: "Both Siswati and English words are required",
      });
    }

    // ✅ Correct path to your dictionary file
    const filePath = path.join(process.cwd(), "public", "data", "siswatiDictionary.json");

    // ✅ If file does not exist, create a new empty one
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2), "utf8");
    }

    // ✅ Read and parse the dictionary file
    const fileData = fs.readFileSync(filePath, "utf8");
    const dictionary = JSON.parse(fileData);

    // ✅ Add or overwrite the word (always lowercase)
    dictionary[siswati.toLowerCase()] = english;

    // ✅ Save back to file
    fs.writeFileSync(filePath, JSON.stringify(dictionary, null, 2), "utf8");

    return res.status(200).json({
      success: true,
      message: `Word '${siswati}' added successfully.`,
    });
  } catch (error) {
    console.error("Error adding word:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding word",
      error: error.message,
    });
  }
}
