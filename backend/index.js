const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;
// Замените "sk" на API-ключ OpenAI он должен начинаться с "sk-", но без продолжения -pro-
const apiKey = "sk-";

app.use(cors());
app.use(express.json());

app.post("/api/message", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(
      "Ошибка при запросе к OpenAI:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Ошибка при обращении к ChatGPT" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
