import { db } from "../firebase/firebase";
import { ref, push, get, update } from "firebase/database";
import { auth } from "../firebase/firebase";

// 🔹 Create planned post
export const createPlannedPost = async (data) => {
  const uid = auth.currentUser.uid;
  const postRef = ref(db, `planner/${uid}`);
  const newRef = push(postRef);

  await update(newRef, {
    ...data,
    createdAt: Date.now(),
  });

  return { id: newRef.key, ...data };
};

// 🔹 Get planned posts
export const getPlannedPosts = async () => {
  const uid = auth.currentUser.uid;
  const snapshot = await get(ref(db, `planner/${uid}`));

  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([id, value]) => ({
    id,
    ...value,
  }));
};

// 🔹 Update planned post (THIS FIXES YOUR ERROR)
export const updatePostPlan = async (id, updates) => {
  const uid = auth.currentUser.uid;
  const postRef = ref(db, `planner/${uid}/${id}`);

  await update(postRef, updates);
};
