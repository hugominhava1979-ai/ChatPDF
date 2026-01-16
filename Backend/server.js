import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// SUA API KEY (SEGURA)
const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;

app.post("/perguntar", async (req, res) => {
  const { pergunta } = req.body;

  const resposta = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DEEPSEEK_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "user", content: pergunta }
      ]
    })
  });

  const data = await resposta.json();
  const texto = data.choices?.[0]?.message?.content || "Erro na IA";

  res.json({ resposta: texto });
});

app.listen(3000, () => console.log("Backend ON em http://localhost:3000"));
