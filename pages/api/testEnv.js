export default function handler(req, res) {
  res.status(200).json({
    FB_ACCESS_TOKEN: process.env.FB_ACCESS_TOKEN ? "✅ Found token" : "❌ Missing token",
  });
}
