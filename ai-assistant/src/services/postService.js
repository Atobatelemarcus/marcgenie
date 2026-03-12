// services/postService.js
import { db } from "../firebase/firebase";
import { ref, push, set, get, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";

// CREATE POST
export const createPost = async (post) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const postRef = push(ref(db, `posts/${user.uid}`));
  const data = {
    ...post,
    id: postRef.key,
    userId: user.uid,
    email: user.email,
    createdAt: Date.now(),
  };

  await set(postRef, data);
  return data;
};

// GET ALL POSTS FOR CURRENT USER
export const getUserPosts = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const snap = await get(ref(db, `posts/${user.uid}`));
  return snap.exists() ? Object.values(snap.val()) : [];
};

// UPDATE POST
export const updatePost = async (postId, content) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  await update(ref(db, `posts/${user.uid}/${postId}`), {
    content,
    updatedAt: Date.now(),
  });
};

// DELETE POST
export const deletePost = async (postId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  await remove(ref(db, `posts/${user.uid}/${postId}`));
};
