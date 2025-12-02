import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// 🚀 If user already logged in → go to dashboard
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await auth.signOut(); // Force logout during development
    console.log("Auto signed out for testing login");
  }
});


document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Enter both email and password.");
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log("✔ Login successful:", userCred.user.uid);
    
    window.location.href = "dashboard.html"; // SUCCESS
    
  } catch (error) {
    console.error("Login error:", error);
    if (error.code === "auth/wrong-password") alert("Incorrect password.");
    else if (error.code === "auth/user-not-found") alert("Account not found. Sign up first.");
    else if (error.code === "auth/invalid-email") alert("Invalid email address.");
    else alert("Login failed: " + error.message);
  }
});
  const guestBtn = document.getElementById("guestBtn");

if (guestBtn) {
  guestBtn.addEventListener("click", () => {
    // store guest mode
    localStorage.setItem("AGRIVERSE_GUEST", "true");

    console.log("Guest mode activated");

    // redirect to dashboard
    window.location.href = "dashboard.html";
  });
}