import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Rota principal para evitar "Cannot GET /"
app.get("/", (req, res) => {
  res.send("API do ChatPDF está a funcionar!");
});

// API KEY
const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;

// Endpoint principal
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

// Porta dinâmica para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend ON na porta " + PORT));
