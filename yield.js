// Simple helper to show a toast message at the bottom
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

document.getElementById('postYieldForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const crop = document.getElementById('cropType').value;
    const qty = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const desc = document.getElementById('description').value;
    const imgInput = document.getElementById('productPhoto');

    if (!crop || !qty || !price) {
        alert("Fill all required fields!");
        return;
    }

    if (!imgInput.files[0]) {
        alert("Upload an image!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageDataUrl = event.target.result;

        const newListing = {
            crop,
            qty,
            price,
            desc,
            image: imageDataUrl,
            location: localStorage.getItem('agriverseVillage') || "Unknown",
            date: new Date().toLocaleDateString()
        };

        let allListings = JSON.parse(localStorage.getItem('marketListings') || "[]");
        allListings.push(newListing);
        localStorage.setItem('marketListings', JSON.stringify(allListings));

        alert("Listing posted successfully!");
        window.location.href = "market.html";
    };

    reader.readAsDataURL(imgInput.files[0]); // important!
});

function navigateTo(page) {
    window.location.href = page;
}

