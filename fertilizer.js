document.addEventListener("DOMContentLoaded", () => {

    // Navigation function for tabs & footer
    window.navigate = function(page) {
        window.location.href = page;
    };

    // Example NPK data (You can replace with real sensor data later)
    const npkData = {
        nitrogen: 45,
        phosphorus: 38,
        potassium: 52
    };

    // Function to update NPK values dynamically
    function updateFertilizerAdvice() {
        document.getElementById("nitrogenValue").innerText = npkData.nitrogen;
        document.getElementById("phosphorusValue").innerText = npkData.phosphorus;
        document.getElementById("potassiumValue").innerText = npkData.potassium;

        applyLevel("nitrogen", npkData.nitrogen);
        applyLevel("phosphorus", npkData.phosphorus);
        applyLevel("potassium", npkData.potassium);
    }

    // Function to set level (Low, Moderate, Normal)
    function applyLevel(type, value) {
        let levelElement = document.getElementById(type + "Level");

        if (value < 40) {
            levelElement.innerText = "Low";
            levelElement.className = "low";
        } 
        else if (value >= 40 && value <= 50) {
            levelElement.innerText = "Moderate";
            levelElement.className = "moderate";
        } 
        else {
            levelElement.innerText = "Normal";
            levelElement.className = "normal";
        }
    }

    // Load fertilizer data on page load
    updateFertilizerAdvice();
});
