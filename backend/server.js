import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import "dotenv/config";
import OpenAI from "openai";
import { PLATFORM_RULES } from "./platformRules.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ===== Firebase Admin =====
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://marcgenie-web-default-rtdb.firebaseio.com",
});

// ===== OpenAI =====
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ===== Generate Post =====
app.post("/generate", async (req, res) => {
  try {
    // 🔐 Auth
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const userId = decoded.uid;

    const { prompt, platform } = req.body;
    if (!prompt || !platform) {
      return res.status(400).json({ error: "prompt and platform required" });
    }

    const rules = PLATFORM_RULES[platform];
    if (!rules) {
      return res.status(400).json({ error: "Invalid platform" });
    }

    const fullPrompt = `
You are an expert content creator.

Platform: ${rules.name}
Style: ${rules.style}
Hook: ${rules.hook}
Max Length: ${rules.maxLength}

User idea:
${prompt}

Rules:
- Generate original content
-use AIDA format style do not sectionalize make it semantic
- Don't use this  sign — at all
- Make the hook bold and the title
- use a very strong and compelling hook
-Do not write rigidly be more human with humourous tone
-write in my nigerian tone
-Always add CTA
- make sure the post is has summary and conclusions
- Do NOT repeat the prompt
- Respect max length
`;

    // ✅ CORRECT OpenAI call
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: fullPrompt,
      temperature: 0.7,
      max_output_tokens: 400,
    });

    // ✅ CORRECT way to read text
    const text = response.output_text?.trim();
aa
    if (!text) {
      console.error("EMPTY AI RESPONSE:", response);
      return res.status(500).json({ error: "AI returned empty content" });
    }

    // 💾 Save to Firebase
    await admin.database().ref(`users/${userId}/generatedContent`).push({
      prompt,
      platform,
      content: text,
      createdAt: Date.now(),
    });

    return res.json({ success: true, content: text });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


