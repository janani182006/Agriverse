// Filter Products Function
document.getElementById("cropFilter").addEventListener("change", applyFilters);
document.getElementById("locationFilter").addEventListener("input", applyFilters);
document.getElementById("minPriceFilter").addEventListener("input", applyFilters);
document.getElementById("maxPriceFilter").addEventListener("input", applyFilters);

function applyFilters() {
    const crop = document.getElementById("cropFilter").value.toLowerCase();
    const location = document.getElementById("locationFilter").value.toLowerCase();
    const minPrice = Number(document.getElementById("minPriceFilter").value);
    const maxPrice = Number(document.getElementById("maxPriceFilter").value);

    document.querySelectorAll(".product-card").forEach(card => {
        const cardCrop = card.dataset.crop.toLowerCase();
        const cardLocation = card.dataset.location.toLowerCase();
        const cardPrice = Number(card.dataset.price);

        if (
            (crop === "all" || cardCrop.includes(crop)) &&
            cardLocation.includes(location) &&
            cardPrice >= minPrice &&
            cardPrice <= maxPrice
        ) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
function loadListings() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = ""; // remove old static cards

    const listings = JSON.parse(localStorage.getItem('marketListings') || "[]");

    if (listings.length === 0) {
        grid.innerHTML = "<p>No listings yet.</p>";
        return;
    }

    listings.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
    <div class="product-image">
        <img src="${item.image}" alt="${item.crop}">
        <span class="status-badge">Available</span>
    </div>
    <div class="product-details">
        <div class="product-header">
            <h3>${item.crop}</h3>
            <span class="price">₹ ${item.price}/kg</span>
        </div>
        <ul class="product-info">
            <li>📦 ${item.qty}kg available</li>
            <li>📍 ${item.location}</li>
            <li>🗓 Harvested: ${item.date}</li>
        </ul>
        <p class="description">${item.desc || "High-quality produce"}</p>
        <div class="card-actions">
            <button class="order-btn"><i class="fa-solid fa-cart-shopping"></i> Order Now</button>
            <button class="delete-btn" onclick="deleteListing(${index})">
                <i class="fa-solid fa-trash"></i> Remove
            </button>
        </div>
    </div>
`;

        grid.appendChild(card);
    });
}
function deleteListing(index) {
    if (!confirm("Are you sure you want to remove this yield?")) return;

    let listings = JSON.parse(localStorage.getItem('marketListings') || "[]");
    listings.splice(index, 1);  // Remove selected listing
    localStorage.setItem('marketListings', JSON.stringify(listings));

    loadListings();  // Refresh UI
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadListings);

function navigateTo(page) {
    window.location.href = page;
}


console.log("Marketplace JS Loaded");
