// Navigation
function navigate(page) {
    window.location.href = page;
}

// Make navigate available globally
window.navigate = navigate;

// Image Preview
function previewImage(event) {
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.innerHTML = "";

    let img = document.createElement("img");
    img.src = URL.createObjectURL(event.target.files[0]);

    imagePreview.appendChild(img);

    // Example AI Detection values
    document.getElementById("pestName").innerText = "Leaf Miner";
    document.getElementById("severity").innerText = "Moderate";
    document.getElementById("remedy").innerText = "Neem oil spray, garlic extract";
}
document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const selectedCrop = document.getElementById("cropSelect").value;

    if (!file) return;
    if (!selectedCrop) {
        alert("Please select a crop first!");
        return;
    }

    // Show preview
    const preview = document.getElementById("imagePreview");
    preview.innerHTML = "";
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.maxWidth = "100%";
    img.style.borderRadius = "10px";
    preview.appendChild(img);

    setTimeout(() => {
        // Show detection based on selected crop
        let result = {
            pest: "Unknown",
            severity: "Low",
            treatment: "No treatment required"
        };

        if (selectedCrop === "paddy") {
            result = {
                pest: "Brown Spot Disease",
                severity: "High",
                treatment: "Apply Tricyclazole (0.6g/L water)"
            };
        } else if (selectedCrop === "cardamom") {
            result = {
                pest: "Rhizome Rot",
                severity: "Moderate",
                treatment: "Use Metalaxyl 2g/L with proper drainage"
            };
        } else if (selectedCrop === "cauliflower") {
            result = {
                pest: "Aphid Infestation",
                severity: "Medium",
                treatment: "Spray Neem Oil (3ml/L) or Imidacloprid"
            };
        }

        document.getElementById("pestResult").textContent = result.pest;
        document.getElementById("severityResult").textContent = result.severity;
        document.getElementById("treatmentResult").textContent = result.treatment;
    }, 2000);
});
function triggerUpload() {
    document.getElementById('imageInput').click();
}

document.getElementById('imageInput').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        document.getElementById('pestName').textContent = "Processing...";
        setTimeout(() => {
            // Dummy response (replace with AI)
            document.getElementById('pestName').textContent = "Bacterial Blight";
            document.getElementById('severity').textContent = "Moderate";
            document.getElementById('remedy').textContent = "Use neem oil";
        }, 1500);
    }
});


