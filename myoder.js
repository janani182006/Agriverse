// Sample order data – replace with your backend API results
const orders = []; // Empty = Show "No Orders Yet"
// Example with data:
// const orders = [
//     { id: "ORD123", product: "Tomatoes", qty: 50, amount: "₹1,500", status: "Pending" },
// ];

function showOrders() {
    const ordersBox = document.querySelector('.no-orders-box');
    const ordersContainer = document.querySelector('.my-orders-section');

    if (orders.length === 0) {
        // Show "No Orders Yet" message
        ordersBox.style.display = 'block';
    } else {
        // Hide empty state
        ordersBox.style.display = 'none';

        // Create order cards
        let ordersHTML = `
            <div class="orders-list">
                ${orders.map(order => `
                    <div class="order-card">
                        <div><strong>Order ID:</strong> ${order.id}</div>
                        <div><strong>Product:</strong> ${order.product}</div>
                        <div><strong>Quantity:</strong> ${order.qty}</div>
                        <div><strong>Amount:</strong> ${order.amount}</div>
                        <div><strong>Status:</strong> <span class="status">${order.status}</span></div>
                    </div>
                `).join('')}
            </div>
        `;
        ordersContainer.insertAdjacentHTML("beforeend", ordersHTML);
    }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", showOrders);
function navigateTo(page) {
    window.location.href = page;
}
