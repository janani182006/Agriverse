import { db } from "./firebase.js";

import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signupForm");
  const profileInput = document.getElementById("profileInput");
  const profilePreview = document.getElementById("profilePreview");
  const profileIcon = document.getElementById("profileIcon");

  let profileImageBase64 = null;

  // ============ IMAGE PREVIEW + LOCAL SAVE ============
  profileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      profileImageBase64 = event.target.result;

      // Show preview
      profilePreview.src = profileImageBase64;
      profilePreview.style.display = "block";
      profileIcon.style.display = "none";

      // Store locally
      localStorage.setItem("agriverseProfileImage", profileImageBase64);
    };

    reader.readAsDataURL(file);
  });

  // ============ FORM SUBMIT ============
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
      alert("Please fill all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Enter a valid email address.");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    try {

      // Store signup data in Firestore
      const signupSessionRef = await addDoc(collection(db, "signupSessions"), {
        fullName: name,
        email: email,
        phone: "+91" + phone,
        profileImageStoredLocally: true,
        status: "STEP1_COMPLETED",
        createdAt: new Date()
      });

      const sessionId = signupSessionRef.id;

      // Save data in localStorage for next step
      localStorage.setItem("agriverseSignupSessionId", sessionId);
      localStorage.setItem("agriverseSignupName", name);
      localStorage.setItem("agriverseSignupEmail", email);
      localStorage.setItem("agriverseSignupPhone", "+91" + phone);

      console.log("Signup session created:", sessionId);
      

      // Move to Step 2
      window.location.href = "signup2.html";

    } catch (error) {
      console.error("Error in SignUp Step 1:", error);
      alert("Something went wrong. Try again.");
    }
  });

});
