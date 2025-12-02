import { auth, db } from "./firebase.js";

import {
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const fieldWrapper = document.getElementById("fieldWrapper");
  let currentUser = null;

  // ✅ Auth check
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert("Session expired. Login again.");
      window.location.href = "login.html";
    } else {
      currentUser = user;
    }
  });

  // ✅ SAFE field count reading
  let fieldCountRaw = localStorage.getItem("agriverseNumberOfFields");
  let fieldCount;

  if (!fieldCountRaw || isNaN(fieldCountRaw)) {
    console.warn("⚠ Invalid field count found. Defaulting to 1.");
    fieldCount = 1;
  } else {
    fieldCount = parseInt(fieldCountRaw);
  }

  console.log("✅ Loaded Field Count:", fieldCount);

  // ✅ Generate UI
  for (let i = 1; i <= fieldCount; i++) {
    const fieldCard = document.createElement("div");
    fieldCard.className = "field-card";

    fieldCard.innerHTML = `
      <h2>Field ${i}</h2>

      <div class="fs-row">
        <select class="crop-type" required>
          <option value="" disabled selected>Select crop</option>
          <option value="Paddy">Paddy</option>
          <option value="Cardamom">Cardamom</option>
          <option value="Cabbage">Cabbage</option>
          <option value="Cauliflower">Cauliflower</option>
        </select>

        <input type="number" class="field-area" placeholder="Field Area (acres)" required />
      </div>

      <h4>Sowed date</h4>
      <input type="date" class="sowed-date" required style="margin-top:10px;" />
    `;

    fieldWrapper.appendChild(fieldCard);
  }

  // ✅ Submit handler
  document.getElementById("fieldSetupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("User not authenticated.");
      return;
    }

    const uid = currentUser.uid;
    const fields = [];
    let isValid = true;

    document.querySelectorAll(".field-card").forEach((card, index) => {

      const crop = card.querySelector(".crop-type").value;
      const area = card.querySelector(".field-area").value;
      const date = card.querySelector(".sowed-date").value;

      if (!crop || !area || !date) {
        alert(`Fill all details for Field ${index + 1}`);
        isValid = false;
        return;
      }

      fields.push({
        crop,
        area: parseFloat(area),
        sowedDate: date
      });
    });

    if (!isValid) return;

    try {

      for (let i = 0; i < fields.length; i++) {

        const fieldData = {
          userId: uid,
          fieldNumber: i + 1,
          crop: fields[i].crop,
          area: fields[i].area,
          sowedDate: fields[i].sowedDate,
          createdAt: new Date()
        };

        const fieldRef = await addDoc(collection(db, "fields"), fieldData);

        await addDoc(collection(db, "users", uid, "fields"), {
          fieldId: fieldRef.id,
          ...fieldData
        });

        console.log(`✅ Field ${i + 1} saved`);
      }

      localStorage.removeItem("agriverseFieldDetails");

      alert("Fields setup complete. Redirecting to dashboard...");
      window.location.href = "dashboard.html";

    } catch (error) {
      console.error("❌ Field save error:", error);
      alert("Failed to save fields. Check console.");
    }
  });
});
