import { auth, db } from "./firebase.js";

import {
  doc,
  updateDoc,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupStep3Form");
  const countBtns = document.querySelectorAll(".field-count-btn");
  const errorBox = document.getElementById("errorMessage");

  let selectedFieldCount = 1;
  let currentUser = null;

  // Track logged in user
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      currentUser = user;
    }
  });

  countBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      countBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedFieldCount = parseInt(btn.dataset.count);
    });
  });

  const showMessage = (msg, success = false) => {
    errorBox.innerText = msg;
    errorBox.style.display = "block";
    errorBox.style.color = success ? "green" : "red";
    errorBox.style.borderColor = success ? "green" : "red";
    errorBox.style.background = success ? "#e7ffe6" : "#ffe6e6";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const crop = document.getElementById("primaryCrop").value;
    const terms = document.getElementById("terms").checked;

    if (!crop) {
      showMessage("Please select a primary crop.");
      return;
    }

    if (!terms) {
      showMessage("You must agree to the terms.");
      return;
    }

    if (!currentUser) {
      showMessage("User session expired. Please login again.");
      window.location.href = "login.html";
      return;
    }

    const uid = currentUser.uid;

    try {
      // ✅ Save field data
      localStorage.setItem("agriverseNumberOfFields", selectedFieldCount.toString());
      localStorage.setItem("agriversePrimaryCrop", crop);
      const fieldRef = await addDoc(collection(db, "fields"), {
        userId: uid,
        primaryCrop: crop,
        numberOfFields: selectedFieldCount,
        createdAt: new Date()
      });

      // ✅ Add field under user subcollection
      await addDoc(collection(db, "users", uid, "fields"), {
        fieldRef: fieldRef.id,
        crop: crop,
        numberOfFields: selectedFieldCount,
        createdAt: new Date()
      });

      // ✅ Update user record
      await updateDoc(doc(db, "users", uid), {
        primaryCrop: crop,
        numberOfFields: selectedFieldCount,
        profileSetupCompleted: true
      });

      // ✅ Clear signup temp data
      localStorage.removeItem("agriverseSignupSessionId");
      localStorage.removeItem("agriverseSignupName");
      localStorage.removeItem("agriverseSignupEmail");
      localStorage.removeItem("agriverseSignupPhone");

      showMessage("✔ Profile setup complete! Redirecting...", true);

      // ✅ Redirect
      setTimeout(() => {
        window.location.href = "field.html";
      }, 1200);

    } catch (err) {
      console.error("Signup Step 3 error:", err);
      showMessage("Something went wrong. Try again.");
    }
  });
});
