import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { word, language } = req.body;

    if (!word) {
      return res.status(400).json({ error: "No word provided" });
    }

    // 🧠 Choose a natural voice model
    const model = "gpt-4o-mini-tts"; // Text-to-speech model
    const voice = language === "Siswati" ? "alloy" : "verse"; // choose different tone styles

    // 🗣️ Generate speech from the given word
    const response = await openai.audio.speech.create({
      model,
      voice,
      input: word,
      format: "mp3",
    });

    // Convert response to base64 for audio playback
    const audioBuffer = Buffer.from(await response.arrayBuffer());
    const audioBase64 = audioBuffer.toString("base64");

    res.status(200).json({
      audioUrl: `data:audio/mpeg;base64,${audioBase64}`,
    });
  } catch (error) {
    console.error("Voice generation failed:", error);
    res.status(500).json({ error: "Error generating voice" });
  }
}
