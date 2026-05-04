let pets = 0;
let catsitters = 0;
const catsitterCost = 1000;

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

