import fs from "fs";
import path from "path";
import formidable from "formidable";
import OpenAI from "openai";

export const config = { api: { bodyParser: false } };

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function isSiswati(text) {
  const siswatiWords = ["babe", "make", "unjani", "ngiyabonga", "emanti", "umoya", "indlu"];
  return siswatiWords.some((w) => text.toLowerCase().includes(w));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads";
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload failed." });

    const filePath = files.audio?.filepath;
    if (!filePath) return res.status(400).json({ error: "No file provided." });

    try {
      // 1️⃣ Transcribe the audio
      const transcription = await client.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
      });

      const text = transcription.text;
      const results = [];

      // 2️⃣ Detect and translate
      if (isSiswati(text)) {
        const translation = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a precise translator from siSwati to English." },
            { role: "user", content: `Translate this siSwati text: ${text}` },
          ],
        });

        const translated = translation.choices[0].message.content;
        results.push({
          source: "Speech Upload",
          text,
          translated,
          timestamp: new Date().toISOString(),
        });

        // 3️⃣ Save to live_collections.json
        const file = path.join(process.cwd(), "public", "live_collections.json");
        const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf-8")) : [];
        const updated = [...existing, ...results];
        fs.writeFileSync(file, JSON.stringify(updated, null, 2));
      }

      res.status(200).json({
        success: true,
        message: "Transcription complete.",
        text,
      });
    } catch (e) {
      console.error("Error:", e);
      res.status(500).json({ error: "Processing failed." });
    }
  });
}
