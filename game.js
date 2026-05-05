let pets = 0;
let catsitters = 0;
const catsitterCost = 50;

const catImage = document.getElementById('cat');
const petCountDisplay = document.getElementById('pet-count');
const multiplierDisplay = document.getElementById('multiplier');
const buyCatsitterBtn = document.getElementById('buy-catsitter');
const catsitterCountDisplay = document.getElementById('catsitter-count');

catImage.addEventListener('click', function() {
    pets = pets + 1;
    updateDisplay();
});

function updateDisplay() {
    petCountDisplay.textContent = 'Pets: ' + pets;
    multiplierDisplay.textContent = 'Pets per 10 sec: ' + catsitters;
    buyCatsitterBtn.disabled = pets < catsitterCost;
}

buyCatsitterBtn.addEventListener('click', function() {
    if (pets >= catsitterCost) {
        pets = pets - catsitterCost;
        catsitters = catsitters + 1;
        catsitterCountDisplay.textContent = 'Catsitters: ' + catsitters;
        updateDisplay();
    }
});

setInterval(function() {
    if (catsitters > 0) {
        pets = pets + catsitters;
        updateDisplay();
    }
}, 10000);

updateDisplay();

