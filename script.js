document.addEventListener("DOMContentLoaded", function () {
    let words;
    let hiddenWord;
    let underscores;
    let wordDisplay;

    fetch('./words.json')
        .then(response => response.json())
        .then(data => {
            words = data; 
            startGame();
        });

    // physical keyboard
    document.addEventListener('keydown', handleKeyPress);

    // virtual keyboard
    let virtualKeys = document.getElementsByClassName("key");
    for (let i = 0; i < virtualKeys.length; i++) {
        let virtualKey = virtualKeys[i];
        virtualKey.addEventListener('click', handleVirtualKeyPress);
    }

    function startGame() {
        hiddenWord = words[Math.floor(Math.random() * words.length)];
        wordDisplay = document.getElementById("word-display");

        underscores = hiddenWord.word.replace(/[A-Z]/g, "_ ");
        wordDisplay.textContent = underscores;

        let hint = document.getElementById('hint');
        hint.textContent = `Hint: ${hiddenWord.hint}`;
    }

    function handleKeyPress(e) {
        if (/^[a-zA-Z]$/.test(e.key)) {
            let letter = e.key.toUpperCase();
            handleGuess(letter);
        }
    }

    function handleVirtualKeyPress(e) {
        let letter = e.target.textContent.toUpperCase();
        handleGuess(letter);
    }

    function handleGuess(letter) {
        if (hiddenWord.word.includes(letter)) {

            underscores = updateWordDisplay(hiddenWord.word, letter);
            wordDisplay.textContent = underscores;

            if (!underscores.includes("_")) {
                alert(`Congratulations! You guessed the word - ${hiddenWord.word}`);
                startGame();
            }
        }
    }

    function updateWordDisplay(word, letter) {
        let newDisplay = "";
   
        let guessedLetter = word.includes(letter) ? letter : '';

        for (let i = 0; i < word.length; i++) {
            if (word[i] === guessedLetter) {
                newDisplay += guessedLetter + " ";
            } else {
                newDisplay += underscores[2 * i] + " ";
            }
        }
        return newDisplay.trim();
    }
});
