
let chosenKnockout = null;  // Håller reda på det valda knockoutnumret
let totalSum = 0;           // Håller reda på totala summan
let gameOver = false;       // Vet om spelet är slut eller ej

const knockoutButtons = document.querySelectorAll('.knockout-btn'); // Lista över alla knockout-knappar
const chosenKnockoutDisplay = document.querySelector('.chosen-knockout'); // Visar valt nummer
const rollBtn = document.getElementById('roll-btn'); // "Kasta tärningar"-knappen
const restartBtn = document.getElementById('restart-btn'); // "Starta om"-knappen
const totalSumEl = document.getElementById('total-sum'); // Visar totala summan
const messageEl = document.querySelector('.message'); // Meddelande
const diceDivs = document.querySelectorAll('.dice'); // De två tärnings-container elementen

// Dessa lyssnare triggas när spelaren klickar på en av knockout-knapparna (6,7,8,9).
knockoutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (gameOver) return;
        chosenKnockout = parseInt(btn.dataset.value, 10);
        chosenKnockoutDisplay.textContent = "Valt knockoutnummer: " + chosenKnockout;
        knockoutButtons.forEach(b => b.classList.remove('active-knockout'));
        btn.classList.add('active-knockout');

        // Aktivera "Kasta tärningar"-knappen och "Starta om"-knappen nu när ett knockoutnummer är valt
        rollBtn.disabled = false;
        messageEl.textContent = "";
        restartBtn.disabled = false;
    });
});

// Denna lyssnare triggas när spelaren klickar på "Kasta tärningar" = kastar tärningarna 
rollBtn.addEventListener('click', rollDice);

// Denna lyssnare triggas när spelaren klickar på "Starta om" om startar om till början
restartBtn.addEventListener('click', resetGame);

// Denna funktion slumpar två tärningskast, uppdaterar tärningsbilder och kontrollerar
// om summan motsvarar knockoutnumret. Om ja, avslutas spelet, annars fortsätter och ökar den total summan.
function rollDice() {
    // Om inget knockoutnummer är valt eller spelet är slut, gör inget
    if (!chosenKnockout || gameOver) return;

    // Slumpa två tal mellan 1 och 6 (tärningar)
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const sum = dice1 + dice2;

    // Uppdatera tärningsbilder baserat på de nya värdena
    updateDiceImage(diceDivs[0], dice1);
    updateDiceImage(diceDivs[1], dice2);

    // Kontrollera om summan matchar knockoutnumret
    if (sum === chosenKnockout) {
        // Spelet är slut om summan matchar knockoutnumret
        gameOver = true;
        messageEl.textContent = `Game Over! Du kastade ${sum}, vilket ger dig en knockout av Mike Tyson. Spelet är slut! Din slutpoäng är ${totalSum}.`;
        rollBtn.disabled = true; // Avaktivera "Kasta tärningar"-knappen
    } else {
        // Om inte knockoutnumret blir av så blir du uppmanad till att fortsätta 
        totalSum += sum;
        totalSumEl.textContent = totalSum;
        messageEl.textContent = `Du kastade ${sum}. Fortsätt!`;
    }
}

// Uppdaterar bilderna för tärningarna beroenede på det slumpade värdet.
// diceElement: referens till det tärningsbilden
// value: tärningsvärdet (1-6)
function updateDiceImage(diceElement, value) {
    const img = diceElement.querySelector('img');
    img.src = `images/dice${value}.png`;
}
// Återställer spelet till början
function resetGame() {
    chosenKnockout = null;
    chosenKnockoutDisplay.textContent = "";
    totalSum = 0;
    totalSumEl.textContent = totalSum;
    messageEl.textContent = "";
    gameOver = false;

    // Inaktivera knappar tills ett knockoutnummer väljs på nytt
    rollBtn.disabled = true;
    restartBtn.disabled = true;

    // Nollställer valda knockout summan 
    knockoutButtons.forEach(b => b.classList.remove('active-knockout'));
}
