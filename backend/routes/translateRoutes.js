import express from "express";
import fetch from "node-fetch"; // ensure node-fetch installed: npm i node-fetch

const router = express.Router();

// ✅ Route: /api/translate?text=Hello&lang=hi
router.get("/translate", async (req, res) => {
  const { text, lang } = req.query;

  if (!text) return res.status(400).json({ error: "Text is required" });
  if (!lang)
    return res.status(400).json({ error: "Target language is required" });

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|${lang}`
    );

    const data = await response.json();

    // ✅ Extract translated text safely
    const translatedText = data?.responseData?.translatedText || text;

    res.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
