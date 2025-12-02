// Sample sales data
// Keep it empty to show "No Sales Yet" message
// Add objects to show real sales
const sales = [
    // Uncomment and edit this example to test dynamic sales display
    /*
    {
        id: "SALE001",
        product: "Tomatoes",
        qty: 100,
        amount: "₹3,500",
        buyer: "Buyer1",
        date: "12 Feb 2025",
        status: "Completed"
    }
    */
];

// Function for navigation
function navigateTo(page) {
    window.location.href = page;
}

// Display sales data
function showSales() {
    const salesBox = document.querySelector('.no-sales-box');
    const salesSection = document.querySelector('.sales-section');

    if (sales.length === 0) {
        salesBox.style.display = 'block'; // Show "No Sales Yet"
    } else {
        salesBox.style.display = 'none'; // Hide empty state

        let salesHTML = `
            <div class="sales-list">
                ${sales.map(sale => `
                    <div class="sales-card">
                        <div><strong>Sale ID:</strong> ${sale.id}</div>
                        <div><strong>Product:</strong> ${sale.product}</div>
                        <div><strong>Quantity:</strong> ${sale.qty}</div>
                        <div><strong>Amount:</strong> ${sale.amount}</div>
                        <div><strong>Buyer:</strong> ${sale.buyer}</div>
                        <div><strong>Date:</strong> ${sale.date}</div>
                        <div><strong>Status:</strong> <span class="sale-status">${sale.status}</span></div>
                    </div>
                `).join('')}
            </div>
        `;

        salesSection.insertAdjacentHTML("beforeend", salesHTML);
    }
}



// Run on page load
document.addEventListener("DOMContentLoaded", showSales);
