import { auth } from "../firebase/firebase";
import { createPlannedPost } from "./plannerService";

export const generateAndSavePlan = async ({ topic, platform, startMonth, months, frequencyPerWeek }) => {
  const token = await auth.currentUser.getIdToken();

  // Fetch the AI-generated plan
  const res = await fetch("http://localhost:5000/generate-plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ topic, platform, startMonth, months, frequencyPerWeek }),
  });

  const data = await res.json();
  if (!data.success || !data.plan) throw new Error(data.error || "Failed to generate plan");

  // Save each post in Firebase
  const savedPosts = [];
  for (const post of data.plan) {
    const saved = await createPlannedPost({
      title: post.title,
      platform,
      plannedDate: post.date,
    });
    savedPosts.push(saved);
  }

  return savedPosts; // array of created posts with IDs
};
