import { auth } from "../firebase/firebase";

// 🔹 Only fetch plan from backend AI, do not save yet
export const generatePlan = async ({ topic, platform, startMonth, months, frequencyPerWeek }) => {
  const token = await auth.currentUser.getIdToken();

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

  return data.plan; // returns array of posts [{title, date}]
};
