const shopItems = [
    {
        id: 'neighbour',
        name: 'Neighbour',
        cost: 50,
        petsPerSecond: 0.5,
        count: 0
    },

    {
        id: 'catsitter',
        name: 'Catsitter',
        cost: 100,
        petsPerSecond: 0.7,
        count: 0
    },

    {
        id: 'catgroomer',
        name: 'Cat Groomer',
        cost: 1000,
        petsPerSecond: 1,
        count: 0
    },

    {
        id: 'cattrainer',
        name: 'Cat Trainer',
        cost: 10000,
        petsPerSecond: 1.5,
        count: 0
    },

    {
        id: 'veterinarian',
        name: 'Veterinarian',
        cost: 50000,
        petsPerSecond: 2,
        count: 0
    },

    {
        id: 'catsanctuary',
        name: 'Cat Sanctuary',
        cost: 100000,
        petsPerSecond: 2.2,
        count: 0
    },

    {
        id: 'catpriest',
        name: 'Cat Priest',
        cost: 200000,
        petsPerSecond: 2.5,
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
        <span id="count-${item.id}">${item.count} owned </span>
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
                document.getElementById('count-' + item.id).textContent = item.count + ' owned';
                updateDisplay();
            }
        });
    });
}

catImage.addEventListener('click', function() {
    pets += 1;
    updateDisplay();
});

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