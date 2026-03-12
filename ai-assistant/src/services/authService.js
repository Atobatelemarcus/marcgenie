import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword
} from "firebase/auth";

import { auth, db } from "../firebase/firebase";
import { ref, set, update } from "firebase/database";


// REGISTER USER
export const registerUser = async (name, email, password) => {

  const res = await createUserWithEmailAndPassword(auth, email, password);

  // Save name in Firebase Auth
  await updateProfile(res.user, {
    displayName: name
  });

  // Save user in database
  await set(ref(db, `users/${res.user.uid}`), {
    name: name,
    email: email,
    uid: res.user.uid,
    createdAt: Date.now()
  });

  return res.user;
};


// LOGIN
export const loginUser = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};


// LOGOUT
export const logoutUser = async () => {
  await signOut(auth);
};


// RESET PASSWORD
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};


// AUTH LISTENER
export const listenToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};


// UPDATE USER PROFILE (for Settings page)
export const updateUserProfile = async (name, email, password) => {

  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in");

  // Update name
  if (name && name !== user.displayName) {
    await updateProfile(user, { displayName: name });
  }

  // Update email
  if (email && email !== user.email) {
    await updateEmail(user, email);
  }

  // Update password
  if (password && password.length > 0) {
    await updatePassword(user, password);
  }

  // Update database record
  await update(ref(db, `users/${user.uid}`), {
    name: name,
    email: email
  });

  return true;
};