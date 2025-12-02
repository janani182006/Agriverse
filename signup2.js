import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  doc,
  updateDoc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signupStep2Form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pwd = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();

    const sessionId   = localStorage.getItem("agriverseSignupSessionId");
    const email       = localStorage.getItem("agriverseSignupEmail");
    const phone       = localStorage.getItem("agriverseSignupPhone");
    const name        = localStorage.getItem("agriverseSignupName");

    if (!sessionId || !email || !phone || !name) {
      alert("Signup session lost. Restart signup.");
      window.location.href = "signup.html";
      return;
    }

    // ✅ Password validation
    if (pwd.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(pwd)) {
      alert("Password must contain letters AND numbers.");
      return;
    }

    if (pwd !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    let uid = null;

    try {
      console.log("Trying to create Firebase account...");

      const userCred = await createUserWithEmailAndPassword(auth, email, pwd);
      uid = userCred.user.uid;

      console.log("✅ New account created:", uid);

    } catch (error) {

      if (error.code === "auth/email-already-in-use") {

        console.warn("⚠ Email already exists. Attempting login...");

        try {
          const userCred = await signInWithEmailAndPassword(auth, email, pwd);
          uid = userCred.user.uid;

          console.log("✅ Existing user logged in:", uid);

        } catch (loginErr) {
          console.error("❌ Login failed:", loginErr);

          alert("This email already exists, but password is wrong.");
          return;
        }

      } else {
        console.error("❌ Signup error:", error);
        alert("Signup failed: " + error.message);
        return;
      }
    }

    try {

      // ✅ Fetch signup session
      const sessionRef = doc(db, "signupSessions", sessionId);
      const sessionSnap = await getDoc(sessionRef);

      if (!sessionSnap.exists()) {
        alert("Signup session not found.");
        return;
      }

      const sessionData = sessionSnap.data();

      // ✅ Create or update user in Firestore
      await setDoc(doc(db, "users", uid), {
        fullName: name,
        email: email,
        phone: phone,
        role: "farmer",
        profileImageLocal: sessionData.profileImageStoredLocally || false,
        createdAt: new Date(),
        signupSession: sessionId
      }, { merge: true });

      // ✅ Update signup session
      await updateDoc(sessionRef, {
        status: "ACCOUNT_CREATED",
        linkedUser: uid
      });

      console.log("✅ Firestore user profile created/updated");

      localStorage.removeItem("agriverseSignupPassword");

      window.location.href = "signup3.html";

    } catch (firestoreError) {
      console.error("❌ Firestore Error:", firestoreError);
      alert("Account created, but profile setup failed.");
    }
  });
});
