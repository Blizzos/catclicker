const shopItems = [
    {
        id: 'neighbour',
        name: 'Neighbour',
        cost: 50,
        petsPerSecond: 0.5,
        count: 0
    }
];

const savedItems = localStorage.getItem('shopItems');
if (savedItems) {
    const parsed = JSON.parse(savedItems);
    parsed.forEach(function(savedItem, index) {
        shopItems[index].count = savedItem.count;
    });
}

const catImage = document.getElementById('cat');
const petCountDisplay = document.getElementById('pet-count');
const multiplierDisplay = document.getElementById('multiplier');

let pets = Number(localStorage.getItem('pets')) || 0;

function buildShop() {
    const shop = document.getElementById('shop');
    shop.innerHTML = '<h2>Shop</h2>';

    shopItems.forEach(function(item) {
        shop.innerHTML += `
        <div class="shop-item">
        <button id="buy-${item.id}">
        ${item.name} - ${item.cost} pets
        </button>
        <span id="count-${item.id}">${item.count}</span>
        </div>
        `;
    });
}