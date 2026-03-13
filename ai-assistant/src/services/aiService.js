// src/services/aiService.js
import { getAuth } from "firebase/auth";

const BACKEND_URL = "api/generate";

export const generateContent = async ({ prompt, platform, token }) => {
  if (!prompt || !platform) {
    throw new Error("prompt and platform are required");
  }

  // Get Firebase token if not provided
  if (!token) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    token = await user.getIdToken();
  }

  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt, platform }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("AI backend error:", data);
    throw new Error(data.error || "AI generation failed");
  }

  // backend returns: { success: true, content }
  return data;
};
