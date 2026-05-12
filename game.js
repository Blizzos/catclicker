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

function setupShopListeners() {
    shopItems.forEach(function(item) {
        document.getElementById('buy-' + item.id).addEventListener('click', function() {
            if (pets >= item.cost) {
                pets -= item.cost;
                item.count += 1;
                document.getElementById('count-' + item.id).textContent = item.count;
                updateDisplay();
            }
        });
    });
}

function updateDisplay() {
    petCountDisplay.textContent = 'Pets: ' + Math.floor(pets);

    let totalPerSecond = 0;
    shopItems.forEach(function(item) {
        totalPerSecond += item.count * item.petsPerSecond;
    });
    multiplierDisplay.textContent = 'Pets per sec: ' + totalPerSecond;

    shopItems.forEach(function(item) {
        document.getElementById('buy-' + item.id).disabled = pets < item.cost;
    });

    localStorage.setItem('pets', pets);
    localStorage.setItem('shopItems', JSON.stringify(shopItems));
}

setInterval(function() {
    shopItems.forEach(function(item) {
        pets += item.count * item.petsPerSecond;
    });
    updateDisplay();
}, 1000);

buildShop();
setupShopListeners();
updateDisplay();