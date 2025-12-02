document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("fieldSelect"); // Correct dropdown ID
    const fieldCount = parseInt(localStorage.getItem("agriverseNumberOfFields") || 1);
    const fields = JSON.parse(localStorage.getItem("agriverseFieldDetails")) || [];

    dropdown.innerHTML = ""; // Clear existing options

    // Populate dynamically
    for (let i = 1; i <= fieldCount; i++) {
        let opt = document.createElement("option");
        opt.value = i - 1;

        // Optional: Show crop name inside dropdown if available
        opt.textContent = fields[i - 1]?.crop
            ? `Field ${i} (${fields[i - 1].crop})`
            : `Field ${i}`;

        dropdown.appendChild(opt);
    }

    // Load dashboard for the first field
    updateDashboard(0);

    // Update when changing field
    dropdown.addEventListener("change", () => updateDashboard(dropdown.value));
});

// Function to update dashboard - not needed as HTML is static
// Keeping for future dynamic updates if needed
function updateDashboard(index) {
    // Dashboard cards are static in HTML, no need to update dynamically
    // This function can be used for future dynamic data updates
    updateCropIntelligence();
}

// Graph navigation - redirects to graphs page
function showGraph(param) {
    window.location.href = 'graphs.html';
}
// Function to navigate pages
function navigate(page) {
    window.location.href = page;
}

// Function to go to graphs page
function openGraph(param) {
    // Navigate to graphs page - all graphs are shown there
    window.location.href = 'graphs.html';
}

// Update Crop Intelligence data based on current sensor readings
function updateCropIntelligence() {
    try {
        // Get current values from dashboard cards
        const cards = document.querySelectorAll('.card');
        if (cards.length < 5) return;
        
        const moisture = parseFloat(cards[0].querySelector('.value').textContent);
        const temp = parseFloat(cards[1].querySelector('.value').textContent);
        const npk = cards[3].querySelector('.value').textContent;
        const par = parseFloat(cards[4].querySelector('.value').textContent);
        
        // Update comparison table
        const currentMoisture = document.getElementById('currentMoisture');
        const currentTemp = document.getElementById('currentTemp');
        const currentNPK = document.getElementById('currentNPK');
        const currentPAR = document.getElementById('currentPAR');
        
        if (currentMoisture && !isNaN(moisture)) {
            currentMoisture.textContent = moisture + '%';
        }
        if (currentTemp && !isNaN(temp)) {
            currentTemp.textContent = temp + '°C';
        }
        if (currentNPK && npk) {
            const npkValues = npk.split('/').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
            if (npkValues.length > 0) {
                const npkAvg = npkValues.reduce((a, b) => a + b, 0) / npkValues.length;
                currentNPK.textContent = Math.round(npkAvg);
            }
        }
        if (currentPAR && !isNaN(par)) {
            currentPAR.textContent = Math.round(par);
        }
        
        // Get crop info from localStorage if available
        const fields = JSON.parse(localStorage.getItem("agriverseFieldDetails") || "[]");
        if (fields.length > 0) {
            const currentField = fields[0];
            const cropNameEl = document.getElementById('cropName');
            if (cropNameEl && currentField.crop) {
                cropNameEl.textContent = currentField.crop;
            }
            
            // Calculate days since sowing
            if (currentField.date) {
                const sowDate = new Date(currentField.date);
                const today = new Date();
                const days = Math.floor((today - sowDate) / (1000 * 60 * 60 * 24));
                const cropDaysEl = document.getElementById('cropDays');
                if (cropDaysEl && days >= 0) {
                    cropDaysEl.textContent = days;
                }
            }
        }
    } catch (error) {
        console.error('Error updating crop intelligence:', error);
    }
}

// Initialize pump button functionality
function initPumpButton() {
    const pumpBtn = document.getElementById('pumpBtn');
    const pumpStatus = document.getElementById('pumpStatus');
    
    if (pumpBtn && pumpStatus) {
        pumpBtn.addEventListener('click', () => {
            if (pumpBtn.innerText === "TURN ON") {
                pumpBtn.innerText = "TURN OFF";
                pumpBtn.classList.add('active');
                pumpStatus.textContent = "Pump is ON";
            } else {
                pumpBtn.innerText = "TURN ON";
                pumpBtn.classList.remove('active');
                pumpStatus.textContent = "Pump is OFF";
            }
        });
    }
}

// Initialize everything on page load
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("fieldSelect");
    const fieldCount = parseInt(localStorage.getItem("agriverseNumberOfFields") || 1);
    const fields = JSON.parse(localStorage.getItem("agriverseFieldDetails") || "[]");

    if (dropdown) {
        dropdown.innerHTML = "";

        // Populate dynamically
        for (let i = 1; i <= fieldCount; i++) {
            let opt = document.createElement("option");
            opt.value = i - 1;
            opt.textContent = fields[i - 1]?.crop
                ? `Field ${i} (${fields[i - 1].crop})`
                : `Field ${i}`;
            dropdown.appendChild(opt);
        }

        // Update when changing field
        dropdown.addEventListener("change", () => updateDashboard(dropdown.value));
    }
    
    // Initialize pump button
    initPumpButton();
    
    // Update crop intelligence after a short delay to ensure DOM is ready
    setTimeout(() => {
        updateCropIntelligence();
    }, 500);
});

