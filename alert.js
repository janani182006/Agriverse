document.addEventListener("DOMContentLoaded", () => {
    console.log("Alerts & Settings page initialized");

    // Load saved user data
    loadSettings();

    // Logout Button Click
    document.querySelector(".logout-btn").addEventListener("click", function () {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("agriverseUser");
            window.location.href = "login.html"; // Adjust as per your project
        }
    });

    // Push Notification Toggle
    const notificationToggle = document.querySelector(".notif-toggle input");
    notificationToggle.addEventListener("change", function () {
        localStorage.setItem("agriverseNotifications", this.checked);
        alert(this.checked ? "Notifications Enabled" : "Notifications Disabled");
    });

    // Bottom Navigation
    document.querySelectorAll(".bottom-nav div").forEach((tab, index) => {
        tab.addEventListener("click", () => {
            const pages = ["dashboard.html", "monitor.html", "market.html","alert.html"];
            window.location.href = pages[index];
        });
    });
});

// Function to Load User Settings
function loadSettings() {
    const defaultUser = {
        username: "harini",
        phone: "9080776321",
        village: "madurai",
        district: "North Sikkim",
        mainCrop: "Cabbage",
        fields: "2"
    };

    const userData = JSON.parse(localStorage.getItem("agriverseUser")) || defaultUser;

    document.querySelector(".profile-row div strong").textContent = userData.username;
    document.querySelector(".profile-row div small").textContent = userData.phone;

    const details = document.querySelectorAll(".settings-details div");
    details[0].innerHTML = `<strong>Village</strong><br>${userData.village}`;
    details[1].innerHTML = `<strong>District</strong><br>${userData.district}`;
    details[2].innerHTML = `<strong>Main Crop</strong><br>${userData.mainCrop}`;
    details[3].innerHTML = `<strong>Fields</strong><br>${userData.fields}`;

    // Load notification preference
    const notifToggle = document.querySelector(".notif-toggle input");
    notifToggle.checked = localStorage.getItem("agriverseNotifications") === "true";
}



