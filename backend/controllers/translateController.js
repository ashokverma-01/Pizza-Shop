import axios from "axios";

export const translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const { data } = await axios.post(
      "https://libretranslate.de/translate",
      {
        q: text,
        source: "en",
        target: targetLang || "hi",
        format: "text",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.json({ translatedText: data.translatedText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
